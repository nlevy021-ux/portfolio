// A responsive presentation of the existing F1 pipeline infographic.
(() => {
    const project = window.projects.designEngineering.find(p => p.id === 'f1-eeg');
    if (!project) return;
    project.buildLabel = 'Process';
    project.buildImages = [];
    project.build = `
        <div class="ut-process f1-process">
            <p class="f1-intro">Brain signals pass through filtering, calculation, and calibration before appearing alongside race telemetry. Focus and Capacity follow separate calculations, then join the same timestamped update.</p>
            <ol class="f1-pipeline" aria-label="Seven steps from EEG capture to the driver display">
                <li class="f1-stage">
                    <span class="ut-label">01 / Acquire</span>
                    <h3>Capture the signal</h3>
                    <div class="f1-panel f1-input"><span>OpenBCI Ganglion</span><div class="f1-channels" aria-label="Four EEG channels"><i></i><i></i><i></i><i></i></div><span>4 channels · 200 Hz</span></div>
                    <p>Record four EEG channels with timestamps that align each sample to the race.</p>
                </li>
                <li class="f1-stage">
                    <span class="ut-label">02 / Clean</span>
                    <h3>Check the signal quality</h3>
                    <div class="f1-panel f1-stack"><span>1–40 Hz bandpass</span><span>60 Hz line-noise handling</span><span>Motion & contact checks</span></div>
                    <p>Filter the signal and reject windows affected by motion or poor electrode contact.</p>
                </li>
                <li class="f1-stage">
                    <span class="ut-label">03 / Window</span>
                    <h3>Read overlapping samples</h3>
                    <div class="f1-panel f1-window"><div><span>2.5 seconds</span><span>2.5 seconds</span><span>2.5 seconds</span></div><small>Advance every 0.5 seconds</small></div>
                    <p>Evaluate a rolling 2.5-second window twice per second to update the metrics.</p>
                </li>
                <li class="f1-stage f1-wide">
                    <span class="ut-label">04 / Calculate</span>
                    <h3>Derive two distinct measures</h3>
                    <div class="f1-pair">
                        <div class="f1-panel"><h4>Current Focus</h4><p>Estimate theta, alpha, and beta band power, then calculate Pope’s engagement index.</p><div class="f1-formula">β power ÷ (α power + θ power)</div><small>Band powers → engagement ratio</small></div>
                        <div class="f1-panel"><h4>Focus Capacity</h4><p>Fit the aperiodic power spectrum and separate its exponent from oscillatory peaks.</p><div class="f1-formula">log P ≈ offset − χ · log f</div><small>Power spectrum → exponent χ</small></div>
                    </div>
                </li>
                <li class="f1-stage f1-wide">
                    <span class="ut-label">05 / Calibrate</span>
                    <h3>Relate the measures to the driver</h3>
                    <div class="f1-pair">
                        <div class="f1-panel"><h4>Engagement ratio → Focus, 0–100</h4><p>Map against the driver’s session calibration and smooth short-lived fluctuations.</p></div>
                        <div class="f1-panel"><h4>Exponent → Capacity, 0–100</h4><p>Map change from the calibrated baseline, keeping Capacity distinct from Focus.</p></div>
                    </div>
                </li>
                <li class="f1-stage f1-wide">
                    <span class="ut-label">06 / Aggregate</span>
                    <h3>Connect focus to the race</h3>
                    <p>I use race timestamps to place each valid Focus score within a lap and sector. Averaging those scores shows how focus changes over the race; pairing them with sector times lets the driver review concentration alongside performance.</p>
                    <div class="f1-panel f1-sectors"><div><span class="f1-mini-label">Match EEG to race timing</span><div class="f1-sector-tags"><span>S1</span><span>S2</span><span>S3</span></div></div><span class="f1-arrow" aria-hidden="true">→</span><div><span class="f1-mini-label">Compare focus and time</span><p>Track the current lap’s average focus against the previous lap, and compare each completed sector’s time with its previous recorded time.</p></div></div>
                    <div class="f1-pair f1-race-comparisons">
                        <div class="f1-panel"><h4>Focus change · points</h4><p>The Focus score runs from 0–100 relative to the driver’s calibration. The lap comparison subtracts the previous lap’s average from the current lap’s running average.</p><div class="f1-formula">Current lap focus − previous lap focus</div><small>Positive: higher average focus. Negative: lower average focus.</small></div>
                        <div class="f1-panel"><h4>Time change · seconds</h4><p>For each completed sector, compare its time with the last recorded time for that same sector. This shows where time was gained or lost alongside the focus readings.</p><div class="f1-formula">Current sector time − previous same-sector time</div><small>Negative: faster. Positive: slower. A comparison appears once a previous time is available.</small></div>
                    </div>
                    <p class="f1-footnote">The current prototype shows observed time differences. It does not yet predict lap time or isolate how much of a time change was caused by focus.</p>
                </li>
                <li class="f1-stage f1-wide">
                    <span class="ut-label">07 / Publish</span>
                    <h3>Send one synchronized update</h3>
                    <div class="f1-panel"><div class="f1-output"><div><h4>Focus</h4><span>Current · 0–100</span></div><div><h4>Capacity</h4><span>Current · 0–100</span></div><div><h4>Lap focus Δ</h4><span>Points vs. previous lap</span></div><div><h4>Sector time Δ</h4><span>Seconds gained or lost</span></div></div><p class="f1-output-note">Live driver display · two updates per second</p></div>
                    <p class="f1-footnote">EEG, metrics, and race events share one clock. Rejected windows are flagged, and raw and derived values are saved for post-race review.</p>
                </li>
            </ol>
        </div>`;
})();
