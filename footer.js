(function () {
  'use strict';

  var slot = document.getElementById('site-footer');
  if (!slot) return;

  var moonIcon = '<svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var sunIcon  = '<svg class="icon-sun"  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  slot.innerHTML = '<div class="wrap">'
    + '<div class="footer-upper">'
    + '  <div class="footer-brand">'
    + '    <img src="/script-logo.svg" alt="Rich Lim" class="footer-logo" />'
    + '    <p class="footer-seo">Rich Lim is a designer with a deep appreciation for nature specializing in product, branding, and marketing design.</p>'
    + '  </div>'
    + '  <div class="footer-actions">'
    + '    <nav class="footer-nav" aria-label="Footer links">'
    + '      <a href="https://instagram.com/rchlm" target="_blank" rel="noopener noreferrer">Instagram</a>'
    + '      <a href="https://dribbble.com/rchlm" target="_blank" rel="noopener noreferrer">Dribbble</a>'
    + '      <a href="https://linkedin.com/in/rchlm" target="_blank" rel="noopener noreferrer">LinkedIn</a>'
    + '      <a href="/richlim-resume-2026.pdf" download>Resume</a>'
    + '    </nav>'
    + '    <a href="mailto:richlim27@gmail.com" class="email-btn">Email me</a>'
    + '  </div>'
    + '</div>'
    + '<div class="footer-lower">'
    + '  <small class="footer-copy">© Rich Lim 2026</small>'
    + '  <div class="footer-lower-right">'
    + '    <small class="footer-locale">United States · <span id="footer-time" aria-live="polite"></span></small>'
    + '    <button class="theme-toggle footer-theme-toggle" aria-label="Switch to light mode" aria-pressed="false">'
    + '      ' + moonIcon
    + '      ' + sunIcon
    + '    </button>'
    + '  </div>'
    + '</div>'
    + '</div>';

  /* -- Arizona time -------------------------------------------------------- */
  function getArizonaTime() {
    return new Date().toLocaleString('en-US', {
      timeZone: 'America/Phoenix',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }) + ' MST';
  }

  (function tick() {
    var t = getArizonaTime();
    ['hero-time', 'footer-time'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = t;
    });
    setTimeout(tick, 60000 - (Date.now() % 60000));
  })();

  /* -- Theme toggle wiring ------------------------------------------------- */
  var footerThemeBtn = slot.querySelector('.footer-theme-toggle');
  if (footerThemeBtn && window.RL && window.RL.toggleTheme) {
    footerThemeBtn.addEventListener('click', function () {
      window.RL.toggleTheme();
    });
    window.RL.applyTheme(window.RL.getTheme());
  }
}());
