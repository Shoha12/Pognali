const filterBar = () => {
  const titles = document.querySelectorAll('.companions-sidebar__group-title');
  const buttons = document.querySelectorAll('.companions-sidebar__transport-button');

  titles.forEach(title => {
    title.addEventListener('click', () => {
      const group = title.closest('.companions-sidebar__group');
      group.classList.toggle('is-open');
    });
  });

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-active');
    });
  });
}


export default filterBar;