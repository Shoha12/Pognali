export function initNavMenu() {
  const nav = document.querySelector('.nav');
  const navList = document.querySelector('.nav__list');
  const openButton = document.querySelector('.nav__menu-button--open-icon');
  const closeButton = document.querySelector('.nav__menu-button--close-icon');

  if (!nav || !navList || !openButton || !closeButton) return;

  openButton.addEventListener('click', () => {
    const scrollY = window.scrollY;
    nav.classList.add('nav--open');
    document.body.style.setProperty('top', `-${scrollY}px`);
  });

  closeButton.addEventListener('click', () => {
    const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
    nav.classList.remove('nav--open');
    document.body.style.removeProperty('top');
    window.scrollTo(0, scrollY);
  });
}

