/**
 * Apex Infrastructure & Construction — Main JavaScript
 * Production-quality, modular, accessible vanilla JS.
 */

'use strict';

// ============================================================
// PROJECT DATA — centralized data for project modals
// ============================================================
const PROJECT_DATA = {
  p1: {
    title: 'Meridian Tower HQ',
    category: 'Commercial',
    image: 'assets/images/project-1.webp',
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
    image: 'assets/images/project-2.webp',
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
    image: 'assets/images/project-3.webp',
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
    image: 'assets/images/project-4.webp',
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
    image: 'assets/images/project-5.webp',
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
    image: 'assets/images/project-6.webp',
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

/** Select a single element or throw. */
const $ = (selector, context = document) => context.querySelector(selector);

/** Select multiple elements as a real Array. */
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/** Clamp a value between min and max. */
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/** Simple HTML escaping utility to prevent dynamic XSS */
const escapeHTML = str =>
  String(str).replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );

// ============================================================
// PRELOAD REMOVAL — strips transition-killing class after load
// ============================================================
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

// ============================================================
// HEADER — sticky shrink & active nav link on scroll
// ============================================================
(function initHeader() {
  const header = $('#site-header');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  if (!header) return;

  const handleScroll = () => {
    // Sticky shrink
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on init
})();

// ============================================================
// MOBILE NAVIGATION DRAWER
// ============================================================
(function initMobileNav() {
  const toggle = $('#nav-toggle');
  const drawer = $('#mobile-nav');
  const backdrop = $('#mobile-nav-backdrop');
  const mobileLinks = $$('#mobile-nav .nav-link');

  if (!toggle || !drawer || !backdrop) return;

  let isOpen = false;

  const open = () => {
    isOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus first link for accessibility
    const firstLink = drawer.querySelector('a, button');
    if (firstLink) firstLink.focus();
  };

  const close = () => {
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggle.focus();
  };

  toggle.addEventListener('click', () => (isOpen ? close() : open()));
  backdrop.addEventListener('click', close);

  // Close drawer when a link is clicked
  mobileLinks.forEach(link => link.addEventListener('click', close));

  // Escape key closes drawer
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) close();
  });
})();

// ============================================================
// HERO BACKGROUND SLIDER
// ============================================================
(function initHeroSlider() {
  const slides = $$('.hero-bg-slide');
  if (!slides.length) return;

  let current = 0;
  const INTERVAL = 6000;

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
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = el => {
    const target = parseInt(el.dataset.target, 10);
    const start = performance.now();

    const tick = now => {
      const elapsed = now - start;
      const progress = clamp(elapsed / DURATION, 0, 1);
      el.textContent = Math.floor(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };

    requestAnimationFrame(tick);
  };

  // Trigger on intersection
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

  counters.forEach(c => observer.observe(c));
})();

// ============================================================
// SCROLL REVEAL ANIMATIONS (IntersectionObserver)
// ============================================================
(function initScrollReveal() {
  const revealEls = $$('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
})();

// ============================================================
// PROJECT FILTERING
// ============================================================
(function initProjectFilter() {
  const filterBtns = $$('.filter-btn');
  const projectCards = $$('#projects-grid .project-card');

  if (!filterBtns.length || !projectCards.length) return;

  const applyFilter = filter => {
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      const matches = filter === 'all' || cat === filter;
      if (matches) {
        card.classList.remove('fade-out');
        card.classList.add('fade-in');
      } else {
        card.classList.remove('fade-in');
        card.classList.add('fade-out');
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
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

  if (!modal) return;

  // Populate modal with project data
  const populateModal = projectId => {
    const data = PROJECT_DATA[projectId];
    if (!data) return;

    $('#modal-img', modal).style.backgroundImage = `url('${data.image}')`;
    $('#modal-img', modal).setAttribute('aria-label', data.title + ' project photo');
    $('#modal-cat', modal).textContent = data.category;
    $('#modal-title-text', modal).textContent = data.title;
    $('#modal-desc', modal).textContent = data.desc;

    // Render spec items
    const specsEl = $('#modal-specs', modal);
    specsEl.innerHTML = Object.entries(data.specs)
      .map(([key, val]) => `
        <div class="spec-item">
          <h5>${escapeHTML(key)}</h5>
          <p>${escapeHTML(val)}</p>
        </div>
      `)
      .join('');
  };

  // Focus trap elements
  let lastFocusedEl = null;
  const getFocusableEls = () =>
    $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal);

  const trapFocus = e => {
    if (e.key !== 'Tab') return;
    const focusable = getFocusableEls();
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
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    document.addEventListener('keydown', trapFocus);

    // Accessibility: hide background nodes from assistive tech
    const mainNode = $('#main-content');
    const headerNode = $('#site-header');
    const footerNode = $('footer');
    if (mainNode) mainNode.setAttribute('aria-hidden', 'true');
    if (headerNode) headerNode.setAttribute('aria-hidden', 'true');
    if (footerNode) footerNode.setAttribute('aria-hidden', 'true');
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', trapFocus);
    if (lastFocusedEl) lastFocusedEl.focus();

    // Accessibility: restore background nodes visibility
    const mainNode = $('#main-content');
    const headerNode = $('#site-header');
    const footerNode = $('footer');
    if (mainNode) mainNode.removeAttribute('aria-hidden');
    if (headerNode) headerNode.removeAttribute('aria-hidden');
    if (footerNode) footerNode.removeAttribute('aria-hidden');
  };

  // Bind open buttons
  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      const projectId = card?.dataset?.id;
      if (projectId) openModal(projectId);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();

// ============================================================
// CONTACT FORM — Validation & Submit Handler
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
    'form-name': { label: 'Full Name', validate: v => v.trim().length >= 2 },
    'form-email': { label: 'Email Address', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    'form-service': { label: 'Service Type', validate: v => v !== '' },
    'form-message': { label: 'Project Brief', validate: v => v.trim().length >= 20 }
  };

  const showStatus = (type, msg) => {
    statusEl.className = `form-status ${type}`;
    statusMsg.textContent = msg;
    // Update icon based on type
    if (type === 'success') {
      statusEl.querySelector('svg').innerHTML = '<polyline points="20 6 9 17 4 12"/>';
    } else {
      statusEl.querySelector('svg').innerHTML = '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
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

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Clear previous status
    statusEl.className = 'form-status';
    statusMsg.textContent = '';

    // Validate fields
    const errors = [];
    Object.entries(FIELDS).forEach(([id, { label, validate }]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const valid = validate(el.value);
      el.style.borderColor = valid ? '' : 'var(--color-error)';
      el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (!valid) errors.push(label);
    });

    if (errors.length) {
      showStatus('error', `Please check the following fields: ${errors.join(', ')}.`);
      // Focus first invalid field
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    setLoading(true);

    // Simulate API submission (replace with real fetch/ajax call)
    await new Promise(resolve => setTimeout(resolve, 1800));

    setLoading(false);
    showStatus('success', 'Thank you! Your project brief has been received. Our preconstruction team will contact you within 48 business hours.');
    form.reset();
    // Reset border colors
    Object.keys(FIELDS).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.borderColor = '';
    });
  });

  // Clear error styling on input
  Object.keys(FIELDS).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      el.style.borderColor = '';
      el.removeAttribute('aria-invalid');
    });
  });
})();

// ============================================================
// NEWSLETTER SUBSCRIBE FORM
// ============================================================
(function initSubscribeForm() {
  const form = $('#subscribe-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const emailEl = $('#subscribe-email');
    const val = emailEl?.value?.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      emailEl.style.borderColor = 'var(--color-error)';
      return;
    }
    emailEl.style.borderColor = 'var(--color-success)';
    emailEl.value = 'Subscribed! ✓';
    emailEl.disabled = true;
    form.querySelector('button').disabled = true;
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
// SMOOTH SCROLL for anchor links (with header offset)
// ============================================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();

      const headerH = document.getElementById('site-header')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
