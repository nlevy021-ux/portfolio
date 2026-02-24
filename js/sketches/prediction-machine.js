let video;
let faceApi;
let detections = [];

// Game Variables
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

// Optical flow / Breath variables
let prevChestY = null;
let prevVerticalDisplacement = 0;
let breathThreshold = 1.5;

// Movement States
const MOVEMENT_STATE = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    NO_MOVEMENT: 'NO_MOVEMENT'
};
let currentState = MOVEMENT_STATE.NO_MOVEMENT;
let actualMovement = MOVEMENT_STATE.NO_MOVEMENT;
let displayedMovement = MOVEMENT_STATE.NO_MOVEMENT;

let shapes = [];

// p5.js Setup
function setup() {
    // Create canvas inside the specific container
    // We will assume 'project-content' or a specific ID checks project.js
    let canvas = createCanvas(640, 480);
    canvas.parent('game-container'); // We need to ensure this element exists

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // Hide the HTML video element, we draw it on canvas

    const faceOptions = {
        withLandmarks: false,
        withDescriptors: false,
        minConfidence: 0.5
    };

    // Initialize the model
    faceApi = ml5.faceApi(video, faceOptions, modelReady);

    timer = millis();
    textAlign(CENTER, CENTER);
    textSize(32);
}

function modelReady() {
    console.log('Model Ready!');
    faceApi.detect(gotResults);
}

function gotResults(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    detections = result;
    faceApi.detect(gotResults);
}

function draw() {
    background(255);

    if (breathCount >= maxBreaths) {
        displayGameOverScreen();
        return;
    }

    // Mirror video
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();

    // Process Detections
    if (detections && detections.length > 0) {
        // ml5 faceApi detection object structure:
        // { alignedRect: { _box: { _x, _y, _width, _height } } }
        // or just detection.parts if landmarks... 
        // using simple detection: result[0].alignedRect._box

        let d = detections[0];
        let box = d.alignedRect._box;

        // Mirror coordinates for logic because we mirrored the drawing
        // Actually, logic cares about relative movement, but let's align with visual
        // Visual X: width - (x + w)  ... calculating "mirrored X"

        let faceX = width - (box._x + box._width);
        let faceY = box._y;
        let faceW = box._width;
        let faceH = box._height;

        // Draw Face Box
        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);
        rect(faceX, faceY, faceW, faceH);

        // Approximate features based on box (Original Logic)
        // Center of face
        let noseX = faceX + faceW / 2;
        let noseY = faceY + faceH / 2;

        updateMovementState(noseX);
        trackBreathing(faceX, faceY, faceW, faceH);
    } else {
        currentState = MOVEMENT_STATE.NO_MOVEMENT;
    }

    // Draw Shapes (Permanent markers)
    for (let s of shapes) {
        s.display();
    }

    manageCountdownAndMovement();
    displayBreathCountOverlay();
}

function updateMovementState(currentNoseX) {
    let movement = MOVEMENT_STATE.NO_MOVEMENT;

    if (previousNoseX !== -1) {
        let diff = currentNoseX - previousNoseX;

        if (abs(diff) > movementThreshold) {
            // Because we mirrored x, "Right" on screen is +X? 
            // Normal p5: 0 is left, Width is right.
            // If nose moves +X, it's moving Right.
            // Original code: if (movementNose < 0) "Right" else "Left" 
            // (Original had scale(-1, 1) so drawing was mirrored, but logic might have been on raw video coords?)
            // Let's stick to screen coords:
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
    // "Bottom center" of face for chest approximation
    let chestY = faceY + faceH * 0.75;

    if (prevChestY === null) {
        prevChestY = chestY;
        return;
    }

    let verticalDisplacement = chestY - prevChestY;

    // Detect breath cycle: Up then Down (or vice versa depending on posture)
    // Original: prev > threshold && current < -threshold
    // Assuming Y increases downwards (standard p5)
    // Inhale usually lifts shoulders/head UP (-Y). Exhale DOWN (+Y).
    // Original logic: "prevVerticalDisplacement > breathThreshold" (Moved Down?)
    // This part is tricky without testing. I'll stick to logical "Change in direction with magnitude"

    // Original: if (prevVerticalDisplacement > breathThreshold && verticalDisplacement < -breathThreshold)

    if (prevVerticalDisplacement > breathThreshold && verticalDisplacement < -breathThreshold) {
        breathCount++;
    }

    prevChestY = chestY;
    prevVerticalDisplacement = verticalDisplacement;
}

function manageCountdownAndMovement() {
    let elapsedTime = millis() - timer;

    if (elapsedTime < countdownTime) {
        let secondsLeft = floor((countdownTime - elapsedTime) / 1000) + 1;

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
        text("Move!", width / 2, height / 2);

        // Capture movement
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

    // Error Rate Decay
    let errorRate = initialErrorRate * exp(-0.10 * attempts);

    if (random(1) < errorRate) {
        // Flip movement
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
    let x = width / 2;
    let y = height / 4;
    let arrowLength = 60;
    let arrowWidth = 30;

    fill(0, 0, 255);
    noStroke();

    if (displayedMovement === MOVEMENT_STATE.LEFT) {
        triangle(x + arrowLength, y, x - arrowWidth, y - arrowWidth, x - arrowWidth, y + arrowWidth);
    } else if (displayedMovement === MOVEMENT_STATE.RIGHT) {
        triangle(x - arrowLength, y, x + arrowWidth, y - arrowWidth, x + arrowWidth, y + arrowWidth);
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
            stroke(this.col);
            strokeWeight(5);
            line(this.x - this.size, this.y - this.size, this.x + this.size, this.y + this.size);
            line(this.x - this.size, this.y + this.size, this.x + this.size, this.y - this.size);
        }
    }
}

function drawBlackCircle() {
    let radius = random(10, 50);
    // Draw basically anywhere
    let x = random(radius, width - radius);
    let y = random(radius, height - radius);
    shapes.push(new Shape(x, y, radius, 0, 'circle'));
}

function drawRedX() {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    shapes.push(new Shape(x, y, 20, color(255, 0, 0), 'x'));
}

function displayBreathCountOverlay() {
    // Only text at bottom or top? Original was full overlay?
    // "fill(0, 180); rect(0, 0, width, height);" -> Covers WHOLE screen?
    // Wait, original draw loop: 
    // displayBreathCountOverlay(); // At the end.
    // It covers everything? 
    // Original code: text "You took X breaths". 
    // If it covers everything, you can't see the video...
    // Ah, transparency 180/255. So it darkens everything.

    // push();
    // fill(0, 50); // Make it subtler for web? Or stick to source. Source: 180.
    // rect(0, 0, width, height);
    // pop(); 
    // Actually, let's just show text clearly.

    fill(255);
    noStroke();
    textSize(24);
    text("Breaths: " + breathCount, width / 2, height - 30);
}

function displayGameOverScreen() {
    background(255);
    fill(0);
    noStroke();
    textSize(32);
    textLeading(40);
    text("You took " + breathCount + " breaths\nso the prediction machine has stopped", width / 2, height / 2);
    noLoop(); // Stop the game loop
}
