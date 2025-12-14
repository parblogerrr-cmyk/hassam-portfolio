document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized.');

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Optional: Animate hamburger icon (requires additional CSS)
            navToggle.querySelector('span').classList.toggle('open');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for Anchor Links (Optional if CSS scroll-behavior: smooth is not supported)
    // Most modern browsers support CSS scroll-behavior, but we can add an observer for animations here.

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after it becomes visible once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add 'fade-in-section' class to sections you want to animate
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});
