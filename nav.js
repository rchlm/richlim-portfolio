(function () {
  'use strict';

  var slot = document.getElementById('site-header');
  if (!slot) return;

  var path = window.location.pathname.replace(/\/+$/, '') || '/';

  function cur(href) {
    return path === href ? ' aria-current="page"' : '';
  }

  slot.innerHTML = [
    '<div class="wrap">',
    '  <nav class="nav-inner" aria-label="Primary navigation">',
    '    <a href="/" class="wordmark" aria-label="Rich Lim – home">',
    '      <img src="/script-logo.svg" alt="Rich Lim" />',
    '    </a>',
    '    <ul class="nav-links" id="nav-menu" role="list">',
    '      <li><a href="/"' + cur('/') + '>Work</a></li>',
    '      <li><a href="/info"' + cur('/info') + '>Info</a></li>',
    '      <li class="nav-ext-secondary">',
    '        <a href="https://www.linkedin.com/in/rchlm" target="_blank" rel="noopener noreferrer"',
    '           aria-label="Rich Lim on LinkedIn (opens in new tab)">',
    '          LinkedIn',
    '        </a>',
    '      </li>',
    '      <li class="nav-ext-secondary">',
    '        <a href="/richlim-resume-2026.pdf" target="_blank" rel="noopener noreferrer"',
    '           aria-label="Rich Lim’s resume PDF (opens in new tab)">',
    '          Resume',
    '        </a>',
    '      </li>',
    '      <li>',
    '        <a href="mailto:richlim27@gmail.com" class="nav-cta" aria-label="Email Rich Lim">Email</a>',
    '      </li>',
    '    </ul>',
    '    <button class="nav-toggle" aria-expanded="false" aria-label="Toggle navigation" aria-controls="nav-menu">',
    '      <span class="hamburger-line"></span>',
    '      <span class="hamburger-line"></span>',
    '      <span class="hamburger-line"></span>',
    '    </button>',
    '  </nav>',
    '</div>'
  ].join('\n');

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
}());
