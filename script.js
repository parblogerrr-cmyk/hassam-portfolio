// Minimal Portfolio Logic

document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll('.view');
    const navLinks = document.querySelectorAll('[data-target]');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const globalBg = document.getElementById('global-bg');

    // Background Configuration
    const DEFAULT_BG = 'url("bg_red.png")';
    const sectionBackgrounds = {
        'home': 'url("bg_red.png")',
        'about': 'url("visual_artifacts_1766764076674.png")',      // Texture/Craft for personal identity
        'projects': 'url("multilingual_road_1766764060824.png")',  // Road/Journey for portfolio
        'contact': 'url("social_gathering_1766764042186.png")',    // Community/People for contact
        'discourse-list': 'url("mountain_discourse_1766764024919.png")' // Mountains for the discourse TOC
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
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchView(targetId);
        });
    });

    // Menu Toggle Logic
    function toggleMenu() {
        menuOverlay.classList.toggle('active');

        // Optional: Animate hamburger icon or swap to close icon logic inside the button
        // For now, we rely on the overlay being visible/hidden
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (menuClose) menuClose.addEventListener('click', toggleMenu);

    // Initial check (optional, but CSS handles default active view)

    // ===========================
    // Discourse Studies Logic
    // ===========================
    const tocContainer = document.getElementById('toc-container');
    const articleTitle = document.getElementById('article-title');
    const articleContent = document.getElementById('article-content');

    // Render TOC
    if (typeof discourseWritings !== 'undefined' && tocContainer) {
        discourseWritings.forEach((item, index) => {
            const tocItem = document.createElement('div');
            tocItem.className = 'toc-item';
            tocItem.innerHTML = `
                <span class="toc-number">${(index + 1).toString().padStart(2, '0')}</span>
                <span class="toc-title">${item.title}</span>
                <i class="fa-solid fa-arrow-right"></i>
            `;

            tocItem.addEventListener('click', () => {
                openArticle(item);
            });

            tocContainer.appendChild(tocItem);
        });
    }

    function openArticle(item) {
        if (articleTitle) articleTitle.textContent = item.title;
        if (articleContent) articleContent.innerHTML = item.content;

        // Change background
        if (globalBg && item.image) {
            globalBg.style.backgroundImage = `url('${item.image}')`;
        }

        switchView('article-view');
        window.scrollTo(0, 0);
    }

    // Attach click event for "Discourse Studies" in the main Projects list
    // Finding the "Discourse Studies" project item - we'll make the header clickable or the placeholder item
    // The user had a placeholder item in index.html, let's target the "Analysis of Political Rhetoric" item to open the list
    // OR we should have updated the link in index.html. 
    // Let's quickly check index.html again. I see I left the placeholder items. 
    // I will simply add a click handler to any element with data-target="discourse-list"

    // Back Buttons (handled by generic navLinks if they have data-target, 
    // but the generic handler does preventDefault, so it works fine)

});
