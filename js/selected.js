// This cross-disciplinary selection is independent of the art page filters.
const selectedPortfolioIds = [
    'precedence',
    'constructed-organics',
    'f1-eeg',
    'ai-speech-rater',
    'speculum-cerebri',
    'pareidolia'
];

const selectedGrid = document.getElementById('selected-grid');
const portfolioProjects = Object.values(window.projects).flat();

selectedPortfolioIds.forEach(id => {
    const project = portfolioProjects.find(item => item.id === id);
    if (!project) return;

    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = project.url;

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'card-image-wrapper';
    if (project.heroVideo) {
        imageWrapper.classList.add('selected-video-frame');
        imageWrapper.style.background = project.stage || '#111';
        const video = document.createElement('video');
        video.src = project.heroVideo;
        video.poster = project.image;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.dataset.autoplay = '';
        video.disablePictureInPicture = true;
        video.setAttribute('aria-label', project.title);
        imageWrapper.appendChild(video);
    } else {
        const image = document.createElement('img');
        image.src = project.image;
        image.alt = project.title;
        image.loading = 'lazy';
        imageWrapper.appendChild(image);
    }

    const info = document.createElement('div');
    info.className = 'card-info';
    const title = document.createElement('span');
    title.className = 'card-title';
    title.textContent = project.title;
    const details = document.createElement('span');
    details.className = 'card-details';
    details.textContent = `${project.caseStudy ? 'Product, AI & Interaction' : 'Art Practice'} · ${project.year}`;
    info.append(title, details);
    card.append(imageWrapper, info);
    selectedGrid.appendChild(card);
});

// Share the Product page's muted, in-view playback and reduced-motion behavior.
bindAutoplayVideos(selectedGrid);
