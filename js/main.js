/* Portfolio interactions */
(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Remember and apply the visitor's preferred color theme. */
  function initTheme() {
    const button = document.querySelector('#theme-toggle');
    const icon = button.querySelector('.theme-toggle__icon');
    let savedTheme;

    try { savedTheme = localStorage.getItem('rm-theme'); } catch (_) { savedTheme = null; }
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function applyTheme(theme) {
      root.dataset.theme = theme;
      icon.textContent = theme === 'dark' ? '☀' : '☾';
      button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#161e1b' : '#f7f5f0';
    }

    applyTheme(initialTheme);
    button.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try { localStorage.setItem('rm-theme', nextTheme); } catch (_) { /* Storage can be disabled. */ }
    });
  }

  /* Keep the mobile menu usable by touch and keyboard. */
  function initNavigation() {
    const toggle = document.querySelector('.nav__menu-toggle');
    const menu = document.querySelector('#nav-links');
    const links = [...menu.querySelectorAll('.nav__link')];

    function setMenuOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open && window.innerWidth <= 700);
    }

    toggle.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    links.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) setMenuOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) setMenuOpen(false);
    });

    if (!('IntersectionObserver' in window)) return;
    const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const currentId = visible[0].target.id;
      links.forEach(link => {
        const active = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, .1, .25, .5] });
    sections.forEach(section => observer.observe(section));
  }

  /* Reveal content and fill skill bars when it enters the viewport. */
  function initReveal() {
    const revealItems = [...document.querySelectorAll('.reveal')];
    const skillsGrid = document.querySelector('.skills__grid');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      revealItems.forEach(item => item.classList.add('is-visible'));
      skillsGrid.classList.add('is-visible');
      return;
    }
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        skillsGrid.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: .2 });
    skillsObserver.observe(skillsGrid);
  }

  /* Filter project cards without rebuilding the page. */
  function initProjectFilter() {
    const buttons = [...document.querySelectorAll('.filter__button')];
    const cards = [...document.querySelectorAll('.project-card')];
    const emptyMessage = document.querySelector('#projects-empty');
    buttons.forEach(button => button.addEventListener('click', () => {
      const category = button.dataset.filter;
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      let visibleCount = 0;
      cards.forEach(card => {
        const matches = category === 'all' || card.dataset.category === category;
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      emptyMessage.hidden = visibleCount > 0;
    }));
  }

  /* Try common portrait filenames and keep initials visible if none load. */
  function initProfileImage() {
    const image = document.querySelector('#profile-image');
    const candidates = ['assets/profile.jpg', 'assets/profile.jpeg', 'assets/profile.png', 'assets/profile.webp'];
    let candidateIndex = 0;

    function tryNextImage() {
      candidateIndex += 1;
      if (candidateIndex < candidates.length) image.src = candidates[candidateIndex];
    }

    image.addEventListener('load', () => image.classList.add('is-loaded'));
    image.addEventListener('error', tryNextImage);
    if (image.complete) {
      if (image.naturalWidth > 0) image.classList.add('is-loaded');
      else tryNextImage();
    }
  }

  /* Show the back-to-top control after the hero leaves view. */
  function initBackToTop() {
    const button = document.querySelector('#back-to-top');
    const hero = document.querySelector('.hero');
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      button.classList.toggle('is-visible', !entries[0].isIntersecting);
    });
    observer.observe(hero);
  }

  /* Update the page reading progress in one animation frame per scroll. */
  function initScrollProgress() {
    const progress = document.querySelector('#scroll-progress');
    let ticking = false;
    function update() {
      const distance = root.scrollHeight - window.innerHeight;
      const fraction = distance > 0 ? Math.min(window.scrollY / distance, 1) : 0;
      progress.style.transform = `scaleX(${fraction})`;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* Remove the brief opening screen even if an external asset is slow. */
  function initLoader() {
    const loader = document.querySelector('#page-loader');
    const hide = () => loader.classList.add('is-hidden');
    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide, { once: true });
    window.setTimeout(hide, 1600);
  }

  /* Keep the displayed age current after each birthday. */
  function initAge() {
    const birthDate = new Date(2003, 6, 13);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age -= 1;
    document.querySelector('#current-age').textContent = age;
  }

  root.classList.add('js-ready');
  document.querySelector('#current-year').textContent = new Date().getFullYear();
  initAge();
  initTheme();
  initNavigation();
  initReveal();
  initProjectFilter();
  initProfileImage();
  initBackToTop();
  initScrollProgress();
  initLoader();
})();
