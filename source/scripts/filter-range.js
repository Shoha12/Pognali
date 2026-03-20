const filterRange = () => {
  const slider = document.querySelector('.companions-sidebar__slider');

  if (slider && typeof noUiSlider !== 'undefined') {
    const min = Number(slider.dataset.min);
    const max = Number(slider.dataset.max);
    const from = Number(slider.dataset.from);
    const to = Number(slider.dataset.to);

    const fromValue = document.querySelector('[data-from]');
    const toValue = document.querySelector('[data-to]');

    noUiSlider.create(slider, {
      start: [from, to],
      connect: true,
      step: 1,
      range: {
        min,
        max,
      },
    });

    slider.noUiSlider.on('update', (values) => {
      if (fromValue) {
        fromValue.textContent = Math.round(values[0]);
      }

      if (toValue) {
        toValue.textContent = Math.round(values[1]);
      }
    });
  }
}

export default filterRange;