// Minimal Portfolio Logic

document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll('.view');
    const navLinks = document.querySelectorAll('[data-target]');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');

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
});
