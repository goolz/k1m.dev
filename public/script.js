/**
 * Shared script for static pages.
 * Smooth scroll for in-page anchor links.
 * Mobile nav: hamburger toggle, close on link/backdrop/escape.
 */
(function () {
  // Smooth scroll for in-page anchors
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link || link.getAttribute('href') === '#') return;
    var id = link.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Mobile nav menu
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  var backdrop = document.getElementById('nav-backdrop');
  function openNav() {
    document.body.classList.add('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    document.body.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      if (document.body.classList.contains('nav-open')) closeNav();
      else openNav();
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) closeNav();
  });
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
  }
})();
