const filterBar = () => {
  const media = window.matchMedia('(min-width: 1024px)');

  const titles = document.querySelectorAll('.companions-sidebar__group-title');
  const buttons = document.querySelectorAll('.companions-sidebar__transport-button');

  const init = () => {
    if (!media.matches) return;

    titles.forEach(title => {
      title.addEventListener('click', handleTitleClick);
    });

    buttons.forEach(btn => {
      btn.addEventListener('click', handleButtonClick);
    });
  };

  const handleTitleClick = (e) => {
    const group = e.currentTarget.closest('.companions-sidebar__group');
    group.classList.toggle('is-open');
  };

  const handleButtonClick = (e) => {
    e.currentTarget.classList.toggle('is-active');
  };

  init();
};

export default filterBar;