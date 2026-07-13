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

  /* ─── 10. CONFIRMATION MODAL ──────────────────────── */

  function showConfirmModal(data) {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <h3 id="modal-title">Confirme seus dados</h3>
          <p>Verifique se as informações estão corretas antes de enviar.</p>
          <div class="modal-data">
            ${data.map(item => `
              <div class="modal-row">
                <span class="modal-row__label">${item.label}</span>
                <span class="modal-row__value">${item.value}</span>
              </div>
            `).join('')}
          </div>
          <div class="modal-actions">
            <button class="btn btn--outline modal-cancel" type="button">Cancelar</button>
            <button class="btn btn--form modal-confirm" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="width:16px;height:16px"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Enviar
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      overlay.querySelector('.modal-confirm').addEventListener('click', () => {
        overlay.remove();
        document.body.style.overflow = '';
        resolve(true);
      });

      overlay.querySelector('.modal-cancel').addEventListener('click', () => {
        overlay.remove();
        document.body.style.overflow = '';
        resolve(false);
      });

      overlay.addEventListener('click', e => {
        if (e.target === overlay) {
          overlay.remove();
          document.body.style.overflow = '';
          resolve(false);
        }
      });

      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') {
          overlay.remove();
          document.body.style.overflow = '';
          document.removeEventListener('keydown', handler);
          resolve(false);
        }
      });
    });
  }

  /* ─── 11. LEAD FORM (SULTS CRM) ──────────────────── */

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

  function initForm() {
    const form        = document.getElementById('leadForm');
    const successBox  = document.getElementById('formSuccess');
    const networkErr  = document.getElementById('formNetworkError');
    if (!form || !successBox) return;

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

      // ── EmailJS (backup independente) ──
      console.log('📧 EmailJS disponível?', typeof emailjs !== 'undefined');
      if (typeof emailjs !== 'undefined') {
        try {
          console.log('📧 Enviando email via EmailJS...');
          // Injeta UTMs como hidden inputs pro EmailJS
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
          console.log('📧 Chamando sendForm com:', { service: 'service_1u29mnn', template: 'template_po7jecd' });
          const response = await emailjs.sendForm('service_1u29mnn', 'template_po7jecd', form);
          console.log('✅ EmailJS sucesso:', response);
        } catch (err) {
          console.error('❌ EmailJS error completo:', err);
          console.error('❌ EmailJS status:', err?.status);
          console.error('❌ EmailJS text:', err?.text);
        }
      } else {
        console.warn('⚠️ EmailJS não está carregado');
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

      let descricao;
      if (utmPairs.length) {
        const parts = ['Lead do formulário Turquesa', `URL: ${window.location.href}`, '', 'UTMs:'];
        utmPairs.forEach(([k, v]) => parts.push(`  ${k}: ${v}`));
        descricao = parts.join('\n');
      } else {
        descricao = 'Acesso direto ao site';
      }
      descricao += `\n\nInvestimento: ${investimento}`;

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

      // ── Confirmation modal ──
      const confirmed = await showConfirmModal([
        { label: 'Nome', value: nome },
        { label: 'E-mail', value: email },
        { label: 'Telefone', value: `+55 ${document.getElementById('telefone').value.trim()}` },
        { label: 'Cidade', value: cidade },
        { label: 'Investimento', value: investimento },
      ]);
      if (!confirmed) {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
        return;
      }

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

  /* ─── 13. SPINNER KEYFRAME (injected) ────────────── */

  function injectSpinnerKeyframe() {
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  /* ─── 14. FLOATING CTA VISIBILITY ───────────────── */

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
    injectSpinnerKeyframe();
    initImages();
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initPhoneMask();
    initForm();
    initFabCta();
  });

})();
