/* ================================================
   Turquesa – Landing Page
   main.js
   ================================================ */

(function () {
  'use strict';

  /* ─── 1. CONCEPT IMAGE POOL ─────────────────────── */
  const CONCEPT_IMAGES = [
    'img/conceito/HAIR.jpeg',
    'img/conceito/NOVA FACHADA 3D.jpg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.30 (1).jpeg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.30.jpeg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.31.jpeg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.32 (3).jpeg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.34 (1).jpeg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.35.jpeg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.36 (1).jpeg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.37.jpeg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.38.57.jpeg',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.38.58.jpeg',
    'img/conceito/WhatsApp Image 2023-06-02 at 10.34.54.jpeg',
    'img/conceito/WhatsApp Image 2023-06-02 at 10.34.55.jpeg',
    'img/conceito/WhatsApp Image 2023-06-02 at 10.34.58.jpeg',
    'img/conceito/WhatsApp Image 2023-08-26 at 11.17.25 (1).jpeg',
    'img/conceito/WhatsApp Image 2023-08-26 at 11.17.25.jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.30 (1).jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.30 (2).jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.30.jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.31 (1).jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.31 (2).jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.31.jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.32.jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.53 (1).jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.53 (2).jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.53 (3).jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.53.jpeg',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.54.jpeg',
  ];

  /* ─── 2. UTILITIES ───────────────────────────────── */

  /** Fisher-Yates shuffle */
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Encode a file path for use inside CSS url('…') */
  function encodePath(path) {
    return path
      .split('/')
      .map(segment =>
        segment
          .replace(/ /g, '%20')
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
      )
      .join('/');
  }

  /** Set an element's background-image via CSS */
  function setBg(el, path) {
    if (!el) return;
    el.style.backgroundImage = `url('${encodePath(path)}')`;
  }

  /* ─── 3. ASSIGN RANDOM IMAGES TO SECTIONS ────────── */

  function initImages() {
    const pool = shuffle(CONCEPT_IMAGES);
    let idx = 0;

    // Hero background
    setBg(document.getElementById('heroBg'), pool[idx++]);

    // Sobre section image
    setBg(document.getElementById('sobreImg'), pool[idx++]);

    // Mercado background
    setBg(document.getElementById('mercadoBg'), pool[idx++]);

    // Gallery – infinite marquee (two rows, opposite directions)
    const row1El = document.getElementById('galeriaRow1');
    const row2El = document.getElementById('galeriaRow2');
    if (row1El && row2El) {
      const remaining = pool.slice(idx);
      const half = Math.ceil(remaining.length / 2);
      const row1imgs = remaining.slice(0, half);
      const row2imgs = remaining.slice(half);

      function buildStrip(el, imgs, clickable) {
        // Duplicate items for seamless infinite loop
        const doubled = [...imgs, ...imgs];
        doubled.forEach(src => {
          const div = document.createElement('div');
          div.className = 'galeria__item';
          div.setAttribute('role', 'img');
          div.setAttribute('aria-label', 'Espaço Turquesa');
          div.dataset.src = src;
          setBg(div, src);
          el.appendChild(div);
        });

        if (clickable) {
          el.addEventListener('click', e => {
            const item = e.target.closest('.galeria__item');
            if (item && item.dataset.src) openLightbox(item.dataset.src);
          });
        }
      }

      buildStrip(row1El, row1imgs, true);
      buildStrip(row2El, row2imgs, true);
    }
  }

  /* ─── 4. STICKY HEADER ───────────────────────────── */

  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 72);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ─── 5. MOBILE MENU ─────────────────────────────── */

  function initMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('headerNav');
    if (!btn || !nav) return;

    // Clone nav into mobile overlay
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'header__nav--mobile';
    mobileNav.setAttribute('aria-label', 'Menu mobile');
    mobileNav.innerHTML = nav.innerHTML;
    document.getElementById('header').after(mobileNav);

    btn.addEventListener('click', () => {
      const isOpen = btn.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        btn.classList.remove('open');
        mobileNav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !mobileNav.contains(e.target)) {
        btn.classList.remove('open');
        mobileNav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ─── 6. SCROLL REVEAL (IntersectionObserver) ────── */

  function initScrollReveal() {
    // Hero elements animate immediately on load
    setTimeout(() => {
      document.querySelectorAll('[data-animate-hero]').forEach(el => {
        el.classList.add('animated');
      });
    }, 200);

    // Section elements animate on scroll
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  }

  /* ─── 7. COUNTER ANIMATION ───────────────────────── */

  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ─── 8. PHONE MASK ──────────────────────────────── */

  function initPhoneMask() {
    const input = document.getElementById('telefone');
    if (!input) return;

    input.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, (_, a, b, c) =>
          c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a ? `(${a}` : ''
        );
      } else {
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) =>
          c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`
        );
      }
      e.target.value = v;
    });
  }

  /* ─── 9. LEAD FORM ───────────────────────────────── */

  function initForm() {
    const form = document.getElementById('leadForm');
    const successBox = document.getElementById('formSuccess');
    if (!form || !successBox) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      let isValid = true;
      const fields = form.querySelectorAll('input[required]');

      fields.forEach(field => {
        field.classList.remove('error');
        const val = field.value.trim();

        if (!val) {
          field.classList.add('error');
          isValid = false;
          return;
        }

        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          field.classList.add('error');
          isValid = false;
        }
      });

      if (!isValid) {
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Simulate async submission
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;animation:spin 0.8s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Enviando...';

      setTimeout(() => {
        form.style.display = 'none';
        successBox.style.display = 'block';

        // Scroll form into view
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1400);
    });

    // Clear error on input
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => input.classList.remove('error'));
    });
  }

  /* ─── 10. LIGHTBOX ───────────────────────────────── */

  function openLightbox(src) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Imagem ampliada');

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Espaço Turquesa';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox__close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Fechar');

    lb.appendChild(img);
    lb.appendChild(closeBtn);
    document.body.appendChild(lb);
    document.body.style.overflow = 'hidden';

    const close = () => {
      lb.remove();
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', handler); }
    });
  }

  /* ─── 11. SPINNER KEYFRAME (injected) ────────────── */

  function injectSpinnerKeyframe() {
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  /* ─── INIT ────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', () => {
    injectSpinnerKeyframe();
    initImages();
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initPhoneMask();
    initForm();
  });

})();
