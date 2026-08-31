import {
    FilesetResolver,
    PoseLandmarker
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs';

const LM = {
    NOSE: 0,
    LEFT_EYE_INNER: 1,
    LEFT_EYE: 2,
    RIGHT_EYE_INNER: 4,
    RIGHT_EYE: 5,
    LEFT_EAR: 7,
    RIGHT_EAR: 8,
    MOUTH_LEFT: 9,
    MOUTH_RIGHT: 10,
    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,
    LEFT_HIP: 23,
    RIGHT_HIP: 24
};

const COMPUTER = {
    mix: ['face', 'neck', 'lean'],
    visibility: 0.45,
    emaAlpha: 0.28,
    holdSeconds: 0.5,
    decaySeconds: 1.5,
    deadbandDeg: 0.6,
    scale: { lean: 22, neck: 22, tilt: 15 },
    posture: { activation: 0.07, fullScale: 0.38, smoothing: 0.32 },
    face: {
        visibility: 0.45,
        baselineSamples: 18,
        baselineMs: 1600,
        minSamples: 5,
        baselineAlpha: 0.25,
        lockBaseline: true,
        activation: 1.03,
        fullScale: 1.16
    },
    overlay: {
        maxOpacity: 0.92,
        alertThreshold: 0.78,
        flashInterval: 0.55,
        flashOpacity: 1
    },
    copy: {
        alert: 'FIX POSTURE',
        calibrate: 'Sit upright to calibrate…',
        looking: 'Sit so your head and shoulders are in view',
        cue: 'Alert · sit back up',
        gate: 'Sit upright for a couple of seconds so it can learn your desk posture. Then lean toward the screen, or shift side to side. The page will dim. Sit back, and it returns.',
        aside: 'A desk-posture cue, not a clinical assessment. Best in Chrome or Safari.'
    }
};

const PHONE = {
    mix: ['face', 'neck'],
    visibility: 0.4,
    emaAlpha: 0.3,
    holdSeconds: 0.45,
    decaySeconds: 1.2,
    deadbandDeg: 0.45,
    scale: { lean: 22, neck: 16, tilt: 15 },
    posture: { activation: 0.04, fullScale: 0.26, smoothing: 0.3 },
    face: {
        visibility: 0.4,
        baselineSamples: 14,
        baselineMs: 1400,
        minSamples: 4,
        baselineAlpha: 0.28,
        lockBaseline: true,
        activation: 1.02,
        fullScale: 1.1
    },
    overlay: {
        maxOpacity: 0.9,
        alertThreshold: 0.7,
        flashInterval: 0.55,
        flashOpacity: 1
    },
    copy: {
        alert: 'LIFT THE PHONE',
        calibrate: 'Hold at eye height to calibrate…',
        looking: 'Keep your face in view',
        cue: 'Alert · lift the phone',
        gate: 'Hold the phone at eye height for a couple of seconds. Then lower it toward your lap, or bring it closer. The page will dim — that is the neck and eye-strain cue. Lift it back up, and the page returns.',
        aside: 'A neck and eye-strain cue for handheld use, not a clinical assessment.'
    }
};

const WASM_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function vis(landmark) {
    if (!landmark) return 0;
    const value = landmark.visibility;
    return value == null ? 1 : value;
}

function angleBetween(v1, v2) {
    const dot = v1[0] * v2[0] + v1[1] * v2[1];
    const mag1 = Math.hypot(v1[0], v1[1]);
    const mag2 = Math.hypot(v2[0], v2[1]);
    if (!mag1 || !mag2) return 0;
    return (Math.acos(clamp(dot / (mag1 * mag2), -1, 1)) * 180) / Math.PI;
}

function meanPoint(landmarks, a, b) {
    return [(landmarks[a].x + landmarks[b].x) / 2, (landmarks[a].y + landmarks[b].y) / 2];
}

function chooseSide(landmarks, left, right) {
    return vis(landmarks[left]) >= vis(landmarks[right]) ? left : right;
}

function computeMetrics(landmarks, threshold) {
    if (!landmarks || landmarks.length < 25) {
        return { leanDeg: null, neckDeg: null, tiltDeg: null };
    }

    const ls = LM.LEFT_SHOULDER;
    const rs = LM.RIGHT_SHOULDER;
    const lh = LM.LEFT_HIP;
    const rh = LM.RIGHT_HIP;
    const le = LM.LEFT_EAR;
    const re = LM.RIGHT_EAR;

    const shoulderVis = Math.min(vis(landmarks[ls]), vis(landmarks[rs]));
    const hipVis = Math.min(vis(landmarks[lh]), vis(landmarks[rh]));

    let leanDeg = null;
    if (shoulderVis >= threshold && hipVis >= threshold) {
        const midShoulder = meanPoint(landmarks, ls, rs);
        const midHip = meanPoint(landmarks, lh, rh);
        const torso = [midShoulder[0] - midHip[0], midShoulder[1] - midHip[1]];
        const angle = angleBetween(torso, [0, -1]);
        leanDeg = (torso[0] >= 0 ? 1 : -1) * angle;
    }

    let neckDeg = null;
    const neckSide = chooseSide(landmarks, le, re);
    const shoulderSide = neckSide === le ? ls : rs;
    const hipSide = neckSide === le ? lh : rh;
    const neckVis = Math.min(vis(landmarks[neckSide]), vis(landmarks[shoulderSide]), vis(landmarks[hipSide]));
    if (neckVis >= threshold) {
        const ear = landmarks[neckSide];
        const shoulder = landmarks[shoulderSide];
        const hip = landmarks[hipSide];
        const v1 = [ear.x - shoulder.x, ear.y - shoulder.y];
        const v2 = [hip.x - shoulder.x, hip.y - shoulder.y];
        const forward = 180 - angleBetween(v1, v2);
        neckDeg = (v1[0] >= 0 ? 1 : -1) * forward;
    } else {
        const upperVis = Math.min(
            vis(landmarks[neckSide]),
            vis(landmarks[shoulderSide]),
            vis(landmarks[ls]),
            vis(landmarks[rs])
        );
        if (upperVis >= threshold) {
            const ear = landmarks[neckSide];
            const shoulder = landmarks[shoulderSide];
            const span = Math.abs(landmarks[rs].x - landmarks[ls].x);
            let vertical = Math.abs(shoulder.y - ear.y);
            if (vertical < 1e-4) vertical = span;
            vertical = Math.max(vertical, 1e-4);
            const forward = (Math.atan2(Math.abs(ear.x - shoulder.x), vertical) * 180) / Math.PI;
            neckDeg = ((ear.x - shoulder.x) >= 0 ? 1 : -1) * Math.min(forward, 85);
        }
    }

    let tiltDeg = null;
    if (shoulderVis >= threshold) {
        const dx = landmarks[rs].x - landmarks[ls].x;
        const dy = landmarks[rs].y - landmarks[ls].y;
        tiltDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
    }

    return { leanDeg, neckDeg, tiltDeg };
}

function normalizeOne(value, scale, deadband) {
    if (value == null) return 0;
    if (Math.abs(value) < deadband) return 0;
    return clamp(value / scale, -1, 1);
}

class EmaSmoother {
    constructor(alpha, holdSeconds, decaySeconds) {
        this.alpha = alpha;
        this.holdSeconds = holdSeconds;
        this.decaySeconds = decaySeconds;
        this.reset();
    }

    reset() {
        this.values = { leanDeg: null, neckDeg: null, tiltDeg: null };
        this.last = { leanDeg: 0, neckDeg: 0, tiltDeg: 0 };
        this.validAt = { leanDeg: null, neckDeg: null, tiltDeg: null };
        this.lastTime = null;
    }

    update(metrics, now) {
        const dt = this.lastTime == null ? 0 : Math.max(0, now - this.lastTime);
        this.lastTime = now;
        const out = {};
        for (const name of ['leanDeg', 'neckDeg', 'tiltDeg']) {
            const value = metrics[name];
            if (value != null) {
                const prev = this.values[name];
                const filtered = prev == null ? value : this.alpha * value + (1 - this.alpha) * prev;
                this.values[name] = filtered;
                this.last[name] = filtered;
                this.validAt[name] = now;
                out[name] = filtered;
            } else if (this.validAt[name] == null) {
                out[name] = 0;
                this.last[name] = 0;
            } else if (now - this.validAt[name] <= this.holdSeconds) {
                out[name] = this.last[name];
            } else if (this.decaySeconds > 0) {
                this.last[name] *= Math.exp(-dt / this.decaySeconds);
                out[name] = this.last[name];
            } else {
                this.last[name] = 0;
                out[name] = 0;
            }
        }
        return out;
    }
}

class PostureMapper {
    constructor({ activation, fullScale, smoothing, useAbsolute = true }) {
        this.activation = activation;
        this.fullScale = fullScale <= activation ? activation + 1e-6 : fullScale;
        this.smoothing = clamp(smoothing, 0, 1);
        this.useAbsolute = useAbsolute;
        this.smoothed = 0;
    }

    map(value) {
        let source = Number(value) || 0;
        source = this.useAbsolute ? Math.abs(source) : Math.max(0, source);
        let raw = 0;
        if (source > this.activation) {
            raw = clamp((source - this.activation) / (this.fullScale - this.activation), 0, 1);
        }
        if (this.smoothing <= 0) this.smoothed = raw;
        else if (this.smoothing >= 1) this.smoothed = raw;
        else this.smoothed = this.smoothing * raw + (1 - this.smoothing) * this.smoothed;
        return this.smoothed;
    }

    reset() {
        this.smoothed = 0;
    }
}

function pairDistance(landmarks, a, b) {
    const dx = landmarks[a].x - landmarks[b].x;
    const dy = landmarks[a].y - landmarks[b].y;
    return Math.hypot(dx, dy);
}

function computeFaceScale(landmarks, threshold) {
    if (!landmarks) return null;
    const pairs = [
        [LM.LEFT_EYE_INNER, LM.RIGHT_EYE_INNER],
        [LM.LEFT_EYE, LM.RIGHT_EYE],
        [LM.MOUTH_LEFT, LM.MOUTH_RIGHT],
        [LM.LEFT_EAR, LM.RIGHT_EAR]
    ];
    const distances = [];
    for (const [a, b] of pairs) {
        if (vis(landmarks[a]) < threshold || vis(landmarks[b]) < threshold) continue;
        const distance = pairDistance(landmarks, a, b);
        if (distance > 1e-6) distances.push(distance);
    }
    if (!distances.length) return null;
    distances.sort((x, y) => x - y);
    return distances[Math.floor(distances.length / 2)];
}

class CombinedMapper {
    constructor(config) {
        this.config = config;
        this.reset();
    }

    reset() {
        const posture = this.config.posture;
        const face = this.config.face;
        this.faceMapper = new PostureMapper({
            activation: face.activation,
            fullScale: face.fullScale,
            smoothing: posture.smoothing,
            useAbsolute: false
        });
        this.neck = new PostureMapper(posture);
        this.lean = new PostureMapper(posture);
        this.baseline = null;
        this.samples = 0;
        this.startedAt = null;
        this.poseMs = 0;
        this.metricSamples = [];
        this.neckBase = 0;
        this.leanBase = 0;
        this.last = { face: 0, neck: 0, lean: 0, level: 0, source: 'none', hunch: 0, lateral: 0 };
    }

    get calibrating() {
        const face = this.config.face;
        const minSamples = face.minSamples || face.baselineSamples || 8;
        const baselineMs = face.baselineMs || 1600;
        return this.samples < minSamples || this.poseMs < baselineMs;
    }

    map(landmarks, metrics) {
        const faceCfg = this.config.face;
        const scale = computeFaceScale(landmarks, faceCfg.visibility);

        if (this.calibrating) {
            if (scale != null) {
                this.baseline = this.baseline == null
                    ? scale
                    : (1 - faceCfg.baselineAlpha) * this.baseline + faceCfg.baselineAlpha * scale;
            }
            this.samples += 1;
            if (this.startedAt == null) this.startedAt = performance.now();
            this.poseMs = performance.now() - this.startedAt;
            this.metricSamples.push([metrics.neck || 0, metrics.lean || 0]);
            const count = this.metricSamples.length;
            this.neckBase = this.metricSamples.reduce((sum, sample) => sum + sample[0], 0) / count;
            this.leanBase = this.metricSamples.reduce((sum, sample) => sum + sample[1], 0) / count;
            this.last = { face: 0, neck: 0, lean: 0, level: 0, source: 'none', hunch: 0, lateral: 0 };
            return 0;
        }

        let face = 0;
        if (scale == null || this.baseline == null) {
            face = this.faceMapper.map(faceCfg.activation);
        } else {
            const ratio = scale / Math.max(this.baseline, 1e-6);
            if (ratio <= faceCfg.activation && !faceCfg.lockBaseline) {
                this.baseline = (1 - faceCfg.baselineAlpha) * this.baseline + faceCfg.baselineAlpha * scale;
            }
            face = this.faceMapper.map(ratio);
        }
        const mix = this.config.mix || ['face', 'neck', 'lean'];
        const centeredNeck = (metrics.neck || 0) - this.neckBase;
        const centeredLean = (metrics.lean || 0) - this.leanBase;
        const neck = mix.includes('neck') ? this.neck.map(centeredNeck) : 0;
        const lean = mix.includes('lean') ? this.lean.map(centeredLean) : 0;
        const scored = [];
        if (mix.includes('face')) scored.push(['face', face]);
        if (mix.includes('neck')) scored.push(['neck', neck]);
        if (mix.includes('lean')) scored.push(['lean', lean]);
        const level = scored.reduce((max, [, value]) => Math.max(max, value), 0);
        let source = 'none';
        if (level > 1e-6) {
            scored.sort((a, b) => b[1] - a[1]);
            source = scored[0][0];
        }
        this.last = {
            face,
            neck,
            lean,
            level,
            source,
            hunch: Math.max(face, neck),
            lateral: centeredLean
        };
        return level;
    }
}

class AlertState {
    constructor(threshold, flashInterval, flashOpacity) {
        this.threshold = clamp(threshold, 0, 1);
        this.flashInterval = Math.max(0.05, flashInterval);
        this.flashOpacity = clamp(flashOpacity, 0, 1);
        this.active = false;
        this.flashVisible = false;
        this.lastToggle = 0;
    }

    evaluate(level, maxOpacity, now) {
        const dim = clamp(level * maxOpacity, 0, 1);
        if (level < this.threshold) {
            this.active = false;
            this.flashVisible = false;
            return { dim, alert: false };
        }
        if (!this.active) {
            this.flashVisible = true;
            this.lastToggle = now;
        } else if (now - this.lastToggle >= this.flashInterval) {
            this.flashVisible = !this.flashVisible;
            this.lastToggle = now;
        }
        this.active = true;
        return { dim: this.flashOpacity, alert: this.flashVisible };
    }
}

function extractSpinePoints(landmarks, metrics, threshold) {
    if (!landmarks) return {};

    const point = (index) => {
        const landmark = landmarks[index];
        if (!landmark || vis(landmark) < threshold) return null;
        return { x: landmark.x, y: landmark.y, v: vis(landmark) };
    };
    const midpoint = (left, right) => {
        if (!left || !right) return null;
        return { x: (left.x + right.x) / 2, y: (left.y + right.y) / 2, v: Math.min(left.v || 1, right.v || 1) };
    };

    const nose = point(LM.NOSE);
    const leftEar = point(LM.LEFT_EAR);
    const rightEar = point(LM.RIGHT_EAR);
    let leftShoulder = point(LM.LEFT_SHOULDER);
    let rightShoulder = point(LM.RIGHT_SHOULDER);
    let leftHip = point(LM.LEFT_HIP);
    let rightHip = point(LM.RIGHT_HIP);
    const midShoulder = midpoint(leftShoulder, rightShoulder);
    let midHip = midpoint(leftHip, rightHip);
    const head = midpoint(leftEar, rightEar) || nose;

    if (midShoulder && !midHip) {
        let width = 0.15;
        if (leftShoulder && rightShoulder) {
            width = Math.max(Math.abs(rightShoulder.x - leftShoulder.x), 0.08);
        }
        const lean = metrics.lean || 0;
        midHip = {
            x: midShoulder.x + lean * width * 0.35,
            y: midShoulder.y + width * 1.75,
            v: midShoulder.v || 1,
            estimated: true
        };
        leftHip = { x: midHip.x - width * 0.42, y: midHip.y, estimated: true };
        rightHip = { x: midHip.x + width * 0.42, y: midHip.y, estimated: true };
    }

    const points = {
        head,
        nose,
        lShoulder: leftShoulder,
        rShoulder: rightShoulder,
        midShoulder,
        lHip: leftHip,
        rHip: rightHip,
        midHip
    };
    return Object.fromEntries(Object.entries(points).filter(([, value]) => value));
}

function mid(a, b) {
    if (!a || !b) return null;
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function drawSpine(canvas, points, metrics, level) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const usable = Object.values(points || {}).filter(Boolean);
    if (!usable.length) {
        ctx.fillStyle = '#c4bfb4';
        ctx.font = '22px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('looking for pose', w / 2, h / 2);
        return;
    }

    const xs = usable.map((p) => p.x);
    const ys = usable.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const spanX = Math.max(maxX - minX, 0.18);
    const spanY = Math.max(maxY - minY, 0.28);
    const scale = Math.min((w * 0.62) / spanX, (h * 0.72) / spanY);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const map = (p) => {
        if (!p) return null;
        return { x: w / 2 + (p.x - cx) * scale, y: h * 0.46 + (p.y - cy) * scale };
    };

    const head = map(points.head || points.nose);
    const lShoulder = map(points.lShoulder);
    const rShoulder = map(points.rShoulder);
    const midShoulder = map(points.midShoulder) || mid(lShoulder, rShoulder);
    const lHip = map(points.lHip);
    const rHip = map(points.rHip);
    const midHip = map(points.midHip) || mid(lHip, rHip);
    const hunch = clamp(
        metrics.hunch != null ? metrics.hunch : Math.max(Math.abs(metrics.neck || 0), level || 0),
        0,
        1
    );
    const visualHunch = Math.min(1, Math.pow(hunch, 0.7) * 1.25);
    const leanBend = (metrics.lean || 0) * 42;
    const ink = level > 0.55 ? '#c4473a' : '#1a1a1a';

    if (head && midShoulder) head.y += (midShoulder.y - head.y) * visualHunch * 0.55;
    if (midHip && midShoulder) {
        const compress = visualHunch * 0.28;
        midHip.y -= (midHip.y - midShoulder.y) * compress;
        if (lHip) lHip.y = midHip.y;
        if (rHip) rHip.y = midHip.y;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (midShoulder && midHip) {
        ctx.strokeStyle = '#d4cec3';
        ctx.lineWidth = 4;
        ctx.setLineDash([6, 7]);
        ctx.beginPath();
        ctx.moveTo(midShoulder.x, (head ? head.y : midShoulder.y) - 36);
        ctx.lineTo(midHip.x, midHip.y + 10);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineWidth = 7;

    if (lShoulder && rShoulder) {
        ctx.beginPath();
        ctx.moveTo(lShoulder.x, lShoulder.y);
        ctx.lineTo(rShoulder.x, rShoulder.y);
        ctx.stroke();
    }
    if (lHip && rHip) {
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(lHip.x, lHip.y);
        ctx.lineTo(rHip.x, rHip.y);
        ctx.stroke();
    }

    if (head && midShoulder && midHip) {
        const hunchBow = visualHunch * 56;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);
        ctx.quadraticCurveTo(
            midShoulder.x + leanBend * 0.35,
            midShoulder.y - 8 + hunchBow * 0.25,
            midShoulder.x,
            midShoulder.y
        );
        ctx.quadraticCurveTo(
            midShoulder.x + leanBend,
            (midShoulder.y + midHip.y) / 2 + hunchBow,
            midHip.x,
            midHip.y
        );
        ctx.stroke();
        for (let i = 1; i <= 5; i += 1) {
            const t = i / 6;
            const x = midShoulder.x + (midHip.x - midShoulder.x) * t + leanBend * Math.sin(Math.PI * t) * 0.35;
            const y = midShoulder.y + (midHip.y - midShoulder.y) * t + hunchBow * Math.sin(Math.PI * t);
            ctx.beginPath();
            ctx.arc(x, y, 5.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    if (head) {
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(head.x, head.y - 6, 22 * (1 + visualHunch * 0.42), 0, Math.PI * 2);
        ctx.stroke();
    }
}

function flipLandmarks(landmarks) {
    if (!landmarks) return null;
    return landmarks.map((lm) => ({
        x: 1 - lm.x,
        y: lm.y,
        z: lm.z,
        visibility: lm.visibility
    }));
}

const gate = document.getElementById('gate');
const startBtn = document.getElementById('start');
const statusEl = document.getElementById('status');
const video = document.getElementById('camera');
const dimEl = document.getElementById('dim');
const alertEl = document.getElementById('alert');
const sourceEl = document.getElementById('spine-source');
const copyEl = document.getElementById('spine-copy');
const liveDot = document.getElementById('live-dot');
const canvas = document.getElementById('spine');
const recalibrateBtn = document.getElementById('recalibrate');
const gateCopy = document.getElementById('gate-copy');
const gateAside = document.getElementById('gate-aside');
const modeDetail = document.getElementById('mode-detail');
const pageComputer = document.querySelector('.page-computer');
const pagePhone = document.querySelector('.page-phone');

let config = COMPUTER;
let smoother = new EmaSmoother(config.emaAlpha, config.holdSeconds, config.decaySeconds);
let mapper = new CombinedMapper(config);
let alertState = new AlertState(
    config.overlay.alertThreshold,
    config.overlay.flashInterval,
    config.overlay.flashOpacity
);

let poseLandmarker = null;
let running = false;
let lastVideoTime = -1;
let loopTimer = null;

function setStatus(text) {
    statusEl.textContent = text || '';
}

function applyMode(mode) {
    config = mode === 'phone' ? PHONE : COMPUTER;
    document.body.classList.toggle('is-phone', mode === 'phone');
    if (pageComputer) pageComputer.hidden = mode === 'phone';
    if (pagePhone) pagePhone.hidden = mode !== 'phone';
    alertEl.textContent = config.copy.alert;
    if (gateCopy) gateCopy.textContent = config.copy.gate;
    if (gateAside) gateAside.textContent = config.copy.aside;
    document.querySelectorAll('.mode-pick').forEach((btn) => {
        btn.classList.toggle('is-on', btn.dataset.mode === mode);
    });
    if (modeDetail) modeDetail.hidden = false;
    smoother = new EmaSmoother(config.emaAlpha, config.holdSeconds, config.decaySeconds);
    mapper = new CombinedMapper(config);
    alertState = new AlertState(
        config.overlay.alertThreshold,
        config.overlay.flashInterval,
        config.overlay.flashOpacity
    );
    copyEl.textContent = config.copy.calibrate;
}

function applyState({ calibrating, dim, alert, source, copy, points, metrics, level }) {
    dimEl.style.opacity = calibrating ? 0 : dim;
    alertEl.style.opacity = alert ? 1 : 0;
    liveDot.classList.toggle('is-ready', !calibrating);
    sourceEl.textContent = calibrating ? 'calibrating' : source || 'live';
    copyEl.textContent = copy;
    recalibrateBtn.classList.toggle('is-on', running);
    drawSpine(canvas, points || {}, metrics || {}, level || 0);
}

function processLandmarks(rawLandmarks, now) {
    const landmarks = flipLandmarks(rawLandmarks);
    const raw = computeMetrics(landmarks, config.visibility);
    const filtered = smoother.update(raw, now);
    const metrics = {
        lean: normalizeOne(filtered.leanDeg, config.scale.lean, config.deadbandDeg),
        neck: normalizeOne(filtered.neckDeg, config.scale.neck, config.deadbandDeg),
        tilt: normalizeOne(filtered.tiltDeg, config.scale.tilt, config.deadbandDeg)
    };

    if (!landmarks) {
        applyState({
            calibrating: mapper.calibrating,
            dim: 0,
            alert: false,
            source: mapper.calibrating ? 'calibrating' : 'none',
            copy: mapper.calibrating ? config.copy.looking : 'Looking for pose',
            points: {},
            metrics: mapper.last,
            level: 0
        });
        return;
    }

    const level = mapper.map(landmarks, metrics);
    const overlay = alertState.evaluate(level, config.overlay.maxOpacity, now);
    const calibrating = mapper.calibrating;
    const points = extractSpinePoints(landmarks, { ...metrics, ...mapper.last }, 0.35);
    applyState({
        calibrating,
        dim: overlay.dim,
        alert: overlay.alert && !calibrating,
        source: mapper.last.source,
        copy: calibrating
            ? config.copy.calibrate
            : overlay.alert
                ? config.copy.cue
                : 'Tracking',
        points,
        metrics: mapper.last,
        level
    });
}

async function createLandmarker(delegate) {
    const vision = await FilesetResolver.forVisionTasks(WASM_URL);
    return PoseLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate },
        runningMode: 'VIDEO',
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
}

function tick() {
    if (!running || !poseLandmarker) return;
    try {
        const nowMs = performance.now();
        if (video.readyState < 2 || nowMs <= lastVideoTime) return;
        lastVideoTime = nowMs;
        const result = poseLandmarker.detectForVideo(video, nowMs);
        const landmarks = result.landmarks && result.landmarks[0];
        processLandmarks(landmarks, nowMs / 1000);
    } catch (err) {
        copyEl.textContent = 'Tracking hiccup — stay in frame';
        console.error(err);
    }
}

function startLoop() {
    if (loopTimer == null) {
        loopTimer = window.setInterval(tick, 70);
    }
    const step = () => {
        tick();
        if (running) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function resetPipeline() {
    smoother.reset();
    mapper.reset();
}

async function start() {
    startBtn.disabled = true;
    setStatus('Requesting camera…');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStatus('This browser cannot access the camera. Try Chrome or Safari.');
        startBtn.disabled = false;
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
        });
        video.srcObject = stream;
        await video.play();
    } catch (err) {
        const name = err && err.name;
        if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
            setStatus('Camera permission was blocked. Allow the camera for this site, then try again.');
        } else if (name === 'NotFoundError') {
            setStatus('No camera was found on this device.');
        } else {
            setStatus(err && err.message ? err.message : 'Could not start the camera.');
        }
        startBtn.disabled = false;
        return;
    }

    setStatus('Loading pose model…');
    try {
        poseLandmarker = await createLandmarker('GPU');
    } catch (err) {
        try {
            poseLandmarker = await createLandmarker('CPU');
        } catch (cpuErr) {
            setStatus('Could not load the pose model. Check your connection and try again.');
            startBtn.disabled = false;
            return;
        }
    }

    resetPipeline();
    running = true;
    recalibrateBtn.classList.add('is-on');
    gate.classList.add('is-off');
    gate.setAttribute('aria-hidden', 'true');
    setStatus('');
    startLoop();
}

document.querySelectorAll('.mode-pick').forEach((btn) => {
    btn.addEventListener('click', () => applyMode(btn.dataset.mode));
});
startBtn.addEventListener('click', start);
recalibrateBtn.addEventListener('click', () => {
    resetPipeline();
    copyEl.textContent = config.copy.calibrate;
    sourceEl.textContent = 'calibrating';
    liveDot.classList.remove('is-ready');
    dimEl.style.opacity = 0;
    alertEl.style.opacity = 0;
});

const likelyPhone = window.matchMedia('(max-width: 900px)').matches;
applyMode(likelyPhone ? 'phone' : 'computer');

applyState({
    calibrating: true,
    dim: 0,
    alert: false,
    source: 'waiting',
    copy: config.copy.calibrate,
    points: {},
    metrics: {},
    level: 0
});

