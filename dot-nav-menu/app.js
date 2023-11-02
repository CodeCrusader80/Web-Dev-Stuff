document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.close');
    const nav = document.querySelector('.nav');

    closeButton.addEventListener('click', () => {
        // Active la grille si elle est masquée, sinon la masque
        const isScaled = nav.style.transform === 'scale(1)';
        nav.style.transform = isScaled ? 'scale(0)' : 'scale(1)';
    });
});