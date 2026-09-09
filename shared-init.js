/**
 * FETZY NIGERIA LIMITED - Shared Initializer
 * Handles reveal animations and interactive site behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal observer
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(el => observer.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('active'));
    }
});
