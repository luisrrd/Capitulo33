/**
 * Orquestador de Audio Premium y Controladores de Estado Multimedia
 */
export function initAudioSystem() {
    const audio = document.getElementById('bg-audio');
    const toggleBtn = document.getElementById('audio-toggle');
    
    if(!audio || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    });

    function playAudio() {
        audio.play().then(() => {
            toggleBtn.setAttribute('aria-pressed', 'true');
            toggleBtn.classList.add('playing');
        }).catch(err => console.log("Interacción de usuario requerida para inicialización de audio nativo."));
    }

    function pauseAudio() {
        audio.pause();
        toggleBtn.setAttribute('aria-pressed', 'false');
        toggleBtn.classList.remove('playing');
    }

    return { playAudio };
}