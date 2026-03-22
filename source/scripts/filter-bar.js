const filterBar = () => {
  const mobile = window.matchMedia('(max-width: 767px)');
  const desktop = window.matchMedia('(min-width: 1024px)');

  const titles = document.querySelectorAll('.companions-sidebar__group-title');
  const buttons = document.querySelectorAll('.companions-sidebar__transport-button');

  const handleTitleClick = (e) => {
    const group = e.currentTarget.closest('.companions-sidebar__group');
    group.classList.toggle('is-open');
  };

  const handleButtonClick = (e) => {
    e.currentTarget.classList.toggle('is-active');
  };

  const shouldWork = () => mobile.matches || desktop.matches;

  titles.forEach((title) => {
    title.addEventListener('click', (e) => {
      if (!shouldWork()) return;
      handleTitleClick(e);
    });
  });

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (!shouldWork()) return;
      handleButtonClick(e);
    });
  });
};

export default filterBar;