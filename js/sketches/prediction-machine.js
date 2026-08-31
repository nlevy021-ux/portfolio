(function () {
    const overlay = document.getElementById('pm-overlay');
    const startBtn = document.getElementById('pm-start');
    const statusEl = document.getElementById('pm-status');
    const copyEl = document.getElementById('pm-copy');
    if (!overlay || !startBtn) return;

    const startCopy = copyEl ? copyEl.textContent : '';

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Could not load ' + src));
            document.head.appendChild(script);
        });
    }

    function setStatus(text) {
        if (!statusEl) return;
        statusEl.hidden = !text;
        statusEl.textContent = text || '';
    }

    function showError(message) {
        overlay.classList.remove('is-off', 'is-loading');
        overlay.setAttribute('aria-hidden', 'false');
        startBtn.hidden = false;
        startBtn.disabled = false;
        if (copyEl) {
            copyEl.hidden = false;
            copyEl.textContent = message;
        }
        setStatus('');
    }

    window.__pmDemo = {
        hideOverlay: function () {
            overlay.classList.add('is-off');
            overlay.setAttribute('aria-hidden', 'true');
        },
        showError: showError
    };

    startBtn.addEventListener('click', async function () {
        startBtn.disabled = true;
        overlay.classList.add('is-loading');
        if (copyEl) {
            copyEl.hidden = false;
            copyEl.textContent = startCopy;
        }
        setStatus('Requesting camera…');

        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('This browser cannot access the camera.');
            }
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { facingMode: 'user' }
            });
            stream.getTracks().forEach(function (track) { track.stop(); });

            setStatus('Loading the piece…');
            await loadScript('https://cdn.jsdelivr.net/npm/ml5@1.2.1/dist/ml5.min.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js');
            if (typeof p5 === 'function' && !document.querySelector('#game-container canvas')) {
                new p5();
            }
        } catch (err) {
            console.error(err);
            const name = err && err.name;
            let message = err && err.message ? err.message : 'Could not start the demo.';
            if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
                message = 'Camera permission was blocked. Allow the camera for this site, then start again.';
            } else if (name === 'NotFoundError') {
                message = 'No camera was found on this device.';
            }
            showError(message);
        }
    });
})();

let video;
let detections = [];

let maxBreaths = 25;
let previousNoseX = -1;
let movementThreshold = 10;
let countdownTime = 5000;
let movementTime = 1000;
let timer;
let actualMovementCaptured = false;
let breathCount = 0;

let attempts = 0;
let initialErrorRate = 0.35;

let prevChestY = null;
let prevVerticalDisplacement = 0;
let breathThreshold = 1.5;

const MOVEMENT_STATE = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    NO_MOVEMENT: 'NO_MOVEMENT'
};
let currentState = MOVEMENT_STATE.NO_MOVEMENT;
let actualMovement = MOVEMENT_STATE.NO_MOVEMENT;
let displayedMovement = MOVEMENT_STATE.NO_MOVEMENT;

let shapes = [];

function setup() {
    const canvas = createCanvas(640, 480);
    canvas.parent('game-container');
    if (canvas.elt) {
        canvas.elt.style.visibility = 'visible';
        canvas.elt.removeAttribute('data-hidden');
    }

    video = createCapture({ video: { facingMode: 'user' }, audio: false }, startFaceTracker);
    video.size(width, height);
    video.hide();

    timer = millis();
    textAlign(CENTER, CENTER);
    textSize(32);
}

async function startFaceTracker() {
    try {
        let model = ml5.faceMesh({ maxFaces: 1, refineLandmarks: false, flipHorizontal: false });
        if (model && typeof model.then === 'function') model = await model;
        if (model && model.ready) await model.ready;
        model.detectStart(video, gotFaces);
        if (window.__pmDemo) window.__pmDemo.hideOverlay();
    } catch (err) {
        console.error(err);
        if (window.__pmDemo) {
            window.__pmDemo.showError('Face tracking failed to start. Try reloading the page.');
        }
    }
}

function gotFaces(results) {
    detections = (results || []).map(function (face) {
        const box = face.box || {};
        return {
            alignedRect: {
                _box: {
                    _x: box.xMin || 0,
                    _y: box.yMin || 0,
                    _width: box.width || 0,
                    _height: box.height || 0
                }
            }
        };
    });
}

function draw() {
    background(255);

    if (breathCount >= maxBreaths) {
        displayGameOverScreen();
        return;
    }

    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();

    if (detections && detections.length > 0) {
        const d = detections[0];
        const box = d.alignedRect._box;

        const faceX = width - (box._x + box._width);
        const faceY = box._y;
        const faceW = box._width;
        const faceH = box._height;

        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);
        rect(faceX, faceY, faceW, faceH);

        const noseX = faceX + faceW / 2;

        updateMovementState(noseX);
        trackBreathing(faceX, faceY, faceW, faceH);
    } else {
        currentState = MOVEMENT_STATE.NO_MOVEMENT;
    }

    for (let i = 0; i < shapes.length; i++) {
        shapes[i].display();
    }

    manageCountdownAndMovement();
    displayBreathCountOverlay();
}

function updateMovementState(currentNoseX) {
    let movement = MOVEMENT_STATE.NO_MOVEMENT;

    if (previousNoseX !== -1) {
        const diff = currentNoseX - previousNoseX;
        if (abs(diff) > movementThreshold) {
            if (diff > 0) {
                movement = MOVEMENT_STATE.RIGHT;
            } else {
                movement = MOVEMENT_STATE.LEFT;
            }
        }
    }
    previousNoseX = currentNoseX;
    currentState = movement;
}

function trackBreathing(faceX, faceY, faceW, faceH) {
    const chestY = faceY + faceH * 0.75;

    if (prevChestY === null) {
        prevChestY = chestY;
        return;
    }

    const verticalDisplacement = chestY - prevChestY;

    if (prevVerticalDisplacement > breathThreshold && verticalDisplacement < -breathThreshold) {
        breathCount++;
    }

    prevChestY = chestY;
    prevVerticalDisplacement = verticalDisplacement;
}

function manageCountdownAndMovement() {
    const elapsedTime = millis() - timer;

    if (elapsedTime < countdownTime) {
        const secondsLeft = floor((countdownTime - elapsedTime) / 1000) + 1;

        fill(0, 250, 30);
        noStroke();
        textSize(64);
        text(secondsLeft, width / 2, height / 2);

        actualMovementCaptured = false;
        actualMovement = MOVEMENT_STATE.NO_MOVEMENT;
        displayedMovement = MOVEMENT_STATE.NO_MOVEMENT;

    } else if (elapsedTime < countdownTime + movementTime + 500) {
        fill(0, 250, 30);
        textSize(64);
        text('Move!', width / 2, height / 2);

        if (!actualMovementCaptured && currentState !== MOVEMENT_STATE.NO_MOVEMENT) {
            freezeMovement();
            actualMovementCaptured = true;
        }

        if (displayedMovement !== MOVEMENT_STATE.NO_MOVEMENT) {
            drawArrowBasedOnDisplayedMovement();
        }
    } else {
        checkMovementAccuracy();
        timer = millis();
        actualMovementCaptured = false;
    }
}

function freezeMovement() {
    attempts++;
    actualMovement = currentState;

    const errorRate = initialErrorRate * Math.exp(-0.10 * attempts);

    if (Math.random() < errorRate) {
        if (actualMovement === MOVEMENT_STATE.LEFT) displayedMovement = MOVEMENT_STATE.RIGHT;
        else if (actualMovement === MOVEMENT_STATE.RIGHT) displayedMovement = MOVEMENT_STATE.LEFT;
        else displayedMovement = MOVEMENT_STATE.NO_MOVEMENT;
    } else {
        displayedMovement = actualMovement;
    }
}

function checkMovementAccuracy() {
    if (displayedMovement !== MOVEMENT_STATE.NO_MOVEMENT) {
        if (displayedMovement === actualMovement) {
            drawBlackCircle();
        } else {
            drawRedX();
        }
    }
}

function drawArrowBasedOnDisplayedMovement() {
    const x = width / 2;
    const y = height / 4;
    const arrowLength = 60;
    const arrowWidth = 30;

    fill(0, 0, 255);
    noStroke();

    if (displayedMovement === MOVEMENT_STATE.LEFT) {
        triangle(x - arrowLength, y, x + arrowWidth, y - arrowWidth, x + arrowWidth, y + arrowWidth);
    } else if (displayedMovement === MOVEMENT_STATE.RIGHT) {
        triangle(x + arrowLength, y, x - arrowWidth, y - arrowWidth, x - arrowWidth, y + arrowWidth);
    }
}

class Shape {
    constructor(x, y, size, col, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.col = col;
        this.type = type;
    }

    display() {
        if (this.type === 'circle') {
            fill(this.col);
            noStroke();
            ellipse(this.x, this.y, this.size * 2);
        } else if (this.type === 'x') {
            fill(this.col);
            noStroke();
            ellipse(this.x, this.y, this.size * 2);
            stroke(this.col);
            strokeWeight(5);
            line(this.x - this.size, this.y - this.size, this.x + this.size, this.y + this.size);
            line(this.x - this.size, this.y + this.size, this.x + this.size, this.y - this.size);
        }
    }
}

function drawBlackCircle() {
    const radius = random(10, 50);
    const x = random(radius, width - radius);
    const y = random(radius, height - radius);
    shapes.push(new Shape(x, y, radius, color(0), 'circle'));
}

function drawRedX() {
    const radius = random(10, 50);
    const x = random(radius, width - radius);
    const y = random(radius, height - radius);
    shapes.push(new Shape(x, y, radius, color(255, 0, 0), 'x'));
}

function displayBreathCountOverlay() {
    fill(255);
    noStroke();
    textSize(24);
    text('Breaths: ' + breathCount, width / 2, height - 30);
}

function displayGameOverScreen() {
    background(255);
    fill(0);
    noStroke();
    textSize(32);
    textLeading(40);
    text('You took ' + breathCount + ' breaths\nso the prediction machine has stopped', width / 2, height / 2);
    noLoop();
}
