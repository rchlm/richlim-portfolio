(function () {
  var slot = document.getElementById('prefooter');
  if (!slot) return;

  slot.innerHTML = [
    '<section class="contact-section" aria-label="Contact">',
    '  <div class="wrap">',
    '    <div class="contact-inner">',
    '      <h2 class="contact-hl">Have a project <span class="nowrap">worth <em>building?</em></span></h2>',
    '      <a href="mailto:richlim27@gmail.com" class="email-btn" aria-label="Email Rich Lim">',
    ‘        Let’s Chat’,
    '        <span class="arr" aria-hidden="true">↗</span>',
    '      </a>',
    '    </div>',
    '  </div>',
    '</section>'
  ].join('\n');

  // Invert custom cursor on cream background
  var dot     = document.querySelector('.cursor-dot');
  var ring    = document.querySelector('.cursor-ring');
  var section = slot.firstElementChild;
  if (dot && ring && section) {
    section.addEventListener('mouseenter', function () {
      dot.style.background   = '#1a1a1a';
      ring.style.borderColor = 'rgba(0,0,0,0.22)';
    });
    section.addEventListener('mouseleave', function () {
      dot.style.background   = '';
      ring.style.borderColor = '';
    });
  }
}());
