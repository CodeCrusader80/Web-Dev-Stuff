document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.close');
    const nav = document.querySelector('.nav');

    closeButton.addEventListener('click', () => {
        const isScaled = nav.style.transform.includes('scale(0.7)');
        nav.style.transform = isScaled ? 'translate(-50%, -50%) scale(0)' : 'translate(-50%, -50%) scale(0.7)';
    });
});
