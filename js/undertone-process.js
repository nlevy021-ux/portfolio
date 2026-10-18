// Visual process and development evidence for Undertone.
(() => {
    const project = window.projects.designEngineering.find(p => p.id === 'ai-speech-rater');
    if (!project) return;
    project.buildLabel = 'Process';
    project.build = `
    <div class="ut-process">
        <div class="ut-prose">
            <p><strong>Capture:</strong>My recording loop captures three seconds of mono audio at a time. Each sample is analyzed before the next recording begins.</p>
            <p><strong>Interpret:</strong>The trained six-category model scores possible readings of the voice. My application takes the highest-scoring label into the feedback logic.</p>
            <p><strong>Respond:</strong>I added a change rule so the same label is not announced repeatedly. Local text-to-speech delivers the label, with a short coaching phrase for supported categories.</p>
            <p><strong>Model development:</strong>I fine-tuned wav2vec2 on CREMA-D. The saved training run selected epoch 9 by macro F1, which gives each emotion category equal weight.</p>
            <p><strong>Application and interaction:</strong>I built controls to start and stop listening, inspect the top prediction, and review confidence history and recent detections. The listening loop then connects these results to spoken feedback.</p>
        </div>
        <div class="ut-flow" aria-label="Capture speech, estimate tone, deliver feedback">
            <section class="ut-step">
                <span class="ut-label">01 / Capture</span>
                <h3>Listen in short samples</h3>
                <div class="ut-windows" aria-label="Schematic: successive three-second audio samples">
                    <span>Sample 1<svg viewBox="0 0 60 32" aria-hidden="true"><path d="M4 13v6 M12 8v16 M20 11v10 M28 2v28 M36 13v6 M44 6v20 M52 11v10"/></svg>3s</span>
                    <span>Sample 2<svg viewBox="0 0 60 32" aria-hidden="true"><path d="M4 11v10 M12 6v20 M20 13v6 M28 8v16 M36 2v28 M44 11v10 M52 13v6"/></svg>3s</span>
                    <span>Sample 3<svg viewBox="0 0 60 32" aria-hidden="true"><path d="M4 13v6 M12 11v10 M20 6v20 M28 11v10 M36 8v16 M44 13v6 M52 11v10"/></svg>3s</span>
                </div>
                <small>Audio-window schematic · not a recording</small>
            </section>
            <section class="ut-step">
                <span class="ut-label">02 / Interpret</span>
                <h3>Estimate the vocal tone</h3>
                <div class="ut-model"><span>wav2vec2</span><span aria-hidden="true">↓</span>
                    <div class="ut-categories"><span>Anger</span><span>Disgust</span><span>Fear</span><span>Happy</span><span>Neutral</span><span>Sad</span></div>
                </div>
                <small>A prediction about the sound of speech, not certainty about someone’s feelings.</small>
            </section>
            <section class="ut-step">
                <span class="ut-label">03 / Respond</span>
                <h3>Choose when to speak</h3>
                <div class="ut-decision"><span>Different from the last spoken label?</span><div><span>Yes → Spoken cue</span><span>No → No new cue</span></div></div>
                <small>Earbud input and output are selected through the computer’s audio settings.</small>
            </section>
        </div>

        <div class="ut-evidence">
            <section>
                <span class="ut-label">Model development</span><h3>Train, evaluate, select</h3>
                <figure><a href="assets/ai-speech-rater/process/training-results.svg" target="_blank" rel="noopener"><img src="assets/ai-speech-rater/process/training-results.svg" width="1000" height="660" alt="Validation accuracy rises from 47.1% at epoch 1 to 72.8% at the selected epoch 9. Macro F1 rises from 0.429 to 0.728, then falls slightly at epoch 10." loading="lazy"></a>
                <figcaption>Saved training logs · 72.8% validation accuracy and 0.728 macro F1 at epoch 9. These are dataset validation results.</figcaption></figure>
            </section>
            <section>
                <span class="ut-label">Application & interaction</span><h3>Make the predictions inspectable</h3>
                <figure><a href="assets/ai-speech-rater/ui.png" target="_blank" rel="noopener"><img src="assets/ai-speech-rater/ui.png" width="1536" height="1024" alt="Interface visualization for AI Speech Rater showing listening controls, example emotion scores, and a detection log" loading="lazy"></a>
                <figcaption>Interface visualization · not a captured session or evaluation result. The intended everyday interface is an audio cue.</figcaption></figure>
            </section>
        </div>

    </div>`;

})();
