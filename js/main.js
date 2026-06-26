import { initScrollAnimations } from './utils/observer.js';
import { setupStars, spawnBalloons } from './components/stars.js';
import { initAudioSystem } from './components/audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const audioController = initAudioSystem();
    initLazyLoading();
    
    // Escuchar el clic de entrada para activar el audio y luego correr el prólogo
    document.getElementById('enter-experience-btn')?.addEventListener('click', () => {
        if (audioController) audioController.playAudio(); // Desbloquea y reproduce el audio
        
        // Ocultar el botón de entrada y mostrar las frases
        document.getElementById('prologue-trigger-wrapper').classList.add('hidden');
        document.getElementById('prologo-text').classList.remove('hidden');
        
        // Arrancar el prólogo cinematográfico con la música ya sonando
        runPrologue(() => {
            const inicioSection = document.getElementById('inicio');
            inicioSection.classList.remove('hidden');
            setupStars();
            spawnBalloons();
            
            setTimeout(() => {
                document.querySelector('.hero-number').classList.add('animate');
                revealHeroText();
            }, 300);
        });
    });

    // Event Listener para hacer scroll al Capítulo I
    document.getElementById('start-story-btn')?.addEventListener('click', () => {
        document.getElementById('capitulo1').scrollIntoView({ behavior: 'smooth' });
        initScrollAnimations();
    });

    // Disparador del epílogo final (Capítulo 34)
    document.getElementById('next-chapter-34-btn')?.addEventListener('click', () => {
        const epilogue = document.getElementById('capitulo6');
        epilogue.classList.remove('hidden');
        epilogue.scrollIntoView({ behavior: 'smooth' });
        triggerConfetti();
    });
});

function runPrologue(onComplete) {
    const phrases = document.querySelectorAll('.prologo-phrase');
    let current = 0;

    function showNextPhrase() {
        if (current < phrases.length) {
            phrases[current].classList.add('visible');
            setTimeout(() => {
                phrases[current].classList.remove('visible');
                current++;
                setTimeout(showNextPhrase, 1000); 
            }, 3000); 
        } else {
            document.getElementById('prologo').style.display = 'none';
            onComplete();
        }
    }
    
    // Iniciar inmediatamente ya que el usuario ya interactuó
    showNextPhrase();
}

function revealHeroText() {
    const paragraphs = document.querySelectorAll('.hero-text-story p, #start-story-btn');
    paragraphs.forEach((p, idx) => {
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, idx * 400);
    });
}

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                image.removeAttribute('data-src');
                imageObserver.unobserve(image);
            }
        });
    });

    lazyImages.forEach(image => imageObserver.observe(image));
}

function triggerConfetti() {
    // Generador interno ligero de partículas para Clímax
    const container = document.getElementById('confetti-container');
    if (!container || container.children.length > 0) return;

    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.width = `${Math.random() * 8 + 4}px`;
        p.style.height = `${Math.random() * 12 + 6}px`;
        p.style.backgroundColor = ['#bf953f', '#fcf6ba', '#b38728', '#ffffff'][Math.floor(Math.random() * 4)];
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `-20px`;
        p.style.transform = `rotate(${Math.random() * 360}deg)`;
        p.style.animation = `dropConfetti ${2 + Math.random() * 3}s linear infinite`;
        container.appendChild(p);
    }

    if(!document.getElementById('confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.innerHTML = `
            @keyframes dropConfetti {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}