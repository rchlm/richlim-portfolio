(function () {
  'use strict';

  var slot = document.getElementById('site-footer');
  if (!slot) return;

  slot.innerHTML = [
    '<div class="wrap">',
    '  <div class="footer-upper">',
    '    <div class="footer-brand">',
    '      <img src="/script-logo.svg" alt="Rich Lim" class="footer-logo" />',
    '      <p class="footer-seo">Rich Lim is a designer with a deep appreciation for nature specializing in product, branding, and marketing design.</p>',
    '    </div>',
    '    <div class="footer-actions">',
    '      <nav class="footer-nav" aria-label="Footer links">',
    '        <a href="https://instagram.com/rchlm" target="_blank" rel="noopener noreferrer">Instagram</a>',
    '        <a href="https://dribbble.com/rchlm" target="_blank" rel="noopener noreferrer">Dribbble</a>',
    '        <a href="https://linkedin.com/in/rchlm" target="_blank" rel="noopener noreferrer">LinkedIn</a>',
    '        <a href="/richlim-resume-2026.pdf" download>Resume</a>',
    '      </nav>',
    '      <a href="mailto:richlim27@gmail.com" class="email-btn">Email me</a>',
    '    </div>',
    '  </div>',
    '  <div class="footer-lower">',
    '    <small class="footer-copy">© Rich Lim 2026</small>',
    '    <small class="footer-locale">United States · <span id="footer-time" aria-live="polite"></span></small>',
    '  </div>',
    '</div>'
  ].join('\n');

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
}());
