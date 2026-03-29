const PARALLAX_SPEED = 0.18;

export function initAboutParallax() {
  const image = document.querySelector('.about__image');
  const section = document.querySelector('.about');
  if (!image || !section) {
    return;
  }

  const mqWide = window.matchMedia('(min-width: 768px)');
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  let ticking = false;

  function apply() {
    if (!mqWide.matches || mqReduce.matches) {
      image.style.transform = '';
      return;
    }
    const y = (window.scrollY - section.offsetTop) * PARALLAX_SPEED;
    image.style.transform = `translate3d(0, ${y}px, 0)`;
  }

  function onScroll() {
    if (ticking) {
      return;
    }
    ticking = true;
    requestAnimationFrame(() => {
      apply();
      ticking = false;
    });
  }

  function onPreferenceChange() {
    apply();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  mqWide.addEventListener('change', onPreferenceChange);
  mqReduce.addEventListener('change', onPreferenceChange);
  apply();
}
