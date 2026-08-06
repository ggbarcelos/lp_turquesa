/* ================================================
   Turquesa – Landing Page
   main.js
   ================================================ */

(function () {
  'use strict';

  /* ─── 1. CONCEPT IMAGE POOL ─────────────────────── */
  const CONCEPT_IMAGES = [
    'img/conceito/HAIR.webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.30 (1).webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.30.webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.31.webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.32 (3).webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.34 (1).webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.35.webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.36 (1).webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.34.37.webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.38.57.webp',
    'img/conceito/WhatsApp Image 2023-05-30 at 10.38.58.webp',
    'img/conceito/WhatsApp Image 2023-06-02 at 10.34.54.webp',
    'img/conceito/WhatsApp Image 2023-06-02 at 10.34.55.webp',
    'img/conceito/WhatsApp Image 2023-06-02 at 10.34.58.webp',
    'img/conceito/WhatsApp Image 2023-08-26 at 11.17.25 (1).webp',
    'img/conceito/WhatsApp Image 2023-08-26 at 11.17.25.webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.30 (1).webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.30 (2).webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.30.webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.31 (1).webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.31 (2).webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.31.webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.32.webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.53 (1).webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.53 (2).webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.53 (3).webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.53.webp',
    'img/conceito/WhatsApp Image 2026-01-07 at 16.07.54.webp',
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

  const FOTOS_IMAGES = [
    'img/fotos/Luxury_beauty_salon_photograph_2K_202607131231.webp',
    'img/fotos/RETIRE_O_LED_2K_202606011224.webp',
    'img/fotos/Transform_this_interior_render_into_202605291954.webp',
    'img/fotos/Transform_this_interior_render_into_202606011225.webp',
    'img/fotos/Transform_this_interior_render_into_202606011226.webp',
    'img/fotos/Transform_this_interior_render_into_202606011322.webp',
    'img/fotos/Transform_this_interior_render_into_202606011325.webp',
  ];

  function initImages() {
    const pool = shuffle(CONCEPT_IMAGES);
    let idx = 0;

    const reveal = (el, path) => {
      if (!el) return;
      const apply = () => { setBg(el, path); io.disconnect(); };
      if (!('IntersectionObserver' in window)) { setBg(el, path); return; }
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) apply(); });
      }, { rootMargin: '240px 0px' });
      io.observe(el);
    };

    // Sobre section image
    reveal(document.getElementById('sobreImg'), pool[idx++]);

    // Mercado background
    reveal(document.getElementById('mercadoBg'), pool[idx++]);

    // Gallery – Luxury Grid (6 random non-repeating photos from img/fotos/)
    const gridItems = document.querySelectorAll('.galeria__item');
    if (gridItems.length) {
      const fotosPool = shuffle(FOTOS_IMAGES);
      gridItems.forEach((item, i) => {
        const src = fotosPool[i % fotosPool.length];
        item.dataset.src = src;

        const wrapper = item.closest('.galeria__item-wrapper');
        if (wrapper) wrapper.style.setProperty('--i', i);

        item.addEventListener('click', () => {
          openLightbox(src);
        });

        reveal(item, src);
      });
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

  /* ─── 5. MOBILE MENU (collapse próprio) ──────────── */

  function initMobileMenu() {
    const collapseEl = document.getElementById('headerNav');
    const toggler = document.querySelector('[data-bs-toggle="collapse"]');
    if (!collapseEl || !toggler) return;

    toggler.addEventListener('click', () => {
      const expanded = toggler.getAttribute('aria-expanded') === 'true';
      collapseEl.classList.toggle('show', !expanded);
      toggler.setAttribute('aria-expanded', String(!expanded));
    });

    collapseEl.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', () => {
        collapseEl.classList.remove('show');
        toggler.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── 6. SCROLL REVEAL (IntersectionObserver) ────── */

  function initScrollReveal() {
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

  function normalizePhone(raw) {
    return raw.replace(/\D/g, '');
  }

  function initPhoneMask() {
    const input = document.getElementById('telefone');
    if (!input) return;

    input.addEventListener('input', e => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
      let v;
      if (digits.length <= 10) {
        v = digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, (_, a, b, c) =>
          c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a ? `(${a}` : ''
        );
      } else {
        v = digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) =>
          c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`
        );
      }
      e.target.value = v;
    });
  }

  /* ─── 9. UTM CAPTURE ────────────────────────────── */

  function getUtms() {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source:   p.get('utm_source')   || '',
      utm_medium:   p.get('utm_medium')   || '',
      utm_campaign: p.get('utm_campaign') || '',
      utm_term:     p.get('utm_term')     || '',
      utm_content:  p.get('utm_content')  || '',
      utm_id:       p.get('utm_id')       || '',
      fbclid:       p.get('fbclid')       || '',
    };
  }

  /* ─── 10. LEAD FORM (SULTS CRM) ──────────────────── */

  const WEBHOOK_URL = 'https://sults-api.giovanni-aguiar.workers.dev';

  // Validation rules per field
  const RULES = {
    nome:     v => v.trim().length >= 3             || 'Por favor, informe seu nome completo.',
    email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Informe um e-mail válido.',
    telefone: v => normalizePhone(v).length >= 10 || 'Informe um telefone com DDD.',
    cidade:       v => v.trim().length >= 2             || 'Informe a cidade de interesse.',
    investimento: v => v !== ''                          || 'Selecione a faixa de investimento.',
  };

  function showFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errEl = document.getElementById(`erro-${fieldId}`);
    if (!input || !errEl) return;
    input.classList.add('error');
    errEl.textContent = message;
    errEl.classList.add('visible');
  }

  function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const errEl = document.getElementById(`erro-${fieldId}`);
    if (!input || !errEl) return;
    input.classList.remove('error');
    errEl.classList.remove('visible');
  }

  function loadEmailJs() {
    return new Promise((resolve, reject) => {
      if (typeof emailjs !== 'undefined') { resolve(); return; }
      const s = document.createElement('script');
      s.src = 'js/email.min.js';
      s.async = true;
      s.onload = () => { emailjs.init({ publicKey: 'xAtMa5JUwZUvcGnXw' }); resolve(); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function initForm() {
    const form        = document.getElementById('leadForm');
    const successBox  = document.getElementById('formSuccess');
    const networkErr  = document.getElementById('formNetworkError');
    if (!form || !successBox) return;

    // ── Custom validity messages in Portuguese ──
    const VALIDITY_MSGS = {
      nome:          'Por favor, informe seu nome completo.',
      email:         'Informe um e-mail válido.',
      telefone:      'Informe um telefone com DDD.',
      cidade:        'Informe a cidade de interesse.',
      investimento:  'Selecione a faixa de investimento.',
    };

    Object.entries(VALIDITY_MSGS).forEach(([id, msg]) => {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('invalid', () => { input.setCustomValidity(msg); });
      input.addEventListener('input', () => { input.setCustomValidity(''); });
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', () => { input.setCustomValidity(''); });
      }
    });

    // Live-clear errors on input
    Object.keys(RULES).forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('input', () => clearFieldError(id));
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', () => clearFieldError(id));
      }
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();

      // ── Validate all fields ──
      let isValid = true;
      Object.entries(RULES).forEach(([id, rule]) => {
        const input = document.getElementById(id);
        if (!input) return;
        const result = rule(input.value);
        if (result !== true) {
          showFieldError(id, result);
          isValid = false;
        } else {
          clearFieldError(id);
        }
      });

      if (!isValid) {
        const firstError = form.querySelector('input.error');
        if (firstError) firstError.focus();
        return;
      }

      // ── Loading state ──
      const btn = form.querySelector('[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        style="width:18px;height:18px;animation:spin 0.8s linear infinite">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg> Enviando...`;

      if (networkErr) networkErr.style.display = 'none';

      // ── EmailJS (backup independente, carregado sob demanda) ──
      try {
        await loadEmailJs();
        const utms = getUtms();
        const utmFields = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','fbclid'];
        utmFields.forEach(param => {
          if (!form.querySelector(`input[name="${param}"]`)) {
            const hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = param;
            hidden.value = utms[param] || '';
            form.appendChild(hidden);
          }
        });
        const response = await emailjs.sendForm('service_1u29mnn', 'template_po7jecd', form);
        console.log('✅ EmailJS sucesso:', response);
      } catch (err) {
        console.error('❌ EmailJS error completo:', err);
        console.error('❌ EmailJS status:', err?.status);
        console.error('❌ EmailJS text:', err?.text);
      }

      // ── Build payload ──
      const nome         = document.getElementById('nome').value.trim();
      const email        = document.getElementById('email').value.trim();
      const phone        = `+55 ${document.getElementById('telefone').value.trim()}`;
      const cidade       = document.getElementById('cidade').value.trim();
      const investimento = document.getElementById('investimento').value;

      const utms = getUtms();
      const utmPairs = [
        ['utm_source', utms.utm_source],
        ['utm_medium', utms.utm_medium],
        ['utm_campaign', utms.utm_campaign],
        ['utm_term', utms.utm_term],
        ['utm_content', utms.utm_content],
        ['utm_id', utms.utm_id],
        ['fbclid', utms.fbclid],
      ].filter(([, v]) => v);

      const lines = [
        `Nome: ${nome}`,
        `E-mail: ${email}`,
        `Telefone: ${phone}`,
        `Cidade: ${cidade}`,
        `Investimento: ${investimento}`,
      ];

      if (utmPairs.length) {
        lines.push('', '--- Origem do tráfego ---');
        const labelMap = { utm_source: 'Fonte', utm_medium: 'Mídia', utm_campaign: 'Campanha', utm_term: 'Termo', utm_content: 'Conteúdo', utm_id: 'ID', fbclid: 'FB Click ID' };
        utmPairs.forEach(([k, v]) => lines.push(`${labelMap[k] || k}: ${v}`));
      } else {
        lines.push('', 'Acesso direto ao site');
      }

      const descricao = lines.join('\n');

      const payload = {
        sendEmailModeloIdToLead: 1,
        sendNotificationToResponsavel: true,
        negocio: {
          titulo: `Novo Negócio - ${nome}`,
          responsavelId: 161,
          etapaId: 32,
          situacaoId: 1,
          origemId: 17,
          campanhaId: 4,
          descricao,
        },
        pessoa: { nome, email, phone },
      };

      // ── Send to webhook ──
      try {
        const res = await fetch(WEBHOOK_URL, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        });

        let body = '';
        try { body = await res.text(); } catch (_) {}
        if (!res.ok) throw new Error(`HTTP ${res.status} — "${body}"`);

        // Success
        form.style.display = 'none';
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

      } catch (err) {
        console.error('Webhook error:', err);
        btn.disabled = false;
        btn.innerHTML = originalHTML;
        if (networkErr) networkErr.style.display = 'flex';
        networkErr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ─── 12. LIGHTBOX ───────────────────────────────── */

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

  /* ─── 14. DEPOIMENTOS LIGHTBOX ────────────────────── */

  function initDepoimentos() {
    const lb = document.getElementById('depoimentoLb');
    const lbVideo = document.getElementById('depoimentoLbVideo');
    const lbClose = lb?.querySelector('.depoimento-lb__close');
    const lbBackdrop = lb?.querySelector('.depoimento-lb__backdrop');
    if (!lb || !lbVideo) return;

    const cards = document.querySelectorAll('.depoimentos__card');
    let currentVideo = null;

    function open(card) {
      const youtubeId = card.dataset.videoYoutube;
      const localSrc = card.dataset.videoLocal;

      lbVideo.innerHTML = '';

      if (youtubeId) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        lbVideo.appendChild(iframe);
      } else if (localSrc) {
        const video = document.createElement('video');
        video.src = localSrc;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.className = 'depoimento-lb__local-video';
        lbVideo.appendChild(video);
        currentVideo = video;
      }

      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      if (currentVideo) { currentVideo.pause(); currentVideo = null; }
      lbVideo.innerHTML = '';
      lb.classList.remove('active');
      document.body.style.overflow = '';
    }

    cards.forEach(card => {
      card.addEventListener('click', () => open(card));
    });

    if (lbClose) lbClose.addEventListener('click', close);
    if (lbBackdrop) lbBackdrop.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lb.classList.contains('active')) close();
    });
  }

  /* ─── 15. FLOATING CTA VISIBILITY ───────────────── */

  function initFabCta() {
    const fab     = document.getElementById('fabCta');
    const contato = document.getElementById('contato');
    if (!fab || !contato) return;

    const SHOW_AFTER_PX = 300;

    // Scroll to #contato via JS (works in file:// and http://)
    fab.addEventListener('click', function (e) {
      e.preventDefault();
      contato.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Show/hide based on scroll position vs contato section bounds
    function updateFab() {
      const scrollY      = window.scrollY;
      const rect         = contato.getBoundingClientRect();
      const inView       = rect.top < window.innerHeight && rect.bottom > 0;
      const hide         = scrollY < SHOW_AFTER_PX || inView;

      fab.classList.toggle('fab-cta--hidden', hide);
    }

    window.addEventListener('scroll', updateFab, { passive: true });
    updateFab();
  }

  /* ─── INIT ────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', () => {
    initImages();
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initPhoneMask();
    initForm();
    initDepoimentos();
    initFabCta();
  });

})();
