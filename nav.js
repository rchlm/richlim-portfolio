(function () {
  'use strict';

  /* -- Theme management ---------------------------------------------------- */
  var STORAGE_KEY = 'rl-theme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-label',
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    });
  }

  function toggleTheme() {
    var next = getTheme() === 'light' ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  window.RL = window.RL || {};
  window.RL.toggleTheme = toggleTheme;
  window.RL.applyTheme  = applyTheme;
  window.RL.getTheme    = getTheme;

  /* -- Nav HTML ------------------------------------------------------------ */
  var slot = document.getElementById('site-header');
  if (!slot) return;

  var path = window.location.pathname.replace(/\/+$/, '') || '/';

  function cur(href) {
    return path === href ? ' aria-current="page"' : '';
  }

  var moonIcon = '<svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var sunIcon  = '<svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  slot.innerHTML = '<div class="wrap">'
    + '<nav class="nav-inner" aria-label="Primary navigation">'
    + '<a href="/" class="wordmark" aria-label="Rich Lim - home">'
    + '<img src="/script-logo.svg" alt="Rich Lim" /></a>'
    + '<ul class="nav-links" id="nav-menu" role="list">'
    + '<li><a href="/"' + cur('/') + '>Work</a></li>'
    + '<li><a href="/info"' + cur('/info') + '>Info</a></li>'
    + '<li class="nav-ext-secondary">'
    + '<a href="https://www.linkedin.com/in/rchlm" target="_blank" rel="noopener noreferrer" aria-label="Rich Lim on LinkedIn (opens in new tab)">LinkedIn</a>'
    + '</li>'
    + '<li class="nav-ext-secondary">'
    + '<a href="/richlim-resume-2026.pdf" target="_blank" rel="noopener noreferrer" aria-label="Rich Lim resume PDF (opens in new tab)">Resume</a>'
    + '</li>'
    + '<li class="nav-email-overlay">'
    + '<a href="mailto:richlim27@gmail.com" class="nav-cta" aria-label="Email Rich Lim">Email</a>'
    + '</li>'
    + '</ul>'
    + '<div class="nav-right">'
    + '<button class="theme-toggle nav-theme-toggle" aria-label="Switch to light mode" aria-pressed="false">'
    + moonIcon + sunIcon
    + '</button>'
    + '<a href="mailto:richlim27@gmail.com" class="nav-cta nav-email-desktop" aria-label="Email Rich Lim">Email</a>'
    + '<button class="nav-toggle" aria-expanded="false" aria-label="Toggle navigation" aria-controls="nav-menu">'
    + '<span class="hamburger-line"></span>'
    + '<span class="hamburger-line"></span>'
    + '<span class="hamburger-line"></span>'
    + '</button>'
    + '</div>'
    + '</nav>'
    + '</div>';

  /* -- Mobile nav toggle --------------------------------------------------- */
  var toggle  = slot.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (toggle && navMenu) {
    toggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-is-open', isOpen);
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-is-open');
      });
    });
  }

  /* -- Theme toggle wiring ------------------------------------------------- */
  var navThemeBtn = slot.querySelector('.nav-theme-toggle');
  if (navThemeBtn) {
    navThemeBtn.addEventListener('click', function () {
      window.RL.toggleTheme();
    });
  }

  applyTheme(getTheme());
}());
