const alphabetFilter = () => {
  const filter = document.querySelector('.companions-filter');

  if (filter) {
    const tabs = filter.querySelectorAll('.companions-filter__tab-button');
    const regions = filter.querySelectorAll('[data-region-content]');
    const showAllBtn = filter.querySelector('.companions-filter__show');
    const closeBtn = filter.querySelector('.companions-filter__collapse');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.region;

        // кнопки
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        // контент
        regions.forEach(region => {
          region.classList.toggle(
            'is-active',
            region.dataset.regionContent === target
          );
        });
      });
    });

    if(showAllBtn) {
      showAllBtn.addEventListener('click', () => {
        filter.classList.add('is-expanded')
      })
    }

    if(closeBtn) {
      closeBtn.addEventListener('click', () => {
        filter.classList.remove('is-expanded')
      })
    }
  }
}

export default alphabetFilter;