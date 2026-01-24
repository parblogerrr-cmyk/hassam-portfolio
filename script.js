// Minimal Portfolio Logic

document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll('.view');
    const navLinks = document.querySelectorAll('[data-target]');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const globalBg = document.getElementById('global-bg');

    // Background Configuration
    const DEFAULT_BG = 'url("hassambg.png")';
    const sectionBackgrounds = {
        'home': 'url("hassambg.png")',
        'about': 'url("visual_artifacts_1766764076674.png")',
        'projects': 'url("multilingual_road_1766764060824.png")',
        'contact': 'url("social_gathering_1766764042186.png")',
        'discourse-list': 'url("mountain_discourse_1766764024919.png")',
        'creative-list': 'url("visual_artifacts_1766764076674.png")',
        'resume': 'url("discourse_identity_1767164774709.jpg")'
    };

    // Navigation Logic
    function switchView(targetId) {
        // Remove active class from current view
        views.forEach(view => {
            view.classList.remove('active');
        });

        // Add active class to target view
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Close menu if open
        if (menuOverlay.classList.contains('active')) {
            toggleMenu();
        }

        // Handle Background Switching
        if (targetId === 'article-view') {
            // Article view bg is handled by openArticle(), do nothing here
        } else if (sectionBackgrounds[targetId] && globalBg) {
            globalBg.style.backgroundImage = sectionBackgrounds[targetId];
        } else if (globalBg) {
            globalBg.style.backgroundImage = DEFAULT_BG;
        }
    }

    // Event Listeners for Links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-target]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchView(targetId);
        }
    });

    // Menu Toggle Logic
    function toggleMenu() {
        menuOverlay.classList.toggle('active');
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (menuClose) menuClose.addEventListener('click', toggleMenu);


    // ===========================
    // Discourse & Creative Logic
    // ===========================
    const tocContainer = document.getElementById('toc-container');
    const creativeTocContainer = document.getElementById('creative-toc-container');
    const articleTitle = document.getElementById('article-title');
    const articleContent = document.getElementById('article-content');
    const articleBackBtns = document.querySelectorAll('#article-view .back-btn');

    // Render Discourse TOC
    if (typeof discourseWritings !== 'undefined' && tocContainer) {
        discourseWritings.forEach((item, index) => {
            const tocItem = createTocItem(item, index, 'discourse-list');
            tocContainer.appendChild(tocItem);
        });
    }

    // Render Creative TOC
    if (typeof creativeNonFictionWritings !== 'undefined' && creativeTocContainer) {
        creativeNonFictionWritings.forEach((item, index) => {
            const tocItem = createTocItem(item, index, 'creative-list');
            creativeTocContainer.appendChild(tocItem);
        });
    }

    function createTocItem(item, index, listId) {
        const tocItem = document.createElement('div');
        tocItem.className = 'toc-item';
        tocItem.innerHTML = `
            <span class="toc-number">${(index + 1).toString().padStart(2, '0')}</span>
            <span class="toc-title">${item.title}</span>
            <i class="fa-solid fa-arrow-right"></i>
        `;
        tocItem.addEventListener('click', () => {
            openArticle(item, listId);
        });
        return tocItem;
    }

    function openArticle(item, backTargetId) {
        if (articleTitle) articleTitle.textContent = item.title;
        if (articleContent) articleContent.innerHTML = item.content;

        // Update back buttons in article view
        if (backTargetId) {
            articleBackBtns.forEach(btn => {
                btn.setAttribute('data-target', backTargetId);
            });
        }

        // Change background
        if (globalBg && item.image) {
            globalBg.style.backgroundImage = `url('${item.image}')`;
        }

        switchView('article-view');
        window.scrollTo(0, 0);
    }

});
