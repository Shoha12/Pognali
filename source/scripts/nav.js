export function initNavMenu() {
  const navList = document.querySelector('.nav__list');
  const openButton = document.querySelector('.nav__menu-button--open-icon');
  const closeButton = document.querySelector('.nav__menu-button--close-icon');

  if (!navList || !openButton || !closeButton) return;

  openButton.addEventListener('click', () => {
    navList.style.display = 'block';
    openButton.style.display = 'none';
    closeButton.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    navList.style.display = 'none';
    openButton.style.display = 'block';
    closeButton.style.display = 'none';
  });
}

