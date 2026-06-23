window.projects = {
    photography: [
        {
            id: 'precedence',
            title: 'Precedence',
            year: '2026',
            medium: 'Photography',
            image: 'assets/precedence/render-01.png',
            description: 'A media theory project about representation shaping reality instead of simply capturing it. Drawings are run through SDXL Turbo and Real-ESRGAN, then translated into metal sculptures.',
            detailedDescription: `
                <p>Precedence is about what happens when representation begins to shape reality instead of simply capturing it. The project starts from Baudrillard’s idea that the map can come before the territory, where images no longer just point back to the real, but begin to produce it.</p>

                <p>For this series, I begin with hand drawings and run them through a fixed SDXL Turbo image pipeline, then upscale them with Real-ESRGAN. The resulting images look like photographs of sculptures in architectural spaces, with specific lighting, shadows, and materials, even though the scenes never existed in front of a camera.</p>

                <p>Selected digital forms are then fabricated as real metal sculptures. In this process, the image becomes a kind of instruction for reality. The object does not come first; it follows the image, turning fabrication into a way of making the representation physically true.</p>
            `,
            work: 'Seven still-life renders produced from original drawings via SDXL Turbo and Real-ESRGAN. Forms extracted from the generated compositions are fabricated as metal sculptures, closing the loop between indexical image and physical object.',
            process: `
                <p><strong>Drawing:</strong> Hand drawings set the composition, gesture, and spatial relationships.</p>

                <p><strong>SDXL Turbo:</strong> Each drawing is run through an SDXL Turbo image-to-image pipeline with the same prompt language around geometric sculpture, architectural space, hard light, and mixed materials. The model keeps the structure of the drawing while adding surface, atmosphere, and a photographic quality.</p>

                <p><strong>Real-ESRGAN:</strong> The images are then upscaled to bring out sharper detail, texture, and light, so they read less like rough AI outputs and more like finished photographic images.</p>

                <p><strong>Fabrication:</strong> Selected forms from the images are then translated into metal sculptures. The objects do not come before the images; they are built afterward, making the physical work follow the representation.</p>
            `,
            url: 'project.html?id=precedence',
            images: [
                { url: 'assets/precedence/render-01.png', title: 'Chairs', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-02.png', title: 'String', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-03.png', title: 'Midnight', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-04.png', title: 'Roof', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-05.png', title: 'Green', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-06.png', title: 'Switch', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-07.png', title: 'Stair', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/photo-01.png', title: 'Installation', materials: 'Metal, iridescent film, inkjet print', layout: 'full' },
                { url: 'assets/precedence/photo-02.png', title: 'Teardrop', materials: 'Metal, iridescent film', layout: 'full' },
                { url: 'assets/precedence/photo-03.png', title: 'Cylinder', materials: 'Metal wire, glass', layout: 'full' },
                { url: 'assets/precedence/photo-04.png', title: 'Sail', materials: 'Metal wire, glass, iridescent film', layout: 'full' }
            ]
        },
        {
            id: 'pareidolia',
            title: 'Pareidolia',
            year: '2026',
            medium: 'Photography',
            image: 'assets/pareidolia/eyes.png',
            description: 'A project about pareidolia, computer vision, and how human ways of seeing become embedded in the datasets and systems trained on them.',
            detailedDescription: `
                <p>Pareidolia is the tendency to see meaning in ambiguous forms—most often faces, figures, or familiar shapes in random patterns.</p>

                <p>This project looks at the relationship between that human impulse and computer vision. The photographs begin with ordinary scenes that contain accidental resemblances, small visual moments that can be read in more than one way. When these images are passed through a computer vision system, the model produces its own labels and predictions, often with confidence even when the image is uncertain or ambiguous.</p>

                <p>The work is about the space between human misrecognition and machine misclassification. Because datasets are labeled, organized, and designed by people, they carry human assumptions into the systems trained on them. In that sense, computer vision does not simply extend sight. It can also scale up the same biases, habits, and mistakes already present in human perception.</p>
            `,
            work: 'Nine photographs of ambiguous everyday scenes paired with computer vision outputs. Each pairing shows a moment where human pareidolia and algorithmic prediction meet, overlap, or misread the image in different ways.',
            process: `
                <p><strong>Human reading:</strong> Each image is considered through what a viewer might project onto it: a face, a figure, a body, or another familiar form. This makes the act of misreading visible instead of treating it as a private reaction.</p>

                <p><strong>Computer vision:</strong> The same images are run through a computer vision model, which returns labels, categories, and confidence scores. These outputs show how the system interprets ambiguity through the categories it has been trained to recognize.</p>

                <p><strong>Comparison:</strong> Human readings and model predictions are shown together to trace how perception moves from individual sight, to labeled datasets, to automated systems. The project asks what happens when the human habit of seeing patterns everywhere becomes part of a machine’s way of seeing.</p>
            `,
            url: 'project.html?id=pareidolia',
            galleryClass: 'gallery-equal-pairs',
            images: [
                { url: 'assets/pareidolia/cactus.png', title: 'Cactus', materials: '2026', layout: 'half-left' },
                { url: 'assets/pareidolia/rome.png', title: 'Rome', materials: '2026', layout: 'half-right' },
                { url: 'assets/pareidolia/fireplace.png', title: 'Fireplace', materials: '2026', layout: 'half-left' },
                { url: 'assets/pareidolia/yellow-road.png', title: 'Yellow Road', materials: '2026', layout: 'half-right' },
                { url: 'assets/pareidolia/kitchen.png', title: 'Kitchen', materials: '2026', layout: 'half-left' },
                { url: 'assets/pareidolia/pool.png', title: 'Pool', materials: '2026', layout: 'half-right' },
                { url: 'assets/pareidolia/window.png', title: 'Window', materials: '2026', layout: 'half-left' },
                { url: 'assets/pareidolia/eyes.png', title: 'Eyes', materials: '2026', layout: 'half-right' },
                { url: 'assets/pareidolia/suitcases.png', title: 'Suitcases', materials: '2026', layout: 'half-left' }
            ]
        },
        {
            id: 'constructed-organics',
            title: 'Constructed Organics',
            year: '2025',
            medium: 'Photography',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/rock_orig.jpg',
            description: 'Constructed Organics focuses on turning the industrial back to the natural in both visual and material forms. This series explores how 3D interactions come into play when deconstructing architectural rigidity into organic fluidity. Industrial materials reference the structures being deconstructed, while the reintroduction of organic shapes challenges the utility-focused nature of our built environment. The work invites viewers to relate physically to these forms, bridging the gap between the manufactured and the living.',
            work: 'This body of work focuses on the intersection of biological patterns and digital construction.',
            //process: 'Using a combination of microscopic photography and 3D modeling software, I recreated organic textures in a virtual space.',
            url: 'project.html?id=constructed-organics',
            images: [
                //change image sizes from full - they are too big
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/editor/waterfall.jpg?1766365363',
                    title: 'Stratified Flow',
                    materials: 'Steel, inkjet printed images, wire',
                    dimensions: '18 × 42 in'
                },
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/sky_orig.jpg',
                    title: 'Atmospheric Plane',
                    materials: 'Printed canvas, wood, string',
                    dimensions: '30 x 48 in'
                },
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/rock_orig.jpg',
                    title: 'Lithic Form',
                    materials: 'Quikrete, inkjet printed images',
                    dimensions: '12 x 18 in'
                }
            ],
            detailedDescription: 'Constructed Organics focuses on turning the industrial back to the natural in both visual and material forms. This series explores how 3D interactions come into play when deconstructing architectural rigidity into organic fluidity. Industrial materials reference the structures being deconstructed, while the reintroduction of organic shapes challenges the utility-focused nature of our built environment. The work invites viewers to relate physically to these forms, bridging the gap between the manufactured and the living.',
        },
        {
            id: 'spaces',
            title: 'Spaces',
            year: '2025',
            medium: 'Photography',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/art-practice3315-colten-spf25-levy-04_orig.jpg',
            description: 'Spaces examines how the built environment impacts our lives and conditions our movement through the world. Through alterations in these spaces using both digital and analog processes, I explore how shifting between two and three dimensions can change the way we see things. This translation calls attention to perception and spatial awareness, questioning the constraints of standardized urban codes. By disrupting these expected views, the work reveals new possibilities for how we interpret reality.',
            work: 'Searching for meaning in the absence of human presence within modern architecture.',
            //process: 'Long exposure photography taken during early morning hours in public transit hubs and office buildings.',
            url: 'project.html?id=spaces',
            images: [
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/art-practice3315-colten-spf25-levy-01_orig.jpg', title: 'Untitled #1', materials: '2025' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/art-practice3315-colten-spf25-levy-04_orig.jpg', title: 'Untitled #2', materials: '2025' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/art-practice3315-colten-spf25-levy-03_orig.jpg', title: 'Untitled #3', materials: '2025' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/art-practice3315-colten-spf25-levy-02_orig.jpg', title: 'Untitled #4', materials: '2025' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc4019_orig.jpg', title: 'Untitled #5', materials: '2025' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc4005_orig.jpg', title: 'Untitled #6', materials: '2025' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/wall-over-wall_orig.jpg', title: 'Untitled #7', materials: '2025' }
            ]
        },
        {
            id: 'x3-18-3',
            title: 'X3.18/3',
            year: '2024',
            medium: 'Photography',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/invert-kemper_orig.jpg',
            description: 'This series is about abstracting the everyday object and obscuring scale to make the small and the large interact. By removing context, the work invites a unique individual experience that prioritizes personal perception over objective reality.',
            url: 'project.html?id=x3-18-3',
            images: [
                //fix positioning and add details
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/light-board-paper-3-exp_orig.jpg', title: 'Paper', materials: '2025', layout: 'half-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/color-swirls-glass-bottle-jpg_orig.jpg', title: 'Glass Bottle', materials: '2025', layout: 'half-left' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/metal-texture-smaller-file_orig.jpg', title: 'Pipe', materials: '2025', layout: 'half-left' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/lens_orig.jpg', title: 'Lens', materials: '2025', layout: 'inset-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/invert-column_orig.jpg', title: 'Beam', materials: '2025', layout: 'inset-left' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc1206-smaller-file_orig.jpg', title: 'Headphones', materials: '2025', layout: 'half-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc1012_orig.jpg', title: 'Self-Portrait', materials: '2025', layout: 'half-left' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/bench-light-smaller-file_orig.jpg', title: 'Bench', materials: '2025', layout: 'inset-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/invert-kemper-flat_orig.jpg', title: 'Facade', materials: '2025', layout: 'inset-left' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/lamp-5-exposure_orig.jpg', title: 'Lamp', materials: '2025', layout: 'half-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/tissue-box-3-brighter_orig.jpg', title: 'Box', materials: '2025', layout: 'half-left' }

            ]

        },
        {
            id: 'ebb-and-faux',
            title: 'Ebb and Faux',
            year: '2023',
            medium: 'Photography',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/editor/final-2d.jpg?1735025553',
            description: 'Ebb and Faux involves taking distinct spaces and creating a collaborative representation of them together. This combination explores the increasing blur between our physical and digital experiences of the world. By merging these environments, I aim to show how digital media regulates our attention and separates us from the physical, yet also offers new modes of connection. The resulting work is a hybrid landscape that questions the boundaries of our constructed realities.',
            url: 'project.html?id=ebb-and-faux',
            images: [
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/editor/final-2d.jpg?1719467209', title: 'Untitled #1', materials: '2025', layout: 'full' },
                //low quality
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/editor/ari-s-totebag.jpg?1719467191', title: 'Untitled #2', materials: '2025', layout: 'half-left' },
                //low quality
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/editor/chair-clouds.jpg?1719467196', title: 'Untitled #3', materials: '2025', layout: 'half-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/fabric-mimicking-water_orig.jpg', title: 'Untitled #4', materials: '2025', layout: 'inset-left' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/hand-paint-collage_orig.jpg', title: 'Untitled #5', materials: '2025', layout: 'inset-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/steinberg-window_orig.jpg', title: 'Untitled #6', materials: '2025', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/window-building_orig.jpg', title: 'Untitled #7', materials: '2025', layout: 'half-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/light-under-chair_orig.jpg', title: 'Untitled #5', materials: '2025', layout: 'half-left' },
                //low quality
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/editor/mesh-fabric.jpg?1719466962', title: 'Untitled #6', materials: '2025', layout: 'inset-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/starry-night-fuzz-printer-color-lighteer-smaller_orig.jpg', title: 'Untitled #7', materials: '2025', layout: 'inset-left' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dark-texture-3_orig.jpg', title: 'Untitled #6', materials: '2025', layout: 'half-left' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/ribbons-regular-smaller_orig.jpg', title: 'Untitled #7', materials: '2025', layout: 'half-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/stairs_orig.jpg', title: 'Untitled #4', materials: '2025', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/tube-wave_orig.jpg', title: 'Untitled #5', materials: '2025', layout: 'inset-left' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/sky-window-smaller_orig.jpg', title: 'Untitled #6', materials: '2025', layout: 'half-right' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/rock-texture-smaller_orig.jpg', title: 'Untitled #7', materials: '2025', layout: 'full' }
            ]
        },
        {
            id: 'idiosyncratic',
            title: 'Idiosyncratic',
            year: '2023',
            medium: 'Photography',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dark-real-mix-textured-mountainside-fav_orig.jpg',
            description: 'Capturing unique, unplanned moments that defy conventional composition to reveal the individual experience within objective reality.',
            url: 'project.html?id=idiosyncratic',
            images: [
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/abandoned-coils_orig.jpg', title: 'Untitled #1', materials: '2023', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/shadow-rocks-under-water_orig.jpg', title: 'Untitled #2', materials: '2023', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dark-real-mix-textured-mountainside-fav_orig.jpg', title: 'Untitled #3', materials: '2023', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/snow-in-textured-mountainside_orig.jpg', title: 'Untitled #4', materials: '2023', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/lensles-up-with-lights_orig.jpg', title: 'Untitled #5', materials: '2023', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/green-splotch-tomatos-brightened-and-smaller_orig.jpg', title: 'Untitled #6', materials: '2023', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/brick-wall-invert_orig.jpg', title: 'Untitled #7', materials: '2023', layout: 'full' }

            ]
        },
        {
            id: 'architecture',
            title: 'Architecture',
            year: '2022',
            medium: 'Photography',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0942-abstract.jpg',
            description: 'Geometric explorations of urban landscapes that view buildings as large-scale sculptures repurposed for utility rather than expression.',
            url: 'project.html?id=architecture',
            images: [
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0942-abstract.jpg', title: 'Xterior', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0952.jpg', title: 'Green Chair', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/building-outline-colors-sun-flare.jpg', title: 'Repetition', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/depth-buidling.jpg', title: 'Constructions #4', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0906-building-inside-of-buidling.jpg', title: 'Constructions #5', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0950.jpg', title: 'Artificial Landscape #8', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/floating-house-final.jpg', title: 'Artificial Landscape #12', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0176.jpg', title: 'Unidentified Object', materials: '2022', layout: 'full' },
            ]

        },
        {
            id: 'v1-2l',
            title: 'V1-2L-0.75cm-∞',
            year: '2022',
            medium: 'Photography',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/editor/dsc-0856-1-align-text.jpg?1690761294',
            description: 'Conceptual photography focusing on measurement and distance, questioning the constraints imposed by standardized spatial systems.',
            url: 'project.html?id=v1-2l',
            images: [
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0856-1-align-text_orig.jpg', title: 'FT1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0873-1-text-align_orig.jpg', title: 'FP1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0322-2-align-text_orig.jpg', title: 'FG1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0323-2-align-text_orig.jpg', title: 'FB1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0429-1-text-align_orig.jpg', title: 'FB2L-1.3-2.4cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0408-text-align_orig.jpg', title: 'FGO1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0133-1-align-text_orig.jpg', title: 'LF1L-1.0-1.5cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0126-1-align-text_orig.jpg', title: 'LF1L-0.75cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0122-1-align-text_orig.jpg', title: 'LF1L-0.9cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0963-2-text-align_orig.jpg', title: 'TF1L-0.88-1.2cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0966-2-text-align_orig.jpg', title: 'CF1L-0.88-1.2cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0555-1-text-align_orig.jpg', title: 'TF1L-1.7cm', materials: '2022', layout: 'full' },
            ]
        },
        {
            id: 'transmogrify',
            title: 'Transmogrify',
            year: '2022',
            medium: 'Photography',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0113-recovered_orig.jpg',
            description: 'Surrealist transformations of common objects into unfamiliar entities to subvert their expected use and meaning.',
            url: 'project.html?id=transmogrify',
            images: [
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/1_orig.jpg', title: 'FT1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/02-crimson-contrast_orig.jpg', title: 'FP1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0113-recovered_orig.jpg', title: 'FG1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0165-1-depth_orig.jpg', title: 'FB1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0512_orig.jpg', title: 'FB2L-1.3-2.4cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0429-1-patterns_orig.jpg', title: 'FGO1L-n/a', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0608-wall-2_orig.jpg', title: 'LF1L-1.0-1.5cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0612-ps-2_orig.jpg', title: 'LF1L-0.75cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0686-1_orig.jpg', title: 'LF1L-0.9cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0725-1_orig.jpg', title: 'TF1L-0.88-1.2cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0873-1-patterns_orig.jpg', title: 'CF1L-0.88-1.2cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/layer-red-edit-enlarged_orig.jpg', title: 'TF1L-1.7cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/new-york-mesh-layer-better-edit_orig.jpg', title: 'TF1L-1.7cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0026_orig.jpg', title: 'TF1L-1.7cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0597-invert_orig.jpg', title: 'TF1L-1.7cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0731-1-invert_orig.jpg', title: 'TF1L-1.7cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/dsc-0731-1_orig.jpg', title: 'TF1L-1.7cm', materials: '2022', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/black-and-white-ai-framed-on-the-wall_orig.jpg', title: 'TF1L-1.7cm', materials: '2022', layout: 'full' },
            ]

        }
    ],
    printmaking: [
        {
            id: 'etchings',
            title: 'Etchings',
            year: '2024',
            medium: 'Printmaking',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/published/img-5371.jpg?1766367798',
            description: 'Traditional copper plate etchings where the image is incised into the matrix with acid, emphasizing the precision of line and the depth of shadow to construct form.',
            url: 'project.html?id=etchings',
            images: [
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-5370_orig.jpeg', title: 'Scaffoldings #1', dimensions: '12 × 17 in', materials: 'Intaglio print on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-5368_orig.jpeg', title: 'Scaffoldings #2', dimensions: '12 × 17 in', materials: 'Intaglio print on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-5369_orig.jpeg', title: 'Scaffoldings #3', dimensions: '12 × 17 in', materials: 'Intaglio print on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-5371_orig.jpeg', title: 'Scaffoldings #4', dimensions: '12 × 17 in', materials: 'Intaglio print on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-5372_orig.jpeg', title: 'Scaffoldings #5', dimensions: '12 × 17 in', materials: 'Intaglio print on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/editor/img-6208.jpeg?1735023806', title: 'Scaffoldings #1(b)', dimensions: '12 × 17 in', materials: 'Intaglio print, inkjet on rice paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-6209_orig.jpeg', title: 'Scaffoldings #5(b)', dimensions: '12 × 17 in', materials: 'Intaglio print, inkjet on rice paper', layout: 'full' },
            ]

        },
        {
            id: 'monoprints',
            title: 'Monoprints',
            year: '2024',
            medium: 'Printmaking',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/editor/scan2.jpg?1735025446',
            description: 'A planographic printing process creating unique images, where ink is manipulated on a smooth plate to capture spontaneous textures and gestures.',
            url: 'project.html?id=monoprints',
            images: [
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/scan2_orig.jpg', title: 'Cityscape 27', dimensions: '28 × 20 in', materials: 'Watercolor monoprint on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/scan1_orig.jpg', title: 'Street 12', dimensions: '28 × 20 in', materials: 'Watercolor monoprint on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/screenshot-2024-12-24-005849_orig.png', title: 'Movement 6', dimensions: '28 × 20 in', materials: 'Watercolor monoprint on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-5364_orig.jpeg', title: 'Steps 8', dimensions: '28 × 20 in', materials: 'Watercolor monoprint on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-5365_orig.jpeg', title: 'Slanted Lattice', dimensions: '28 × 20 in', materials: 'Watercolor monoprint on paper', layout: 'full' },
            ]

        },
        {
            id: 'entangled-currents',
            title: 'Entangled Currents',
            year: '2024',
            medium: 'Printmaking',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-6312_orig.jpeg',
            description: 'Collagraph prints created by building up surface textures on a plate, resulting in rich, embossed reliefs that explore material interactions.',
            url: 'project.html?id=entangled-currents',
            images: [
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-6312_orig.jpeg', title: 'Entangled #1', dimensions: '28 × 20 in', materials: 'Collagraph print on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-6313_orig.jpeg', title: 'Entangled #2', dimensions: '28 × 20 in', materials: 'Collagraph print on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/img-6314_orig.jpeg', title: 'Entangled #3', dimensions: '28 × 20 in', materials: 'Collagraph print on paper', layout: 'full' },
                { url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/published/img-6315.jpeg?1735025252', title: 'Entangled #4', dimensions: '28 × 20 in', materials: 'Collagraph print on paper', layout: 'full' },
            ]
        }
    ],
    technology: [
        {
            id: 'precedence',
            title: 'Precedence',
            year: '2026',
            medium: 'Technology',
            image: 'assets/precedence/render-01.png',
            description: 'A media theory project about representation shaping reality instead of simply capturing it. Drawings are run through SDXL Turbo and Real-ESRGAN, then translated into metal sculptures.',
            detailedDescription: `
                <p>Precedence is about what happens when representation begins to shape reality instead of simply capturing it. The project starts from Baudrillard’s idea that the map can come before the territory, where images no longer just point back to the real, but begin to produce it.</p>

                <p>For this series, I begin with hand drawings and run them through a fixed SDXL Turbo image pipeline, then upscale them with Real-ESRGAN. The resulting images look like photographs of sculptures in architectural spaces, with specific lighting, shadows, and materials, even though the scenes never existed in front of a camera.</p>

                <p>Selected digital forms are then fabricated as real metal sculptures. In this process, the image becomes a kind of instruction for reality. The object does not come first; it follows the image, turning fabrication into a way of making the representation physically true.</p>
            `,
            work: 'Seven still-life renders produced from original drawings via SDXL Turbo and Real-ESRGAN. Forms extracted from the generated compositions are fabricated as metal sculptures, closing the loop between indexical image and physical object.',
            process: `
                <p><strong>Drawing:</strong> Hand drawings set the composition, gesture, and spatial relationships.</p>

                <p><strong>SDXL Turbo:</strong> Each drawing is run through an SDXL Turbo image-to-image pipeline with the same prompt language around geometric sculpture, architectural space, hard light, and mixed materials. The model keeps the structure of the drawing while adding surface, atmosphere, and a photographic quality.</p>

                <p><strong>Real-ESRGAN:</strong> The images are then upscaled to bring out sharper detail, texture, and light, so they read less like rough AI outputs and more like finished photographic images.</p>

                <p><strong>Fabrication:</strong> Selected forms from the images are then translated into metal sculptures. The objects do not come before the images; they are built afterward, making the physical work follow the representation.</p>
            `,
            url: 'project.html?id=precedence',
            images: [
                { url: 'assets/precedence/render-01.png', title: 'Chairs', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-02.png', title: 'String', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-03.png', title: 'Midnight', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-04.png', title: 'Roof', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-05.png', title: 'Green', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-06.png', title: 'Switch', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/render-07.png', title: 'Stair', materials: 'SDXL Turbo, Real-ESRGAN', layout: 'full' },
                { url: 'assets/precedence/photo-01.png', title: 'Installation', materials: 'Metal, iridescent film, inkjet print', layout: 'full' },
                { url: 'assets/precedence/photo-02.png', title: 'Teardrop', materials: 'Metal, iridescent film', layout: 'full' },
                { url: 'assets/precedence/photo-03.png', title: 'Cylinder', materials: 'Metal wire, glass', layout: 'full' },
                { url: 'assets/precedence/photo-04.png', title: 'Sail', materials: 'Metal wire, glass, iridescent film', layout: 'full' }
            ]
        },
        {
            id: 'pareidolia',
            title: 'Pareidolia',
            year: '2026',
            medium: 'Technology',
            image: 'assets/pareidolia/eyes.png',
            description: 'A project about pareidolia, computer vision, and how human ways of seeing become embedded in the datasets and systems trained on them.',
            detailedDescription: `
                <p>Pareidolia is the tendency to see meaning in ambiguous forms—most often faces, figures, or familiar shapes in random patterns.</p>

                <p>This project looks at the relationship between that human impulse and computer vision. The photographs begin with ordinary scenes that contain accidental resemblances, small visual moments that can be read in more than one way. When these images are passed through a computer vision system, the model produces its own labels and predictions, often with confidence even when the image is uncertain or ambiguous.</p>

                <p>The work is about the space between human misrecognition and machine misclassification. Because datasets are labeled, organized, and designed by people, they carry human assumptions into the systems trained on them. In that sense, computer vision does not simply extend sight. It can also scale up the same biases, habits, and mistakes already present in human perception.</p>
            `,
            work: 'Nine photographs of ambiguous everyday scenes paired with computer vision outputs. Each pairing shows a moment where human pareidolia and algorithmic prediction meet, overlap, or misread the image in different ways.',
            process: `
                <p><strong>Human reading:</strong> Each image is considered through what a viewer might project onto it: a face, a figure, a body, or another familiar form. This makes the act of misreading visible instead of treating it as a private reaction.</p>

                <p><strong>Computer vision:</strong> The same images are run through a computer vision model, which returns labels, categories, and confidence scores. These outputs show how the system interprets ambiguity through the categories it has been trained to recognize.</p>

                <p><strong>Comparison:</strong> Human readings and model predictions are shown together to trace how perception moves from individual sight, to labeled datasets, to automated systems. The project asks what happens when the human habit of seeing patterns everywhere becomes part of a machine’s way of seeing.</p>
            `,
            url: 'project.html?id=pareidolia',
            galleryClass: 'gallery-equal-pairs',
            images: [
                { url: 'assets/pareidolia/cactus.png', title: 'Cactus', materials: '2026', layout: 'half-left' },
                { url: 'assets/pareidolia/rome.png', title: 'Rome', materials: '2026', layout: 'half-right' },
                { url: 'assets/pareidolia/fireplace.png', title: 'Fireplace', materials: '2026', layout: 'half-left' },
                { url: 'assets/pareidolia/yellow-road.png', title: 'Yellow Road', materials: '2026', layout: 'half-right' },
                { url: 'assets/pareidolia/kitchen.png', title: 'Kitchen', materials: '2026', layout: 'half-left' },
                { url: 'assets/pareidolia/pool.png', title: 'Pool', materials: '2026', layout: 'half-right' },
                { url: 'assets/pareidolia/window.png', title: 'Window', materials: '2026', layout: 'half-left' },
                { url: 'assets/pareidolia/eyes.png', title: 'Eyes', materials: '2026', layout: 'half-right' },
                { url: 'assets/pareidolia/suitcases.png', title: 'Suitcases', materials: '2026', layout: 'half-left' }
            ]
        },
        {
            id: 'brainwave-architecture',
            title: 'Brainwave Architecture',
            year: '2025',
            medium: 'Technology',
            image: 'assets/brainwave-arch/render-01.png',
            description: 'Translating emotions into architectural components in Blender, then feeding that image and a text prompt through a Flux image model to produce fully rendered final images. Exploring EEG, AI pipelines, and the separation of mind, body, and space—how thoughts let you exist in separate spaces, visualized.',
            detailedDescription: 'This project takes emotions and translates them into architectural components modeled in Blender. Those 3D scenes are rendered, then combined with a text prompt and fed through a Flux image model to generate fully rendered final images. It sits at the intersection of EEG-driven art, AI pipelines, and conceptual exploration: the separation of mind, body, and space, and how thoughts allow you to exist in separate spaces—and what it looks like when that is visualized. The resulting images are stark, brutalist interiors—textured concrete, dramatic light, and ambiguous scale—that read as both physical places and mental constructs.',
            work: 'A pipeline from emotion → Blender architecture → raw render → structural guidance (e.g. Canny edges) → Flux model + text prompt → final image. The first three images are the project outputs; the last two show how the third image was made: the raw Blender render and the Canny edge map used as input to the Flux model.',
            process: `
                <p><strong>Emotion to form:</strong> Emotional or conceptual states are translated into architectural primitives and arrangements in Blender—blocks, beams, planes, voids—without literal representation.</p>

                <p><strong>Raw render:</strong> The scene is rendered as a clean, untextured grayscale pass (geometry, light, and shadow only). This becomes the structural basis for the next step.</p>

                <p><strong>Structural map:</strong> A Canny edge detection pass is run on the raw render. The resulting line drawing preserves layout and composition while stripping texture and tone, giving the AI a clear “skeleton” to follow.</p>

                <p><strong>Flux pipeline:</strong> The edge map (and optionally the raw render) is fed into a Flux image model together with a text prompt that describes mood, material (e.g. brutalist concrete), lighting, and atmosphere. The model produces the fully rendered final image—concrete, haze, volumetric light—while respecting the original composition.</p>

                <p>The result visualizes “separate spaces” of mind and body: the same structure can feel physical (concrete, weight) and immaterial (floating blocks, glowing voids), echoing how thoughts create places we inhabit without moving.</p>
            `,
            url: 'project.html?id=brainwave-architecture',
            images: [
                { url: 'assets/brainwave-arch/render-01.png', title: 'Render 01', materials: 'Blender, Flux', layout: 'full' },
                { url: 'assets/brainwave-arch/render-02.png', title: 'Render 02', materials: 'Blender, Flux', layout: 'full' },
                { url: 'assets/brainwave-arch/render-03.png', title: 'Render 03', materials: 'Blender, Flux', layout: 'full' },
                { url: 'assets/brainwave-arch/render-03-raw.png', title: 'Raw Blender render (source for Render 03)', materials: 'Blender', layout: 'half-left' },
                { url: 'assets/brainwave-arch/render-03-canny.png', title: 'Canny edge map → Flux input', materials: 'Canny edges, Flux', layout: 'half-right' }
            ]
        },
        {
            //is description too long? or proccess first for recruiter?
            id: 'speculum-cerebri',
            title: 'Speculum Cerebri',
            year: '2025',
            medium: 'Technology',
            image: 'https://potrfolioimages.weebly.com/uploads/8/4/8/7/84879864/image-1039576-0_orig.jpg',
            description: 'An interactive installation exploring the relationship between human perception and machine vision.',
            detailedDescription: `
                <p>Speculum Cerebri is inspired by a meta-photography experiment that questions the processes behind imaging techniques. To fully represent the process of photography, one must look beyond the relationship of art and artist and visualize the relationship between art and viewer. By capturing the unfiltered emotional and electrical response of an individual to a piece of art, the work attempts to open these processes even further. Beyond this, I find inspiration in Foucault’s The Order of Things and his reading of the Las Meninas mirror. Similar to Velazquez’s piece, which sees the mirror as a central metaphor for how the subject is caught in a recursive loop of seeing and being seen, Speculum Cerebri creates a loop where you see your own interpretation of your seeing, remaining in a constant state of both creation and interpretation. The piece pulls the external world into the half photograph/half painting by blurring what is in the image and what’s outside, placing the viewer in the role of both artist and art. The piece is no longer about depicting but about representing representation itself.</p>
            `,
            practice: 'End-to-end design and development of interactive art systems integrating hardware, software, and user experience.',
            work: 'End-to-end design and development of interactive art systems integrating hardware, software, and user experience. The work uses a combination of computer vision and projection mapping to challenge traditional notions of seeing.',
            process: `
                <p>Speculum Cerebri is built as a real-time feedback system that translates a viewer’s brain activity into visual transformation.</p>

                <strong>System pipeline:</strong>
                <ul>
                    <li>Live EEG data is captured using a four-channel OpenBCI headset.</li>
                    <li>Signals are filtered into standard frequency bands and normalized against a rolling baseline.</li>
                    <li>Emotional control parameters (e.g., calm, focus, energy, excitement) are derived using ratios between frequency bands and smoothed to reduce noise.</li>
                </ul>

                <strong>Visual generation:</strong>
                <ul>
                    <li>Every few seconds, the dominant emotional state is identified.</li>
                    <li>A texture is selected from a labeled image dataset based on the detected emotion.</li>
                    <li>The selected texture is blended with the base artwork, with blend strength determined by emotional intensity.</li>
                    <li>An adaptive text prompt is selected from emotion-specific descriptors, directly tied to the current emotional state.</li>
                </ul>

                <strong>AI transformation &amp; output:</strong>
                <ul>
                    <li>The blended image and emotion-driven text prompt are fed into a real-time diffusion model.</li>
                    <li>EEG-derived control values determine how strongly the model transforms the image.</li>
                    <li>Final post-processing (color, contrast, saturation) is continuously modulated by live EEG input.</li>
                </ul>

                <p>The system updates continuously, producing an evolving image that reflects how the viewer’s perception and emotional state shift as they engage with the work.</p>
            `,
            url: 'project.html?id=speculum-cerebri',
            images: [
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/mona-lisa-da-vinci_orig.jpg',
                    title: 'Speculum Cerebri - Mona Lisa',
                    materials: 'TouchDesigner, Python, OpenBCI, OSC',
                    layout: 'full'
                },
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/self-portrait-durer_orig.jpg',
                    title: 'Speculum Cerebri - Dürer',
                    materials: 'TouchDesigner, Python, OpenBCI, OSC',
                    layout: 'full'
                },
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/cherity-salviti_orig.jpg',
                    title: 'Speculum Cerebri - Cherity',
                    materials: 'TouchDesigner, Python, OpenBCI, OSC',
                    layout: 'full'
                },
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/madonna-raphael_orig.jpg',
                    title: 'Speculum Cerebri - Madonna',
                    materials: 'TouchDesigner, Python, OpenBCI, OSC',
                    layout: 'full'
                },
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/garden-bosch_orig.jpg',
                    title: 'Speculum Cerebri - Garden of Earthly Delights',
                    materials: 'TouchDesigner, Python, OpenBCI, OSC',
                    layout: 'full'
                },
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/las-meninas-velasquez_orig.jpg',
                    title: 'Speculum Cerebri - Las Meninas',
                    materials: 'TouchDesigner, Python, OpenBCI, OSC',
                    layout: 'full'
                },
                {
                    url: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/screenshot-2025-07-21-095347_orig.png',
                    title: 'System Diagram',
                    materials: 'EEG to Image Pipeline',
                    layout: 'full'
                }
            ]
        },
        {
            id: 'ultrasonic-camera',
            title: 'Ultrasonic Camera',
            year: '2024',
            medium: 'Technology',
            image: 'https://noahlevyart.weebly.com/uploads/8/4/8/7/84879864/background-images/1838316756.png',
            description: 'A custom-built imaging device that visualizes sound waves in real-time.',
            detailedDescription: 'The Ultrasonic Camera reimagines the photographic process using ultrasonic sensing rather than light. A Raspberry Pi-mounted sensor captures distance measurements that are streamed into a Processing program to build interactive 3D visualizations.',
            practice: 'End-to-end design and development of a sound-based imaging system translating photographic principles into ultrasonic spatial capture.',
            work: 'This project translates optical photographic controls into sound-based equivalents: Aperture becomes sensor beam width, Shutter Speed becomes pulse emission frequency, and ISO becomes the echo sensitivity threshold.',
            process: `
                <p>This project reimagines the photographic process using ultrasonic sensing rather than light. An ultrasonic sensor mounted on a Raspberry Pi captures continuous distance measurements, which are streamed into a Processing program that builds interactive 3D point, line, and shape visualizations. Users can navigate and capture these simulated "images" in real time. By reframing light-based controls into ultrasonic parameters, the work explores how image-making can shift from optical to spatial perception, creating a new way to "photograph" the environment through sound.</p>

                <p>Photographic principles are translated into sound-based equivalents:</p>

                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f5f5f5;">Photographic Control</th>
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f5f5f5;">Ultrasonic Equivalent</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 12px;">Aperture</td>
                            <td style="border: 1px solid #ddd; padding: 12px;">Sensor Beam Width</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 12px;">Shutter Speed</td>
                            <td style="border: 1px solid #ddd; padding: 12px;">Pulse Emission Frequency</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 12px;">ISO</td>
                            <td style="border: 1px solid #ddd; padding: 12px;">Echo Sensitivity Threshold</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 12px;">Focus Distance</td>
                            <td style="border: 1px solid #ddd; padding: 12px;">Detection Range</td>
                        </tr>
                    </tbody>
                </table>
            `,
            url: 'project.html?id=ultrasonic-camera',
            images: [
                {
                    url: 'https://www.youtube.com/embed/hwHuD4J5rTs',
                    title: 'Ultrasonic Camera Demo 1',
                    materials: 'Raspberry Pi, HC-SR04 ultrasonic sensing, Processing (Java), Python',
                    layout: 'full',
                    type: 'video'
                },
                {
                    url: 'https://www.youtube.com/embed/EWQjZRoVPiY',
                    title: 'Ultrasonic Camera Demo 2',
                    materials: 'Raspberry Pi, HC-SR04 ultrasonic sensing, Processing (Java), Python',
                    layout: 'full',
                    type: 'video'
                },
                {
                    url: 'https://www.youtube.com/embed/veG-4sLG_Ck',
                    title: 'Ultrasonic Camera Demo 3',
                    materials: 'Raspberry Pi, HC-SR04 ultrasonic sensing, Processing (Java), Python',
                    layout: 'full',
                    type: 'video'
                }
            ]
        },
        {
            id: 'prediction-machine',
            title: 'Prediction Machine',
            year: '2024',
            medium: 'Technology',
            image: 'https://potrfolioimages.weebly.com/uploads/8/4/8/7/84879864/published/chatgpt-image-dec-26-2025-12-07-53-pm.png?1766773894',
            description: 'Interactive computer-vision artwork exploring perception, prediction, and trust.',
            detailedDescription: 'Inspired by Ted Chiang’s ideas, the Prediction Machine examines how machine learning algorithms enhance or limit perception. It translates observation into a probabilistic game to expose the uncertainty embedded in predictive technology.',
            practice: 'Interactive computer-vision artwork focused on face tracking, optical flow, and probabilistic error modeling to explore perception, prediction, and trust between human and machine.',
            work: 'The piece uses a Markov chain prediction model and breath-tracking termination to explore the dynamic between human participant and software observer.',
            process: 'Using Processing and OpenCV, the system tracks face movement and optical flow. It goes through phases of camera tracking, a countdown, movement prompts, and prediction adjustments, finally terminating after 25 breaths are detected.',
            url: 'project.html?id=prediction-machine',
            images: [
                {
                    url: 'https://potrfolioimages.weebly.com/uploads/8/4/8/7/84879864/published/chatgpt-image-dec-26-2025-12-07-53-pm.png?1766772553',
                    title: 'Prediction Machine - Prediction Machine — User Interaction',
                    materials: 'Processing, OpenCV, Markov Chain',
                    layout: 'full'
                },
            ]
        }
    ]
};

//next steps
//fill in project descriptions
//add code that says if there is no information, do not show that section (on page or in menu)
//fix image sizes
//finalize images and image quality
//add domain name and dont do vercel login
//noah AI chat bot??? maybe use vercel base