const progressBar = () => {
  const levels = document.querySelectorAll('.companion-card__level');

  levels.forEach((item) => {
    const value = Number(item.dataset.level);
    const progress = item.querySelector('.companion-card__level-progress');
    const radius = 28;
    const circumference = 2 * Math.PI * radius;

    let offset = circumference * (1 - value / 100);

    if (value > 0 && value < 100) {
      offset = Math.max(offset, 6);
    }

    progress.style.strokeDasharray = `${circumference}`;
    progress.style.strokeDashoffset = offset;
  });
};

export default progressBar;