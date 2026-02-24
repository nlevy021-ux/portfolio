document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('project-grid');
    const yearFiltersContainer = document.getElementById('year-filters');
    const mediumFiltersContainer = document.getElementById('medium-filters');

    let currentYearFilter = 'all';
    let currentMediumFilter = 'all';

    // Define allProjects at a higher scope so handleFilterClick can access it
    let allProjects = [];

    // Initialize
    if (window.projects) {
        // Flatten the projects object into an array
        allProjects = Object.values(window.projects).flat().sort((a, b) => b.year - a.year);

        if (gridContainer) {
            renderGrid(allProjects);
            renderFilters(allProjects);
        }
    }

    function renderGrid(data) {
        if (!gridContainer) return;

        gridContainer.innerHTML = '';

        data.forEach(project => {
            // Check filters
            if (currentYearFilter !== 'all' && String(project.year) !== String(currentYearFilter)) return;
            if (currentMediumFilter !== 'all' && project.medium !== currentMediumFilter) return;

            const card = document.createElement('a');
            card.href = project.url || '#';
            card.className = 'project-card';
            // Open external links in new tab
            if (project.url && project.url.startsWith('http')) {
                card.target = "_blank";
            }

            // Determine dot class
            const dotClass = getDotClass(project.medium);

            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="card-info">
                    <span class="card-title">${project.title}</span>
                    <span class="card-details">
                        <span class="medium-dot ${dotClass}"></span>${project.medium} · ${project.year}
                    </span>
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

        // Extract unique years and sort descending
        const years = [...new Set(data.map(p => p.year))].sort((a, b) => b - a);
        // Extract unique media and sort component-wise
        const media = [...new Set(data.map(p => p.medium))].sort();

        // Render Year Filters
        // Year filters generally don't have dots in your example, but we can add if needed. 
        // User asked for "colored circle representing each type of medium" in nav.

        const allYearsBtn = createFilterBtn('All', 'year', 'all');
        allYearsBtn.classList.add('active'); // Default active
        const yearListItem = document.createElement('li');
        yearListItem.appendChild(allYearsBtn);
        yearFiltersContainer.appendChild(yearListItem);

        years.forEach(year => {
            const btn = createFilterBtn(year, 'year', year);
            const li = document.createElement('li');
            li.appendChild(btn);
            yearFiltersContainer.appendChild(li);
        });

        // Render Medium Filters
        const allMediaBtn = createFilterBtn('All', 'medium', 'all', 'dot-all');
        allMediaBtn.classList.add('active'); // Default active
        const mediumListItem = document.createElement('li');
        mediumListItem.appendChild(allMediaBtn);
        mediumFiltersContainer.appendChild(mediumListItem);

        media.forEach(m => {
            const dotClass = getDotClass(m);
            const btn = createFilterBtn(m, 'medium', m, dotClass);
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

        btn.dataset.type = type; // 'year' or 'medium'
        btn.dataset.value = value;

        btn.addEventListener('click', () => {
            handleFilterClick(btn, type, value);
        });

        return btn;
    }

    function handleFilterClick(clickedBtn, type, value) {
        // Update state
        if (type === 'year') {
            currentYearFilter = value;
            // Update UI for Year group
            updateActiveState(yearFiltersContainer, clickedBtn);
        } else if (type === 'medium') {
            currentMediumFilter = value;
            // Update UI for Medium group
            updateActiveState(mediumFiltersContainer, clickedBtn);
        }

        // Re-render
        renderGrid(allProjects);
    }

    function updateActiveState(container, activeBtn) {
        const buttons = container.querySelectorAll('.filter-btn');
        buttons.forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    function getDotClass(medium) {
        const lower = medium.toLowerCase();
        if (lower === 'photography') return 'dot-photography';
        if (lower === 'printmaking') return 'dot-printmaking';
        if (lower === 'technology') return 'dot-technology';
        return 'dot-all';
    }
});
