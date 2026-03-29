const MODAL_OPEN_CLASS = 'is-open';
const BODY_LOCK_CLASS = 'modal-open';

export const initProfileModal = () => {
  const modal = document.querySelector('[data-modal="profile"]') || document.querySelector('.profile__modal');
  const openButton = document.querySelector('[data-modal-open="profile"]') || document.querySelector('.profile__link');
  let scrollY = 0;

  if (!modal || !openButton) {
    return;
  }

  const closeButton = modal.querySelector('.modal__button');

  const openModal = () => {
    scrollY = window.scrollY;
    modal.classList.add(MODAL_OPEN_CLASS);
    document.body.classList.add(BODY_LOCK_CLASS);
    document.documentElement.classList.add(BODY_LOCK_CLASS);
    document.body.style.top = `-${scrollY}px`;
  };

  const closeModal = () => {
    modal.classList.remove(MODAL_OPEN_CLASS);
    document.body.classList.remove(BODY_LOCK_CLASS);
    document.documentElement.classList.remove(BODY_LOCK_CLASS);
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
  };

  openButton.addEventListener('click', openModal);

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && modal.classList.contains(MODAL_OPEN_CLASS)) {
      closeModal();
    }
  });
};
