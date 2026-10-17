// Compact process diagrams shared by photography and technology project pages.
window.artProcesses = {
    precedence: {
        process: `
            <div class="process-story">
                <div class="process-original">${window.projects.photography.find(project => project.id === 'precedence').process}</div>
                <div class="process-flow" aria-label="Drawing to computational intervention to finished image">
                    <figure class="flow-stage">
                        <a class="flow-media" href="assets/precedence/process/green-drawing.jpg" target="_blank" rel="noopener"><img src="assets/precedence/process/green-drawing.jpg" alt="Original Green drawing with outlined forms and flat green color fields" loading="lazy" width="2100" height="1500"></a>
                        <figcaption><span class="flow-label">01 / My drawing</span>I set the forms, perspective, and composition.</figcaption>
                    </figure>
                    <span class="flow-arrow" aria-hidden="true">→</span>
                    <div class="flow-stage">
                        <div class="flow-compute" aria-label="Pipeline diagram: image direction, SDXL Turbo rendering, Real-ESRGAN upscaling">
                            <span class="compute-caption">Pipeline diagram</span>
                            <div class="compute-node human-node"><span>My direction</span>Drawing + prompts</div>
                            <span class="compute-arrow" aria-hidden="true">↓</span>
                            <div class="compute-node"><span>SDXL Turbo</span>Render materials &amp; light</div>
                            <span class="compute-arrow" aria-hidden="true">↓</span>
                            <div class="compute-node"><span>Real-ESRGAN</span>Upscale the image</div>
                        </div>
                        <div class="flow-caption"><span class="flow-label">02 / My intervention</span>I write the prompts, run the rendering workflow, and choose which images to develop.</div>
                        <details class="process-code">
                            <summary>How this works</summary>
                            <p>I give SDXL Turbo my drawing and a prompt describing how I want the scene to look. It uses the drawing as a starting point and generates a new image with materials, lighting, and shadows.</p>
                            <p>I then use Real-ESRGAN to increase the image’s resolution.</p>
                            <p class="code-caption">Photographic-finish settings from my FLUX script. The artwork shown uses SDXL Turbo and Real-ESRGAN.</p>
                            <pre><code>$Prompt    = "turn this into a real photograph, preserve exact geometry and composition, real materials, subtle imperfections, natural lighting, slight camera softness, believable reflections, documentary photography, shot on pentax 67, 55mm lens"
$Width     = 896
$Height    = 640
$Steps     = 2
$Guidance  = 3.5
$Strength  = 0.2
$Device    = "cuda"</code></pre>
                        </details>
                    </div>
                    <span class="flow-arrow" aria-hidden="true">→</span>
                    <figure class="flow-stage">
                        <a class="flow-media" href="assets/precedence/render-05.png" target="_blank" rel="noopener"><img src="assets/precedence/render-05.png" alt="Finished Green image: the drawn forms rendered as sculptures in a lit interior" loading="lazy" width="1024" height="731"></a>
                        <figcaption><span class="flow-label">03 / Finished image</span><em>Green.</em> A photographic scene built from a drawing.</figcaption>
                    </figure>
                </div>
            </div>`
    },
    pareidolia: {
        description: 'A photographic exploration of how computational interpretation can turn an ambiguous resemblance into a visible transformation.',
        detailedDescription: `
            <p>Pareidolia is the tendency to see familiar forms in ambiguous images. I use my photographs as the starting point for a system that proposes alternate readings, then makes a selected interpretation visible through image editing.</p>
            <p>A cactus, facade, or road marking takes on a different identity within a recognizable scene. The project asks how the categories built into vision models shape what they find in an image, and how my choices influence the result.</p>`,
        process: `
            <div class="process-story">
                <div class="process-original">${window.projects.photography.find(project => project.id === 'pareidolia').process}</div>
                <div class="process-flow" aria-label="Original photograph to computational intervention to edited image">
                    <figure class="flow-stage">
                        <a class="flow-media" href="assets/pareidolia/process/cactus-original.jpg" target="_blank" rel="noopener"><img src="assets/pareidolia/process/cactus-original.jpg" alt="Original photograph of tall cacti against an orange wall" loading="lazy" width="250" height="333"></a>
                        <figcaption><span class="flow-label">01 / My photograph</span>The original scene supplies the shapes, light, and context.</figcaption>
                    </figure>
                    <span class="flow-arrow" aria-hidden="true">→</span>
                    <div class="flow-stage">
                        <div class="flow-compute" aria-label="Pipeline diagram: SAM 2 isolates a region, GPT-4o proposes readings, I choose an interpretation, image API edits the region">
                            <span class="compute-caption">Pipeline diagram</span>
                            <div class="compute-node"><span>SAM 2 + GPT-4o</span>Isolate → propose readings</div>
                            <span class="compute-arrow" aria-hidden="true">↓</span>
                            <div class="compute-node human-node"><span>My selection</span>Choose an interpretation</div>
                            <span class="compute-arrow" aria-hidden="true">↓</span>
                            <div class="compute-node"><span>Image-edit API</span>Photograph + mask + prompt</div>
                        </div>
                        <div class="flow-caption"><span class="flow-label">02 / My intervention</span>My code connects region selection, scoring, and image editing. I choose which interpretation to pursue.</div>
                        <details class="process-code">
                            <summary>How this works</summary>
                            <p>The code compares the suggested interpretations: how closely each one matches the shape and texture in the photograph, how unexpected it is, and how believable it might look.</p>
                            <p>It adds these scores together to put the suggestions in order. I choose which one to use; the highest score does not make a suggestion “correct.”</p>
                            <p class="code-caption">From my scoring code: each weight sets how much that quality counts toward the total.</p>
                            <pre><code>final = (
    weights.shape * shape
    + weights.texture * texture
    + weights.uncanny * cand.uncanny
    + weights.plausibility * cand.plausibility
    + weights.composition * composition
)</code></pre>
                            <p class="code-caption">“Composition” accounts for how much of the photograph the selected area occupies.</p>
                        </details>
                    </div>
                    <span class="flow-arrow" aria-hidden="true">→</span>
                    <figure class="flow-stage">
                        <a class="flow-media" href="assets/pareidolia/cactus.png" target="_blank" rel="noopener"><img src="assets/pareidolia/cactus.png" alt="Edited cactus image with stems resembling flat cut-paper forms" loading="lazy" width="768" height="1024"></a>
                        <figcaption><span class="flow-label">03 / Edited image</span><em>Cactus.</em> The stems now look like cut paper against the orange wall.</figcaption>
                    </figure>
                </div>

            </div>`
    }
};
