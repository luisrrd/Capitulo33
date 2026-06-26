/**
 * Renderizador Procedural de Firmamento Estelar Autonómo mediante Canvas 2D
 */
export function setupStars() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Star {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5;
            this.speed = Math.random() * 0.05;
            this.alpha = Math.random();
            this.phase = Math.random() * Math.PI;
        }
        update() {
            this.phase += 0.01;
            this.alpha = Math.abs(Math.sin(this.phase));
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 150; i++) {
        stars.push(new Star());
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(render);
    }
    render();
}

export function spawnBalloons() {
    const container = document.getElementById('balloons-container');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDelay = `${Math.random() * 8}s`;
        balloon.style.animationDuration = `${10 + Math.random() * 15}s`;
        
        // Inyección dinámica de Keyframes nativos amortiguados
        balloon.style.animationName = 'floatUp';
        container.appendChild(balloon);
    }
    
    // Inyectar animación CSS clave de ejecución única
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatUp {
            0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}