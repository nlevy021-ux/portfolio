document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('project-content');

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        contentContainer.innerHTML = '<p>Project not found (No ID provided).</p>';
        return;
    }

    let project = null;
    if (window.projects) {
        const matches = Object.values(window.projects).flat().filter(p => p.id === projectId);
        if (matches.length > 0) {
            project = {
                ...matches[0],
                mediums: [...new Set(matches.map(p => p.medium))]
            };
        }
    }

    if (!project) {
        contentContainer.innerHTML = '<p>Project not found.</p>';
        return;
    }

    document.title = `${project.title} | Noah Levy`;

    const mediumDetails = formatMediumsWithDots(project.mediums || [project.medium]);
    const isCaseStudy = project.caseStudy || (project.mediums || []).includes('Design Engineering');

    if (isCaseStudy) {
        document.body.classList.add('product-mode');
        const topbar = document.createElement('header');
        topbar.className = 'product-topbar';
        topbar.innerHTML = `
            <a href="product.html" class="logo">NOAH LEVY</a>
            <nav class="product-topbar-nav" aria-label="Product">
                <a href="product.html">Work</a>
                <a href="about.html">About</a>
                <a href="art.html" class="crossover-link">View Art Practice</a>
            </nav>
        `;
        document.body.insertBefore(topbar, document.body.firstChild);
    }

    let galleryHTML = '';
    let lightboxImages = [];
    if (project.images && project.images.length > 0) {
        galleryHTML = `
            <div class="project-gallery${project.galleryClass ? ' ' + project.galleryClass : ''}">
                ${project.images.map((img) => {
            const url = typeof img === 'string' ? img : img.url;
            const layoutClass = (typeof img !== 'string' && img.layout) ? img.layout : 'full';
            const isVideo = typeof img !== 'string' && img.type === 'video';
            const isLocalVideo = typeof img !== 'string' && img.type === 'video-file';

            if (isLocalVideo) {
                const autoplay = Boolean(img.autoplay);
                const autoplayAttrs = autoplay
                    ? 'muted loop playsinline preload="metadata" data-autoplay disablepictureinpicture'
                    : 'controls playsinline preload="metadata"';
                const poster = img.poster || (autoplay && project.image ? project.image : '');
                return `
                        <div class="gallery-item ${layoutClass}${autoplay ? ' is-autoplay-video' : ''}">
                            <video
                                src="${url}"
                                ${poster ? `poster="${poster}"` : ''}
                                ${autoplayAttrs}
                                ${autoplay ? 'controls' : ''}
                                title="${img.title || project.title}">
                            </video>
                        </div>
                    `;
            }

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

            lightboxImages.push(img);
            const lightboxIndex = lightboxImages.length - 1;

            return `
                        <div class="gallery-item ${layoutClass}" onclick="openLightbox(${lightboxIndex})">
                            <img src="${url}" alt="${img.title || project.title}">
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    }

    const descriptionContent = project.detailedDescription || project.description || '';
    const processDescription = project.process || '';
    const hasProcess = project.process && project.process.trim() !== '';

    const caseSections = [
        { id: 'problem', label: 'Problem', html: project.problem },
        { id: 'users', label: 'Users & constraints', html: project.users },
        { id: 'interaction', label: 'Interaction design', html: project.interaction },
        { id: 'system', label: 'AI / system', html: project.system },
        { id: 'outcome', label: 'Outcome', html: project.outcome }
    ].filter(s => s.html && String(s.html).trim());

    let contentHTML = '';

    if (isCaseStudy && caseSections.length) {
        contentHTML = caseSections.map(s => `
            <div class="project-content-grid art-layout" id="section-${s.id}">
                <div class="project-full-col">
                    <div class="project-section">
                        <h2 class="section-title">${s.label}</h2>
                        <div class="section-content case-study-content">${s.html}</div>
                    </div>
                </div>
            </div>
        `).join('') + `
            <div class="project-section" id="section-work">
                <h2 class="section-title">Work</h2>
                ${galleryHTML}
            </div>
        `;
    } else {
        contentHTML = `
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
    }

    const chips = [];
    if (project.role) chips.push(project.role);
    if (project.stack && project.stack.length) {
        project.stack.forEach(s => chips.push(s));
    }
    const chipsHTML = chips.length
        ? `<div class="project-chips">${chips.map(c => `<span class="project-chip">${c}</span>`).join('')}</div>`
        : '';

    const specItems = [];
    if (isCaseStudy) {
        if (project.role) specItems.push(['Role', project.role]);
        if (project.year) specItems.push(['Year', project.year]);
        if (project.kicker) specItems.push(['Focus', project.kicker]);
        if (project.stack && project.stack.length) specItems.push(['Tools', project.stack.join(', ')]);
        if (project.demoUrl) {
            specItems.push(['Demo', `<a class="demo-link" href="${project.demoUrl}" target="_blank" rel="noopener">Live site</a>`]);
        }
    }

    const specHTML = specItems.length
        ? `<dl class="product-spec">${specItems.map(([label, value]) =>
            `<div><dt>${label}</dt><dd>${value}</dd></div>`
        ).join('')}</dl>`
        : '';

    const heroHTML = isCaseStudy && (project.heroVideo || project.image)
        ? `<figure class="product-hero ${project.plate === 'inset' ? 'is-inset' : 'is-bleed'}${project.heroVideo ? ' has-video' : ''}" style="--stage: ${project.stage || '#111'}; --pos: ${project.imagePosition || 'center center'};">
                ${project.heroVideo
                    ? `<video src="${project.heroVideo}" poster="${project.image || ''}" muted loop playsinline preload="metadata" data-autoplay disablepictureinpicture aria-label="${project.title}"></video>`
                    : `<img src="${project.image}" alt="${project.title}">`}
           </figure>`
        : '';

    contentContainer.innerHTML = `
        <div class="project-header">
            ${isCaseStudy && project.kicker ? `<p class="product-kicker">${project.kicker}</p>` : ''}
            <h1 class="project-title-large">${project.title}</h1>
            ${isCaseStudy ? specHTML : `<div class="project-meta-large">
                <span>${mediumDetails}</span>
                <span>${project.year}</span>
            </div>`}
            ${isCaseStudy && project.description ? `<p class="case-study-lede">${project.description}</p>` : ''}
            ${!isCaseStudy && chipsHTML ? chipsHTML : ''}
        </div>

        ${heroHTML}

        ${project.id === 'prediction-machine' ? `
        <div class="project-section" id="prediction-machine-game">
            <div id="game-container" style="display: flex; justify-content: center; margin: 2rem 0; background: #000; border: 1px solid #333; min-height: 480px;"></div>
        </div>
        ` : ''}

        ${contentHTML}

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

    // Update sidebar page nav for case studies
    const pageNav = document.querySelector('.page-nav');
    if (pageNav) {
        if (isCaseStudy && caseSections.length) {
            pageNav.innerHTML = `
                <span class="page-nav-label">On This Page</span>
                ${caseSections.map(s => `<a class="page-nav-link" onclick="scrollToSection('${s.id}')">${s.label}</a>`).join('')}
                <a class="page-nav-link" onclick="scrollToSection('work')">Work</a>
            `;
        } else if (!hasProcess) {
            const processLink = pageNav.querySelector('a.page-nav-link[onclick*="process"]');
            if (processLink) processLink.style.display = 'none';
        }
    }

    if (isCaseStudy && caseSections.length) {
        const subnav = document.createElement('nav');
        subnav.className = 'product-subnav';
        subnav.setAttribute('aria-label', 'On this page');
        subnav.innerHTML = caseSections.map(s =>
            `<a class="product-subnav-link" onclick="scrollToSection('${s.id}')">${s.label}</a>`
        ).join('') + `<a class="product-subnav-link" onclick="scrollToSection('work')">Work</a>`;
        const topbar = document.querySelector('.product-topbar');
        if (topbar) topbar.after(subnav);
    }

    bindAutoplayVideos(contentContainer);

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

        loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js')
            .then(() => loadScript('https://unpkg.com/ml5@latest/dist/ml5.min.js'))
            .then(() => loadScript('js/sketches/prediction-machine.js'))
            .catch(e => console.error('Error loading game scripts:', e));
    }

    let currentImageIndex = 0;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    window.openLightbox = (index) => {
        currentImageIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
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
        lightboxCaption.innerHTML = '';

        if (typeof imgObj !== 'string') {
            if (imgObj.title || imgObj.materials || imgObj.dimensions) {
                let metadataHTML = '';
                if (imgObj.title) metadataHTML += `<div class="lightbox-title">${imgObj.title}</div>`;
                if (imgObj.materials) metadataHTML += `<div class="lightbox-materials">${imgObj.materials}</div>`;
                if (imgObj.dimensions) metadataHTML += `<div class="lightbox-dimensions">${imgObj.dimensions}</div>`;
                lightboxCaption.innerHTML = metadataHTML;
            } else if (imgObj.description) {
                lightboxCaption.textContent = imgObj.description;
            }
        }
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeLightbox();
    });

    function formatMediumsWithDots(mediums) {
        const order = ['Design Engineering', 'Photography', 'Printmaking', 'Technology'];
        const tags = [...mediums]
            .sort((a, b) => order.indexOf(a) - order.indexOf(b))
            .map(m => {
                const label = m === 'Design Engineering' ? 'Product Work' : m;
                return `<span class="medium-tag"><span class="medium-dot ${getDotClass(m)}"></span>${label}</span>`;
            })
            .join('');
        return `<span class="medium-tags">${tags}</span>`;
    }

    function getDotClass(medium) {
        const lower = medium.toLowerCase();
        if (lower === 'photography') return 'dot-photography';
        if (lower === 'printmaking') return 'dot-printmaking';
        if (lower === 'technology') return 'dot-technology';
        if (lower === 'design engineering') return 'dot-design-engineering';
        return 'dot-all';
    }

    window.scrollToSection = (section) => {
        const el = document.getElementById(`section-${section}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
});

function bindAutoplayVideos(root) {
    const videos = (root || document).querySelectorAll('video[data-autoplay]');
    if (!videos.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    videos.forEach((video) => {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        const reveal = () => video.classList.add('is-loaded');
        if (video.readyState >= 2) reveal();
        else video.addEventListener('loadeddata', reveal, { once: true });
    });

    if (reduceMotion) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
                const playPromise = video.play();
                if (playPromise && playPromise.catch) playPromise.catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: [0, 0.25, 0.5] });

    videos.forEach((video) => observer.observe(video));
}
