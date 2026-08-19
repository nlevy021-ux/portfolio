(function () {
    const app = document.getElementById('app');
    const feed = document.getElementById('feed');
    const whisper = document.getElementById('whisper');
    const meta = document.getElementById('meta');
    const bud = document.getElementById('bud');
    const callout = document.getElementById('callout');
    const calloutEmo = document.getElementById('callout-emo');
    const calloutPct = document.getElementById('callout-pct');
    const canvas = document.getElementById('wave');
    const veil = document.getElementById('veil');
    if (!app || !canvas) return;

    const ctx = canvas.getContext('2d');
    const autoStart = new URLSearchParams(location.search).has('auto');

    let beats = [];
    let runId = 0;
    let waveAmp = 0.08;
    let targetAmp = 0.08;
    let raf = 0;
    let voicesReady = false;

    whisper.classList.add('is-empty');

    function wait(ms) {
        const id = runId;
        return new Promise((resolve) => {
            window.setTimeout(() => resolve(id === runId), ms);
        });
    }

    function englishVoices() {
        if (!window.speechSynthesis) return [];
        return window.speechSynthesis.getVoices().filter((v) => /en[-_]?/i.test(v.lang));
    }

    function pickVoice(kind) {
        const voices = englishVoices();
        if (kind === 'speaker') {
            return voices.find((v) => /David|Guy|Ryan|Male|George/i.test(v.name))
                || voices[1]
                || voices[0]
                || null;
        }
        return voices.find((v) => /Aria|Jenny|Samantha|Zira|Female|Natural/i.test(v.name))
            || voices[0]
            || null;
    }

    function speak(text, kind) {
        return new Promise((resolve) => {
            if (!text || !window.speechSynthesis) {
                resolve();
                return;
            }
            let settled = false;
            const finish = () => {
                if (settled) return;
                settled = true;
                resolve();
            };
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.rate = kind === 'speaker' ? 0.92 : 0.88;
            utter.pitch = kind === 'speaker' ? 0.92 : 0.84;
            utter.volume = kind === 'speaker' ? 1 : 0.86;
            const voice = pickVoice(kind);
            if (voice) utter.voice = voice;
            utter.onend = finish;
            utter.onerror = finish;
            window.speechSynthesis.speak(utter);
            window.setTimeout(finish, 2800);
        });
    }

    function setState(state) {
        app.setAttribute('data-state', state);
        targetAmp = state === 'speaking' ? 1 : state === 'call' ? 0.16 : 0.05;
    }

    async function setWhisper(text) {
        whisper.classList.add('is-swap');
        if (!await wait(420)) return;
        if (!text) {
            whisper.textContent = '';
            whisper.classList.add('is-empty');
            return;
        }
        whisper.textContent = text;
        whisper.classList.remove('is-empty', 'is-swap');
    }

    function revealWords(el, text) {
        const words = text.split(/\s+/);
        el.textContent = '';
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.className = 'sr-word';
            span.textContent = (i === 0 ? '' : ' ') + word;
            span.style.animationDelay = `${i * 90}ms`;
            el.appendChild(span);
        });
    }

    function addLine(text) {
        feed.querySelectorAll('.sr-line').forEach((node) => {
            node.classList.remove('is-now');
            node.classList.add('is-past');
        });
        const row = document.createElement('div');
        row.className = 'sr-line';
        const speaker = document.createElement('span');
        speaker.className = 'sr-speaker';
        speaker.textContent = 'Speaker';
        const p = document.createElement('p');
        row.appendChild(speaker);
        row.appendChild(p);
        feed.appendChild(row);
        requestAnimationFrame(() => row.classList.add('is-now'));
        revealWords(p, text);
        callout.classList.remove('is-on');
        setWhisper('');
        setState('speaking');
    }

    async function applyCall(beat) {
        setState('call');
        calloutEmo.textContent = beat.emotion;
        calloutPct.textContent = `${Math.round(beat.confidence * 100)}%`;
        callout.classList.add('is-on');
        meta.textContent = '';
        bud.classList.add('is-speaking');
        await setWhisper(beat.cue);
        window.setTimeout(() => bud.classList.remove('is-speaking'), 2400);
    }

    function sizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width * dpr));
        const h = Math.max(1, Math.floor(rect.height * dpr));
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
    }

    function barAmp(u, t, amp) {
        let packets = 0.04;
        const shift = (t * 0.08) % 1;
        for (let k = 0; k < 4; k += 1) {
            const center = (k + 0.55) / 4.2 - shift * 0.06;
            const d = (u - center) / 0.05;
            packets += Math.exp(-d * d);
        }
        return (0.05 + Math.min(1, packets) * 0.72) * amp;
    }

    function drawWave(now) {
        sizeCanvas();
        const w = canvas.width;
        const h = canvas.height;
        waveAmp += (targetAmp - waveAmp) * 0.08;
        ctx.clearRect(0, 0, w, h);

        const mid = h * 0.5;
        const peak = h * 0.44;
        const bars = Math.max(48, Math.floor(w / (2.4 * (window.devicePixelRatio || 1))));
        const step = w / bars;
        const t = now / 1000;
        const amp = Math.max(waveAmp, 0.05);
        const barW = Math.max(1.4 * (window.devicePixelRatio || 1), step * 0.55);

        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(240, 196, 90, 0.7)';

        ctx.shadowBlur = 14 * (window.devicePixelRatio || 1);
        ctx.strokeStyle = 'rgba(232, 196, 92, 0.4)';
        ctx.lineWidth = barW * 1.5;
        for (let i = 0; i < bars; i += 1) {
            const mag = barAmp(i / (bars - 1), t, amp) * peak;
            const x = i * step + step * 0.5;
            ctx.beginPath();
            ctx.moveTo(x, mid - mag);
            ctx.lineTo(x, mid + mag);
            ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(240, 214, 120, 0.98)';
        ctx.lineWidth = barW;
        for (let i = 0; i < bars; i += 1) {
            const mag = barAmp(i / (bars - 1), t, amp) * peak;
            const x = i * step + step * 0.5;
            ctx.beginPath();
            ctx.moveTo(x, mid - mag);
            ctx.lineTo(x, mid + mag);
            ctx.stroke();
        }
        raf = requestAnimationFrame(drawWave);
    }

    async function playBeat(beat) {
        const started = performance.now();
        const id = runId;
        addLine(beat.text);
        speak(beat.text, 'speaker');
        if (!await wait(1000) || id !== runId) return;
        await applyCall(beat);
        if (id !== runId) return;
        speak(beat.cue, 'cue');
        const remaining = 3000 - (performance.now() - started);
        if (!await wait(Math.max(400, remaining)) || id !== runId) return;
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        setState('listening');
    }

    async function start() {
        const id = ++runId;
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        feed.innerHTML = '';
        whisper.textContent = '';
        whisper.classList.add('is-empty');
        meta.textContent = '';
        callout.classList.remove('is-on');
        setState('listening');
        if (!await wait(600)) return;
        for (const beat of beats) {
            if (id !== runId) return;
            await playBeat(beat);
        }
        if (id === runId) setState('idle');
        if (!await wait(1800)) return;
        if (id === runId) start();
    }

    function armStart() {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        veil.classList.add('is-off');
        whisper.classList.add('is-empty', 'is-swap');
        bud.classList.remove('is-speaking');
        start();
    }

    veil.addEventListener('click', armStart);
    app.addEventListener('click', () => {
        if (veil.classList.contains('is-off')) armStart();
    });
    window.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        if (e.code === 'Space' || e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            armStart();
        }
    });
    window.addEventListener('obsSourceVisibleChanged', (event) => {
        if (event.detail && event.detail.visible) armStart();
    });
    window.addEventListener('obsSourceActiveChanged', (event) => {
        if (event.detail && event.detail.active) armStart();
    });

    let autoArmed = false;
    function onVoices() {
        voicesReady = true;
        if (!autoArmed) {
            autoArmed = true;
            armStart();
        }
    }

    fetch('js/speech-radar-scene.json')
        .then((res) => res.json())
        .then((data) => {
            beats = data.beats || [];
            if (typeof window.speechSynthesis !== 'undefined') {
                window.speechSynthesis.getVoices();
                window.speechSynthesis.addEventListener('voiceschanged', onVoices, { once: true });
                if (window.speechSynthesis.getVoices().length) onVoices();
                else window.setTimeout(onVoices, 400);
            } else {
                armStart();
            }
        });

    raf = requestAnimationFrame(drawWave);
})();
