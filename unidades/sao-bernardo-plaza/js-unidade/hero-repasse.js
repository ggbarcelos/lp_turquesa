/* ================================================
   Hero Repasse - Animações e Interações
   Turquesa São Bernardo Plaza
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página do hero-repasse
    if (!document.querySelector('.hero-repasse')) return;
    
    // Verificar se a animação inicial já foi feita
    const hasAnimated = document.body.getAttribute('data-hero-repasse-animated');
    if (hasAnimated) return;
    
    // Marcar como animado para não animar novamente
    document.body.setAttribute('data-hero-repasse-animated', 'true');
    
    // Inicializar animações após o carregamento
    setTimeout(initHeroAnimations, 100);
    
    // Efeitos de rolagem para os KPIs quando visíveis
    initKPIScrollReveal();
    initGalleryHoverEffects();
    initFloatingCardsAnimation();
}

function initKPIScrollReveal() {
    const kpis = document.querySelectorAll('.hero-repasse__kpi');
    
    const kpiObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                kpiObserver.unobserve(entry.target);
            }
        });
    });
    
    kpis.forEach(kpi => {
        kpi.style.opacity = '0';
        kpi.style.transform = 'translateY(10px)';
        kpi.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        kpi.style.transitionProperty = 'opacity, transform';
        kpi.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        kpi.style.transitionProperty = 'all 0.3s ease';
        kpiObserver.observe(kpi);
    });
}

function initGalleryHoverEffects() {
    const mainImage = document.querySelector('.hero-repasse__main-image');
    if (!mainImage) return;
    
    mainImage.addEventListener('mouseenter', function() {
        this.querySelector('.hero-repasse__main-image img').style.transform = 'scale(1.05)';
    }
    
    mainImage.addEventListener('mouseleave', function() {
        this.querySelector('.hero-repasse__main-image img').style.transform = 'scale(1)';
    }
}

function initFloatingCardsAnimation() {
    const cards = document.querySelectorAll('.hero-repasse__floating-card');
    if (!cards.length) return;
    
    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    }
}