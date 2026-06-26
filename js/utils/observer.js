/**
 * Motor de Intersección Óptica para Efectos Cinemáticos y Parallax de 60 FPS
 */
export function initScrollAnimations() {
    const sections = document.querySelectorAll('.dynamic-reveal');
    
    const options = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealChildren(entry.target);
            }
        });
    }, options);

    sections.forEach(sec => observer.observe(sec));

    // Runtime del Efecto Parallax en Scroll Real
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Manejador de Barra de Progreso Integral
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercent = (winScroll / height) * 100;
        const progressBar = document.getElementById('story-progress');
        if(progressBar) progressBar.style.width = scrolledPercent + '%';

        // Transformación Matricial Parallax
        const wrappers = document.querySelectorAll('.parallax-wrapper');
        wrappers.forEach(wrap => {
            const top = wrap.getBoundingClientRect().top;
            const img = wrap.querySelector('.parallax-img');
            if (top < window.innerHeight && top > -wrap.offsetHeight) {
                const value = (top * 0.15);
                img.style.transform = `translateY(${value}px) scale(1.05)`;
            }
        });
    });
}

function revealChildren(parent) {
    const paragraphs = parent.querySelectorAll('.story-paragraph, .story-paragraph-highlight, h2, .chapter-label');
    paragraphs.forEach((p, idx) => {
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
            p.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        }, idx * 250);
    });
}