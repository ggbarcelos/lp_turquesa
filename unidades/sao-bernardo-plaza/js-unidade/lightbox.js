/* ================================================
   Lightbox para imagens do Hero
   Turquesa São Bernardo Plaza
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Criar o lightbox modal
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox__backdrop"></div>
        <div class="lightbox__content">
            <button class="lightbox__close" aria-label="Fechar">&times;</button>
            <button class="lightbox__nav lightbox__nav--prev" aria-label="Anterior">&lsaquo;</button>
            <button class="lightbox__nav lightbox__nav--next" aria-label="Próxima">&rsaquo;</button>
            <img class="lightbox__image" src="" alt="">
            <div class="lightbox__caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const lightboxPrev = lightbox.querySelector('.lightbox__nav--prev');
    const lightboxNext = lightbox.querySelector('.lightbox__nav--next');
    const lightboxBackdrop = lightbox.querySelector('.lightbox__backdrop');

    let currentImages = [];
    let currentIndex = 0;

    // Coletar todas as imagens clicáveis do hero
    const heroImages = document.querySelectorAll('.hero-repasse__main-image img, .hero-repasse__side-image img');

    function openLightbox(index) {
        currentImages = Array.from(heroImages).filter(img => img.src && !img.src.includes('logo_abf'));
        currentIndex = currentImages.findIndex(img => img.src === heroImages[index].src);
        if (currentIndex === -1) currentIndex = 0;
        showImage(currentIndex);
        document.body.style.overflow = 'hidden';
        lightbox.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';
    }

    function showImage(index) {
        if (index < 0) index = currentImages.length - 1;
        if (index >= currentImages.length) index = 0;
        currentIndex = index;

        const img = currentImages[currentIndex];
        const lightboxImage = document.querySelector('.lightbox__image');
        const lightboxCaption = document.querySelector('.lightbox__caption');

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || '';
        lightboxCaption.textContent = img.alt || '';
    }

    function closeLightbox() {
        document.querySelector('.lightbox').classList.remove('lightbox--open');
        document.body.style.overflow = '';
    }

    function nextImage() {
        showImage(currentIndex + 1);
    }

    function prevImage() {
        showImage(currentIndex - 1);
    }

    // Event listeners para imagens clicáveis
    document.querySelectorAll('.hero-repasse__main-image img, .hero-repasse__side-image img').forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openLightbox(Array.from(document.querySelectorAll('.hero-repasse__main-image img, .hero-repasse__side-image img')).indexOf(this));
        });
    });

    // Fechar lightbox
    document.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);

    // Navegação
    document.querySelector('.lightbox__nav--next').addEventListener('click', function(e) {
        e.stopPropagation();
        nextImage();
    });

    document.querySelector('.lightbox__nav--prev').addEventListener('click', function(e) {
        e.stopPropagation();
        prevImage();
    });

    // Teclado
    document.addEventListener('keydown', function(e) {
        if (!document.querySelector('.lightbox').classList.contains('lightbox--open')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });

    // Fechar ao clicar fora da imagem
    document.querySelector('.lightbox__content').addEventListener('click', function(e) {
        if (e.target === e.currentTarget) {
            closeLightbox();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        if (!document.querySelector('.lightbox').classList.contains('lightbox--open')) return;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        if (!document.querySelector('.lightbox').classList.contains('lightbox--open')) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImage();
            else prevImage();
        }
    }
});

// CSS para o lightbox (será injetado via JS)
const lightboxStyles = `
<style>
.lightbox {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.lightbox--open {
    opacity: 1;
    visibility: visible;
}

.lightbox__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(4px);
}

.lightbox__content {
    position: relative;
    z-index: 1;
    max-width: 95vw;
    max-height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px;
}

.lightbox__image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
}

.lightbox__caption {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    text-align: center;
    margin-top: 8px;
    font-family: var(--font-sans);
}

.lightbox__close,
.lightbox__nav {
    position: absolute;
    width: 50px;
    height: 50px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
    z-index: 10;
}

.lightbox__close {
    top: -70px;
    right: 0;
    font-size: 2rem;
    line-height: 1;
}

.lightbox__close:hover,
.lightbox__nav:hover {
    background: rgba(255, 255, 255, 0.3);
}

.lightbox__nav--prev {
    left: -80px;
    top: 50%;
    transform: translateY(-50%);
}

.lightbox__nav--next {
    right: -80px;
    top: 50%;
    transform: translateY(-50%);
}

@media (max-width: 767px) {
    .lightbox__nav--prev {
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    .lightbox__nav--next {
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    .lightbox__close {
        top: -60px;
        right: 10px;
    }
}
</style>