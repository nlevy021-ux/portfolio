document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('project-grid');
    const yearFiltersContainer = document.getElementById('year-filters');
    const mediumFiltersContainer = document.getElementById('medium-filters');

    let currentYearFilter = 'all';
    let currentMediumFilter = 'all';
    let allProjects = [];

    if (window.projects) {
        const projectMap = new Map();
        const artKeys = ['photography', 'printmaking', 'technology'];
        artKeys.forEach((key) => {
            (window.projects[key] || []).forEach(project => {
                if (projectMap.has(project.id)) {
                    const existing = projectMap.get(project.id);
                    if (!existing.mediums.includes(project.medium)) {
                        existing.mediums.push(project.medium);
                    }
                } else {
                    projectMap.set(project.id, { ...project, mediums: [project.medium] });
                }
            });
        });

        allProjects = Array.from(projectMap.values()).sort((a, b) => Number(b.year) - Number(a.year));

        if (gridContainer) {
            renderGrid(allProjects);
            renderFilters(allProjects);
        }
    }

    function renderGrid(data) {
        if (!gridContainer) return;

        gridContainer.innerHTML = '';

        data.forEach(project => {
            if (currentYearFilter !== 'all' && String(project.year) !== String(currentYearFilter)) return;
            const mediums = project.mediums || [project.medium];
            if (currentMediumFilter !== 'all' && !mediums.includes(currentMediumFilter)) return;

            const card = document.createElement('a');
            card.href = project.url || '#';
            card.className = 'project-card';
            if (project.url && project.url.startsWith('http')) {
                card.target = '_blank';
            }

            const mediumDetails = formatMediumsWithDots(mediums);

            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="card-info">
                    <span class="card-title">${project.title}</span>
                    <span class="card-details">${mediumDetails} · ${project.year}</span>
                </div>
            `;

            gridContainer.appendChild(card);
        });

        if (gridContainer.children.length === 0) {
            gridContainer.innerHTML = '<p>No projects found matching these filters.</p>';
        }
    }

    function renderFilters(data) {
        if (!yearFiltersContainer || !mediumFiltersContainer) return;

        const years = [...new Set(data.map(p => p.year))].sort((a, b) => b - a);
        const mediumOrder = ['Photography', 'Printmaking', 'Technology'];
        const media = [...new Set(data.flatMap(p => p.mediums || [p.medium]))]
            .sort((a, b) => {
                const ai = mediumOrder.indexOf(a);
                const bi = mediumOrder.indexOf(b);
                return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
            });

        const allYearsBtn = createFilterBtn('All', 'year', 'all');
        allYearsBtn.classList.add('active');
        const yearListItem = document.createElement('li');
        yearListItem.appendChild(allYearsBtn);
        yearFiltersContainer.appendChild(yearListItem);

        years.forEach(year => {
            const btn = createFilterBtn(year, 'year', year);
            const li = document.createElement('li');
            li.appendChild(btn);
            yearFiltersContainer.appendChild(li);
        });

        const allMediaBtn = createFilterBtn('All', 'medium', 'all', 'dot-all');
        allMediaBtn.classList.add('active');
        const mediumListItem = document.createElement('li');
        mediumListItem.appendChild(allMediaBtn);
        mediumFiltersContainer.appendChild(mediumListItem);

        media.forEach(m => {
            const btn = createFilterBtn(m, 'medium', m, getDotClass(m));
            const li = document.createElement('li');
            li.appendChild(btn);
            mediumFiltersContainer.appendChild(li);
        });
    }

    function createFilterBtn(label, type, value, dotClass = null) {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';

        if (dotClass) {
            const dot = document.createElement('span');
            dot.className = `medium-dot ${dotClass}`;
            btn.appendChild(dot);
        }

        const textSpan = document.createElement('span');
        textSpan.textContent = label;
        btn.appendChild(textSpan);

        btn.dataset.type = type;
        btn.dataset.value = value;

        btn.addEventListener('click', () => {
            handleFilterClick(btn, type, value);
        });

        return btn;
    }

    function handleFilterClick(clickedBtn, type, value) {
        if (type === 'year') {
            currentYearFilter = value;
            updateActiveState(yearFiltersContainer, clickedBtn);
        } else if (type === 'medium') {
            currentMediumFilter = value;
            updateActiveState(mediumFiltersContainer, clickedBtn);
        }

        renderGrid(allProjects);
    }

    function updateActiveState(container, activeBtn) {
        const buttons = container.querySelectorAll('.filter-btn');
        buttons.forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    function formatMediumsWithDots(mediums) {
        const order = ['Photography', 'Printmaking', 'Technology'];
        const tags = [...mediums]
            .sort((a, b) => order.indexOf(a) - order.indexOf(b))
            .map(m => {
                return `<span class="medium-tag"><span class="medium-dot ${getDotClass(m)}"></span>${m}</span>`;
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

    bindMobileNav();
});

function bindMobileNav() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar || document.body.classList.contains('product-mode')) return;
    if (sidebar.querySelector('.nav-toggle')) return;

    const header = sidebar.querySelector('.sidebar-header') || sidebar;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'site-nav');
    btn.textContent = 'Menu';
    header.appendChild(btn);

    const nav = sidebar.querySelector('.filter-nav');
    if (nav && !nav.id) nav.id = 'site-nav';

    const closeMenu = () => {
        sidebar.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Menu';
    };

    btn.addEventListener('click', () => {
        const open = sidebar.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
        btn.textContent = open ? 'Close' : 'Menu';
    });

    const mq = window.matchMedia('(max-width: 768px)');
    const syncToggle = () => {
        btn.hidden = !mq.matches;
        if (!mq.matches) closeMenu();
    };
    syncToggle();
    mq.addEventListener('change', syncToggle);

    sidebar.querySelectorAll('.filter-btn').forEach((filterBtn) => {
        filterBtn.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 768px)').matches) closeMenu();
        });
    });
}
