const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');
const loader = document.querySelector('.site-loader');
const cursorAura = document.querySelector('.cursor-aura');

const hideLoader = () => window.setTimeout(() => loader?.classList.add('is-hidden'), 240);
if (document.readyState === 'complete') hideLoader();
else window.addEventListener('load', hideLoader, { once: true });
window.setTimeout(hideLoader, 2600);
document.querySelector('#copyright-year')?.replaceChildren(String(new Date().getFullYear()));

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 28);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (cursorAura && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(() => {
      cursorAura.style.transform = `translate3d(${pointerX - 160}px, ${pointerY - 160}px, 0)`;
      document.body.classList.add('has-pointer');
      pointerFrame = 0;
    });
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => document.body.classList.remove('has-pointer'));
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  nav?.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealItems = document.querySelectorAll(
  '.intro-grid, .numbers-row, .practice-heading, .practice-card, .people-heading, .people-card, .profile-layout, .insights-content'
);

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

