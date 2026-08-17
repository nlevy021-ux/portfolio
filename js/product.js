document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('product-work-root');
    if (!root) return;

    const projects = (window.projects && window.projects.designEngineering) || [];
    if (!projects.length) {
        root.innerHTML = '<p>No case studies yet.</p>';
        return;
    }

    const tileMedia = (project, lazy) => {
        if (project.heroVideo) {
            return `<video
                src="${project.heroVideo}"
                poster="${project.image || ''}"
                muted
                loop
                playsinline
                preload="metadata"
                data-autoplay
                disablepictureinpicture
                aria-label="${project.title}"></video>`;
        }

        return `<img src="${project.image}" alt="${project.title}" ${lazy ? 'loading="lazy"' : ''}>`;
    };

    const tileHTML = (project, lazy, index) => {
        const plate = project.plate === 'inset' ? 'is-inset' : 'is-bleed';
        const stage = project.stage || '';
        const position = project.imagePosition || 'center center';
        const line = project.indexLine || project.description || '';
        const demo = project.demoUrl
            ? `<a class="product-tile-demo" href="${project.demoUrl}" target="_blank" rel="noopener">Live demo →</a>`
            : '';

        return `
            <article class="product-tile ${plate}"
               style="--stage: ${stage}; --pos: ${position}; --i: ${index};">
                <a class="product-tile-frame" href="${project.url || '#'}">
                    ${tileMedia(project, lazy)}
                </a>
                <div class="product-tile-caption">
                    <div class="product-tile-row">
                        <a class="product-tile-title" href="${project.url || '#'}">${project.title}</a>
                        <span class="product-tile-meta">${project.kicker ? `${project.kicker} · ` : ''}${project.year || ''}</span>
                    </div>
                    <p class="product-tile-line">${line}</p>
                    ${demo}
                </div>
            </article>
        `;
    };

    root.innerHTML = projects.map((project, i) => tileHTML(project, i > 0, i + 1)).join('');

    root.querySelectorAll('.product-tile-frame img').forEach((img) => {
        const reveal = () => img.classList.add('is-loaded');
        if (img.complete) reveal();
        else img.addEventListener('load', reveal, { once: true });
    });

    bindAutoplayVideos(root);
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
