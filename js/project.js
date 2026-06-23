document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('project-content');

    // Get ID from URL URLSearchParams
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        contentContainer.innerHTML = '<p>Project not found (No ID provided).</p>';
        return;
    }

    // Find Project
    let project = null;
    if (window.projects) {
        const allProjects = Object.values(window.projects).flat();
        project = allProjects.find(p => p.id === projectId);
    }

    if (!project) {
        contentContainer.innerHTML = '<p>Project not found.</p>';
        return;
    }

    // Update Title
    document.title = `${project.title} | Noah Levy`;

    // Render Content
    const dotClass = getDotClass(project.medium);

    // Build images gallery HTML and separate out images for lightbox
    let galleryHTML = '';
    let lightboxImages = []; // Track only image items for lightbox
    if (project.images && project.images.length > 0) {
        galleryHTML = `
            <div class="project-gallery${project.galleryClass ? ' ' + project.galleryClass : ''}">
                ${project.images.map((img, index) => {
            const url = typeof img === 'string' ? img : img.url;
            const layoutClass = (typeof img !== 'string' && img.layout) ? img.layout : 'full';
            const isVideo = typeof img !== 'string' && img.type === 'video';

            if (isVideo) {
                return `
                        <div class="gallery-item ${layoutClass}">
                            <iframe src="${url}" 
                                    title="${img.title || project.title}" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowfullscreen
                                    style="width: 100%; aspect-ratio: 16/9;">
                            </iframe>
                        </div>
                    `;
            }

            // Only track actual images for lightbox
            lightboxImages.push(img);
            const lightboxIndex = lightboxImages.length - 1;

            return `
                        <div class="gallery-item ${layoutClass}" onclick="openLightbox(${lightboxIndex})">
                            <img src="${url}" alt="${project.title}">
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    }

    const isTechnology = project.medium.toLowerCase() === 'technology';
    const descriptionContent = project.detailedDescription || project.description || "Project description goes here...";
    const workDescription = project.work || "Detailed information about the work goes here...";
    const processDescription = project.process || "Details about the creative process goes here...";
    const hasProcess = project.process && project.process.trim() !== '';

    let contentHTML = `
        <div class="project-content-grid art-layout" id="section-description">
            <div class="project-full-col">
                <div class="project-section">
                    <h2 class="section-title">Description</h2>
                    <div class="section-content" data-field="description">${descriptionContent}</div>
                </div>
            </div>
        </div>
        
        <div class="project-section" id="section-work">
            <h2 class="section-title">Work</h2>
            ${galleryHTML}
        </div>

        ${hasProcess ? `
        <div class="project-content-grid art-layout" id="section-process">
            <div class="project-full-col">
                <div class="project-section">
                    <h2 class="section-title">Process</h2>
                    <div class="section-content" data-field="process">${processDescription}</div>
                </div>
            </div>
        </div>
        ` : ''}
    `;

    contentContainer.innerHTML = `
        <div class="project-header">
            <h1 class="project-title-large">${project.title}</h1>
            <div class="project-meta-large">
                <span>
                    <span class="medium-dot ${dotClass}"></span>${project.medium}
                </span>
                <span>${project.year}</span>
            </div>
        </div>

        ${project.id === 'prediction-machine' ? `
        <div class="project-section" id="prediction-machine-game">
            <div id="game-container" style="display: flex; justify-content: center; margin: 2rem 0; background: #000; border: 1px solid #333; min-height: 480px;"></div>
        </div>
        ` : ''}

        ${contentHTML}

        <!-- Lightbox Placeholder -->
        <div id="lightbox" class="lightbox">
            <div class="close-lightbox" onclick="closeLightbox()">&times;</div>
            <div class="lightbox-main">
                <div class="lightbox-image-container">
                    <img id="lightbox-img" class="lightbox-image" src="" alt="">
                </div>
                <div class="lightbox-nav">
                    <div class="nav-arrow prev" onclick="prevImage()">&#8249;</div>
                    <div class="nav-arrow next" onclick="nextImage()">&#8250;</div>
                </div>
            </div>
            <div class="lightbox-sidebar">
                <div id="lightbox-counter" class="lightbox-counter"></div>
                <div id="lightbox-caption" class="lightbox-caption"></div>
                <div style="margin-top: auto;">
                    <a href="#" class="logo" style="margin-bottom: 0;">NOAH LEVY</a>
                </div>
            </div>
        </div>
    `;

    // Initialize Game if applicable
    if (project.id === 'prediction-machine') {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        // Load libraries and sketch
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js')
            .then(() => loadScript('https://unpkg.com/ml5@latest/dist/ml5.min.js'))
            .then(() => loadScript('js/sketches/prediction-machine.js'))
            .catch(e => console.error('Error loading game scripts:', e));
    }

    // --- Lightbox Logic ---
    let currentImageIndex = 0;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    window.openLightbox = (index) => {
        currentImageIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    window.closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    window.prevImage = (e) => {
        if (e) e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
    };

    window.nextImage = (e) => {
        if (e) e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
        updateLightbox();
    };

    function updateLightbox() {
        const imgObj = lightboxImages[currentImageIndex];
        const url = typeof imgObj === 'string' ? imgObj : imgObj.url;

        lightboxImg.src = url;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${lightboxImages.length}`;

        // Clear previous content
        lightboxCaption.innerHTML = '';

        if (typeof imgObj !== 'string') {
            if (imgObj.title || imgObj.materials || imgObj.dimensions) {
                // Multi-layered metadata
                let metadataHTML = '';
                if (imgObj.title) metadataHTML += `<div class="lightbox-title">${imgObj.title}</div>`;
                if (imgObj.materials) metadataHTML += `<div class="lightbox-materials">${imgObj.materials}</div>`;
                if (imgObj.dimensions) metadataHTML += `<div class="lightbox-dimensions">${imgObj.dimensions}</div>`;
                lightboxCaption.innerHTML = metadataHTML;
            } else if (imgObj.description) {
                // Fallback to simple description
                lightboxCaption.textContent = imgObj.description;
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeLightbox();
    });

    // Helper for dots
    function getDotClass(medium) {
        const lower = medium.toLowerCase();
        if (lower === 'photography') return 'dot-photography';
        if (lower === 'printmaking') return 'dot-printmaking';
        if (lower === 'technology') return 'dot-technology';
        return 'dot-all';
    }

    // Hide Process nav link if no process section
    if (!hasProcess) {
        const processLink = document.querySelector('a.page-nav-link[onclick*="process"]');
        if (processLink) {
            processLink.style.display = 'none';
        }
    }

    // Sidebar page nav: smooth scroll to sections
    window.scrollToSection = (section) => {
        const sectionMap = {
            'description': 'section-description',
            'work': 'section-work',
            'process': 'section-process'
        };
        const targetId = sectionMap[section];
        if (targetId) {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
});
