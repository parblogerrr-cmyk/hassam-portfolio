document.addEventListener('DOMContentLoaded', () => {
    // Mobile Sidebar Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div'); // Overlay for mobile when sidebar is open
    
    // Add overlay class and append to body
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Style the overlay dynamically (or could be in CSS)
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '900'; // Below sidebar (1000)
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.transition = 'all 0.3s ease';

    function toggleSidebar() {
        if (!sidebar || !mobileToggle) return;
        
        sidebar.classList.toggle('active');
        const isActive = sidebar.classList.contains('active');
        
        // Toggle Overlay
        overlay.style.opacity = isActive ? '1' : '0';
        overlay.style.visibility = isActive ? 'visible' : 'hidden';

        // Animate Toggle Icon (Simple swap for now or css class)
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});
