const alphabetFilter = () => {
  const filter = document.querySelector('.companions-filter');

  if (!filter) return;

  const tabs = filter.querySelectorAll('.companions-filter__tab-button');
  const regions = filter.querySelectorAll('[data-region-content]');
  const showAllBtn = filter.querySelector('.companions-filter__show');
  const closeBtn = filter.querySelector('.companions-filter__collapse');


  const setActiveLetter = (region, targetLetter) => {
    const letterButtons = region.querySelectorAll('[data-letter-button]');
    const groups = region.querySelectorAll('[data-letter-group]');

    letterButtons.forEach(btn => {
      btn.classList.toggle(
        'is-active',
        btn.dataset.letterButton === targetLetter
      );
    });

    groups.forEach(group => {
      group.classList.toggle(
        'is-active',
        group.dataset.letterGroup === targetLetter
      );
    });
  };

  const resetRegionToFirstLetter = (region) => {
    const firstBtn = region.querySelector('[data-letter-button]');
    if (!firstBtn) return;

    setActiveLetter(region, firstBtn.dataset.letterButton);
  };

  regions.forEach(region => {
    const letterButtons = region.querySelectorAll('[data-letter-button]');

    letterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        setActiveLetter(region, btn.dataset.letterButton);
      });
    });

    resetRegionToFirstLetter(region);
  });


  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.region;

      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      regions.forEach(region => {
        const isTarget = region.dataset.regionContent === target;

        region.classList.toggle('is-active', isTarget);

        if (isTarget) {
          resetRegionToFirstLetter(region);
        }
      });
    });
  });

  if (showAllBtn) {
    const text = showAllBtn.querySelector('.companions-filter__show-text');
    const icon = showAllBtn.querySelector('use');
    const svg = showAllBtn.querySelector('svg');

    showAllBtn.addEventListener('click', () => {
      const isExpanded = filter.classList.toggle('is-expanded');

      if (isExpanded) {
        text.textContent = 'Свернуть';
        icon.setAttribute('href', 'icons/stack.svg#menu-button-close');
        svg.classList.add('is-close');
      } else {
        text.textContent = 'Показать все';
        icon.setAttribute('href', 'icons/stack.svg#point');
        svg.classList.remove('is-close');
      }
    });
  }


  if (closeBtn && showAllBtn) {
    closeBtn.addEventListener('click', () => {
      filter.classList.remove('is-expanded');

      const text = showAllBtn.querySelector('.companions-filter__show-text');
      const icon = showAllBtn.querySelector('use');
      const svg = showAllBtn.querySelector('svg');

      text.textContent = 'Показать все';
      icon.setAttribute('href', 'icons/stack.svg#point');
      svg.classList.remove('is-close');
    });
  }
};

export default alphabetFilter;