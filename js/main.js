/**
 * Apex Infrastructure & Construction — Main JavaScript
 * Production-grade, modular, fully accessible vanilla JS (ES6+).
 */

'use strict';

// ============================================================
// PROJECT DATA — Centralized dataset for project modals
// ============================================================
const PROJECT_DATA = {
  p1: {
    title: 'Meridian Tower HQ',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format',
    desc: 'A 42-story Class A corporate headquarters in downtown Chicago. Apex served as the General Contractor, self-performing concrete, structural steel erection, and mechanical rough-ins. The project achieved LEED Gold certification and completed 11 days ahead of schedule.',
    specs: {
      Client: 'Meridian Capital Group',
      Location: 'Chicago, IL',
      Value: '$312 Million',
      Completed: '2022',
      Size: '820,000 sq ft',
      Delivery: 'Design-Build'
    }
  },
  p2: {
    title: 'Clearwater River Bridge',
    category: 'Civil',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80&auto=format',
    desc: 'A twin-span suspension bridge carrying a six-lane state highway across the Clearwater River in Wisconsin. The project required precision cofferdam construction, precast concrete deck panels, and involved zero lane closures of the existing adjacent bridge during construction.',
    specs: {
      Client: 'Wisconsin DOT',
      Location: 'Eau Claire, WI',
      Value: '$187 Million',
      Completed: '2021',
      Size: '1,840 ft span',
      Delivery: 'GC (CMR)'
    }
  },
  p3: {
    title: 'NorthPort Logistics Hub',
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&auto=format',
    desc: 'A 2.4-million-square-foot distribution mega-campus comprising three cross-dock warehouses, a transportation management facility, and 48-acre truck court. Apex delivered the turnkey industrial development, including all site utilities and a private rail spur.',
    specs: {
      Client: 'NorthPort Ventures LLC',
      Location: 'Gary, IN',
      Value: '$228 Million',
      Completed: '2023',
      Size: '2.4M sq ft',
      Delivery: 'Design-Build'
    }
  },
  p4: {
    title: 'Harborview Mixed-Use',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format',
    desc: 'A $145M mixed-use waterfront development encompassing 280 luxury residential units, 85,000 sq ft of ground-level retail, and a 400-space parking structure. Built on a challenging lakefront site requiring deep foundation caissons reaching bedrock at 90 feet.',
    specs: {
      Client: 'Harborview Dev. Partners',
      Location: 'Milwaukee, WI',
      Value: '$145 Million',
      Completed: '2020',
      Size: '480,000 sq ft',
      Delivery: 'GC Lump Sum'
    }
  },
  p5: {
    title: 'Metro Water Treatment Plant',
    category: 'Civil',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&q=80&auto=format',
    desc: 'Expansion of a regional water treatment facility from 80 MGD to 135 MGD capacity, adding advanced biological nutrient removal, UV disinfection systems, and control room upgrades. The facility remained fully operational throughout the phased 3-year construction period.',
    specs: {
      Client: 'Metro Water Reclamation',
      Location: 'Minneapolis, MN',
      Value: '$94 Million',
      Completed: '2019',
      Size: '135 MGD Capacity',
      Delivery: 'CM at Risk'
    }
  },
  p6: {
    title: 'Vertex Semiconductor Plant',
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80&auto=format',
    desc: 'A highly controlled ISO Class 5 cleanroom fabrication facility for advanced semiconductor manufacturing. The project required vibration-isolated structural slabs, ultra-pure water systems, specialized HVAC with sub-micron filtration, and a private 138kV substation.',
    specs: {
      Client: 'Vertex Microelectronics',
      Location: 'Round Rock, TX',
      Value: '$670 Million',
      Completed: '2024',
      Size: '1.1M sq ft',
      Delivery: 'Design-Build'
    }
  }
};

// ============================================================
// UTILITY HELPERS
// ============================================================
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Remove transition suppression once page is loaded
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.classList.remove('preload');
  });
});

// ============================================================
// HEADER — Sticky shrink & Active Nav Link Scrollspy
// ============================================================
(function initHeader() {
  const header = $('#site-header');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  if (!header) return;

  const handleScroll = () => {
    // Sticky shrink header
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy active state
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();

// ============================================================
// MOBILE NAVIGATION DRAWER & FOCUS TRAP
// ============================================================
(function initMobileNav() {
  const toggle = $('#nav-toggle');
  const drawer = $('#mobile-nav');
  const closeBtn = $('#mobile-nav-close');
  const backdrop = $('#mobile-nav-backdrop');
  const drawerLinks = $$('#mobile-nav .nav-link, #mobile-nav .mobile-nav-cta a');

  if (!toggle || !drawer || !backdrop) return;

  let isOpen = false;

  const getFocusableEls = () =>
    $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', drawer);

  const handleFocusTrap = e => {
    if (e.key !== 'Tab') return;
    const focusable = getFocusableEls();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const openDrawer = () => {
    isOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    drawer.setAttribute('aria-hidden', 'false');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus close button
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', handleKeyDown);
  };

  const closeDrawer = () => {
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';

    document.removeEventListener('keydown', handleKeyDown);
    toggle.focus();
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape' && isOpen) {
      closeDrawer();
    } else if (isOpen) {
      handleFocusTrap(e);
    }
  };

  toggle.addEventListener('click', () => (isOpen ? closeDrawer() : openDrawer()));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
})();

// ============================================================
// HERO BACKGROUND SLIDER
// ============================================================
(function initHeroSlider() {
  const slides = $$('.hero-bg-slide');
  if (slides.length <= 1) return;

  let current = 0;
  const INTERVAL = 6500;

  const advance = () => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  };

  setInterval(advance, INTERVAL);
})();

// ============================================================
// COUNTER ANIMATION (Hero Stats)
// ============================================================
(function initCounters() {
  const counters = $$('.counter');
  if (!counters.length) return;

  const DURATION = 1800; // ms
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = el => {
    const target = parseInt(el.dataset.target, 10);
    const start = performance.now();

    const tick = now => {
      const elapsed = now - start;
      const progress = clamp(elapsed / DURATION, 0, 1);
      el.textContent = Math.floor(easeOutCubic(progress) * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };

    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    counters.forEach(c => observer.observe(c));
  } else {
    counters.forEach(c => (c.textContent = c.dataset.target));
  }
})();

// ============================================================
// SCROLL REVEAL ANIMATIONS (IntersectionObserver)
// ============================================================
(function initScrollReveal() {
  const revealEls = $$('.reveal');
  if (!revealEls.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('revealed'));
  }
})();

// ============================================================
// PROJECT FILTERING (Grid Safe)
// ============================================================
(function initProjectFilter() {
  const filterBtns = $$('.filter-btn');
  const projectCards = $$('#projects-grid .project-card');

  if (!filterBtns.length || !projectCards.length) return;

  const applyFilter = category => {
    projectCards.forEach(card => {
      const cardCategory = card.dataset.category;
      const matches = category === 'all' || cardCategory === category;
      if (matches) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      applyFilter(btn.dataset.filter);
    });
  });
})();

// ============================================================
// PROJECT DETAILS MODAL
// ============================================================
(function initProjectModal() {
  const modal = $('#project-modal');
  const closeBtn = $('#modal-close-btn');
  const backdrop = $('#modal-backdrop');
  const detailBtns = $$('.project-details-btn');

  if (!modal || !closeBtn || !backdrop) return;

  let lastFocusedEl = null;

  const populateModal = projectId => {
    const data = PROJECT_DATA[projectId];
    if (!data) return;

    const imgSide = $('#modal-img', modal);
    imgSide.style.backgroundImage = `url('${data.image}')`;
    imgSide.setAttribute('aria-label', `${data.title} project showcase photograph`);

    $('#modal-cat', modal).textContent = data.category;
    $('#modal-title-text', modal).textContent = data.title;
    $('#modal-desc', modal).textContent = data.desc;

    const specsEl = $('#modal-specs', modal);
    specsEl.innerHTML = Object.entries(data.specs)
      .map(
        ([key, val]) => `
        <div class="spec-item">
          <h5>${key}</h5>
          <p>${val}</p>
        </div>
      `
      )
      .join('');
  };

  const getFocusableEls = () =>
    $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal);

  const trapFocus = e => {
    if (e.key !== 'Tab') return;
    const focusable = getFocusableEls();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const openModal = projectId => {
    lastFocusedEl = document.activeElement;
    populateModal(projectId);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    document.addEventListener('keydown', handleKeyDown);
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeyDown);
    if (lastFocusedEl) lastFocusedEl.focus();
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      closeModal();
    } else {
      trapFocus(e);
    }
  };

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      const projectId = card?.dataset?.id;
      if (projectId) openModal(projectId);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
})();

// ============================================================
// CONTACT INQUIRY FORM — Accessible Field-Level Validation
// ============================================================
(function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  const submitBtn = $('#form-submit-btn');
  const btnText = $('#form-btn-text');
  const btnIcon = $('#form-btn-icon');
  const statusEl = $('#form-status');
  const statusMsg = $('#form-status-msg');

  const FIELDS = {
    'form-name': {
      label: 'Full Name',
      errorId: 'form-name-error',
      validate: v => v.trim().length >= 2,
      errorMsg: 'Please enter your full name (minimum 2 characters).'
    },
    'form-email': {
      label: 'Email Address',
      errorId: 'form-email-error',
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      errorMsg: 'Please enter a valid email address.'
    },
    'form-service': {
      label: 'Service Type',
      errorId: 'form-service-error',
      validate: v => v !== '' && v !== null,
      errorMsg: 'Please select a service category.'
    },
    'form-message': {
      label: 'Project Brief',
      errorId: 'form-message-error',
      validate: v => v.trim().length >= 15,
      errorMsg: 'Please provide a brief project summary (minimum 15 characters).'
    }
  };

  const setFieldError = (inputId, isError, msg = '') => {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(FIELDS[inputId]?.errorId);
    if (!input) return;

    if (isError) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = msg;
    } else {
      input.classList.remove('is-invalid');
      input.setAttribute('aria-invalid', 'false');
      if (errorEl) errorEl.textContent = '';
    }
  };

  const showStatus = (type, msg) => {
    statusEl.className = `form-status form-grid-full ${type}`;
    statusMsg.textContent = msg;

    const icon = statusEl.querySelector('svg');
    if (type === 'success') {
      icon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
    } else {
      icon.innerHTML = '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
    }
  };

  const setLoading = loading => {
    submitBtn.disabled = loading;
    if (loading) {
      btnText.textContent = 'Submitting…';
      btnIcon.style.display = 'none';
    } else {
      btnText.textContent = 'Submit Project Brief';
      btnIcon.style.display = '';
    }
  };

  // Clear errors on input
  Object.keys(FIELDS).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => setFieldError(id, false));
      el.addEventListener('change', () => setFieldError(id, false));
    }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    statusEl.className = 'form-status form-grid-full';
    statusMsg.textContent = '';

    let hasErrors = false;
    let firstInvalidEl = null;

    Object.entries(FIELDS).forEach(([id, { validate, errorMsg }]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const isValid = validate(el.value);
      if (!isValid) {
        setFieldError(id, true, errorMsg);
        hasErrors = true;
        if (!firstInvalidEl) firstInvalidEl = el;
      } else {
        setFieldError(id, false);
      }
    });

    if (hasErrors) {
      showStatus('error', 'Please correct the highlighted fields before submitting.');
      if (firstInvalidEl) firstInvalidEl.focus();
      return;
    }

    setLoading(true);

    // Simulate backend submission response
    await new Promise(resolve => setTimeout(resolve, 1400));

    setLoading(false);
    showStatus('success', 'Thank you! Your project brief has been received. Our preconstruction team will follow up within 48 business hours.');
    form.reset();
  });
})();

// ============================================================
// NEWSLETTER SUBSCRIBE FORM
// ============================================================
(function initSubscribeForm() {
  const form = $('#subscribe-form');
  const statusEl = $('#subscribe-status');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const emailEl = $('#subscribe-email');
    const val = emailEl?.value?.trim();

    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      emailEl.style.borderColor = 'var(--color-error)';
      if (statusEl) {
        statusEl.style.color = 'var(--color-error)';
        statusEl.textContent = 'Please enter a valid email address.';
      }
      return;
    }

    emailEl.style.borderColor = 'var(--color-success)';
    emailEl.value = '';
    emailEl.disabled = true;
    form.querySelector('button').disabled = true;

    if (statusEl) {
      statusEl.style.color = 'var(--color-success)';
      statusEl.textContent = 'Thank you for subscribing!';
    }
  });
})();

// ============================================================
// FOOTER YEAR
// ============================================================
(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS (Header Offset Aware)
// ============================================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const headerH = document.getElementById('site-header')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH + 2;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
