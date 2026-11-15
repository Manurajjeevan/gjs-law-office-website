const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('is-open', !open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealItems = document.querySelectorAll('.intro-grid, .numbers-row, .practice-heading, .practice-card, .people-heading, .people-card, .quote-mark, .quote-section blockquote, .contact-content');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.13 });
  revealItems.forEach((item) => {
    item.setAttribute('data-reveal', '');
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();
const dialog = document.querySelector('.contact-dialog');
const form = document.getElementById('inquiry-form');
const success = document.querySelector('.form-success');
document.querySelectorAll('.js-contact').forEach((button) => button.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-done').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.hidden = true;
  document.querySelector('.form-note').hidden = true;
  success.hidden = false;
});
dialog.addEventListener('close', () => {
  if (!form.hidden) return;
  form.hidden = false;
  document.querySelector('.form-note').hidden = false;
  success.hidden = true;
  form.reset();
});
