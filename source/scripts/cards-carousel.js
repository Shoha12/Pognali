const AUTOPLAY_MS = 3000;
const DRAG_THRESHOLD_PX = 48;
/** Синхронно с $mobile-max в variables.scss */
const MOBILE_MEDIA = '(max-width: 767px)';

/**
 * @param {HTMLElement} root
 */
export function initCardsCarousel(root) {
  const viewport = root.querySelector('.cards__viewport');
  const list = root.querySelector('.cards__list');

  if (!viewport || !list) {
    return;
  }

  const items = () => Array.from(list.querySelectorAll('.cards__item'));

  /** Стартуем с центральной карточки (все три видны, акцент по центру списка) */
  let currentIndex = Math.min(1, Math.max(0, items().length - 1));
  let autoplayId = null;
  let isDragging = false;
  let startY = 0;
  let dragDeltaY = 0;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileMq = window.matchMedia(MOBILE_MEDIA);

  const ACCENT_CLASS = 'cards__item--accent';

  /** @type {AbortController | null} */
  let interactionAbort = null;

  /** @type {ResizeObserver | null} */
  let bleedObserver = null;

  function unbindInteractions() {
    if (bleedObserver) {
      bleedObserver.disconnect();
      bleedObserver = null;
    }
    if (interactionAbort) {
      interactionAbort.abort();
      interactionAbort = null;
    }
    stopAutoplay();
  }

  function updateAccent() {
    const els = items();
    const n = els.length;
    if (n === 0) {
      return;
    }

    const prevIdx = (currentIndex - 1 + n) % n;
    const nextIdx = (currentIndex + 1) % n;

    els.forEach((el, j) => {
      el.classList.toggle(ACCENT_CLASS, j === currentIndex);
      if (n === 3) {
        if (j === prevIdx) {
          el.style.order = '0';
        } else if (j === currentIndex) {
          el.style.order = '1';
        } else if (j === nextIdx) {
          el.style.order = '2';
        }
      } else {
        el.style.removeProperty('order');
      }
    });
  }

  function goToSlide(index) {
    const els = items();
    if (els.length === 0) {
      return;
    }
    const max = els.length - 1;
    let i = index;
    if (i < 0) {
      i = max;
    }
    if (i > max) {
      i = 0;
    }
    currentIndex = i;
    updateAccent();
  }

  function stopAutoplay() {
    if (autoplayId !== null) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function tickAutoplay() {
    const els = items();
    if (els.length <= 1) {
      return;
    }
    const next = (currentIndex + 1) % els.length;
    goToSlide(next);
  }

  function startAutoplay() {
    stopAutoplay();
    if (prefersReducedMotion || items().length <= 1) {
      return;
    }
    autoplayId = window.setInterval(tickAutoplay, AUTOPLAY_MS);
  }

  function scheduleAutoplayIfIdle() {
    if (!isDragging) {
      startAutoplay();
    }
  }

  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) {
      return;
    }
    stopAutoplay();
    isDragging = true;
    dragDeltaY = 0;
    viewport.classList.add('cards__viewport--dragging');
    startY = e.clientY;
    viewport.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isDragging) {
      return;
    }
    dragDeltaY = e.clientY - startY;
  }

  function onPointerUp(e) {
    if (!isDragging) {
      return;
    }
    isDragging = false;
    viewport.classList.remove('cards__viewport--dragging');
    try {
      viewport.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    const els = items();
    if (els.length > 1) {
      if (dragDeltaY < -DRAG_THRESHOLD_PX) {
        goToSlide(currentIndex + 1);
      } else if (dragDeltaY > DRAG_THRESHOLD_PX) {
        goToSlide(currentIndex - 1);
      }
    }

    scheduleAutoplayIfIdle();
  }

  function onPointerCancel(ev) {
    onPointerUp(ev);
  }

  function updateCardsBleedLeft() {
    if (mobileMq.matches) {
      root.style.removeProperty('--cards-bleed-left');
      return;
    }
    root.style.setProperty('--cards-bleed-left', `${root.getBoundingClientRect().left}px`);
  }

  function onResizeDesktop() {
    updateAccent();
    updateCardsBleedLeft();
  }

  function bindStaticMobile() {
    unbindInteractions();
    root.style.removeProperty('--cards-bleed-left');
    root.classList.add('cards--static-mobile');
    const els = items();
    els.forEach((el) => {
      el.classList.remove(ACCENT_CLASS);
      el.style.removeProperty('order');
    });
  }

  function bindCarousel() {
    unbindInteractions();
    root.classList.remove('cards--static-mobile');
    interactionAbort = new AbortController();
    const { signal } = interactionAbort;

    viewport.addEventListener('pointerdown', onPointerDown, { signal });
    viewport.addEventListener('pointermove', onPointerMove, { signal });
    viewport.addEventListener('pointerup', onPointerUp, { signal });
    viewport.addEventListener('pointercancel', onPointerCancel, { signal });
    window.addEventListener('resize', onResizeDesktop, { signal });

    goToSlide(currentIndex);
    scheduleAutoplayIfIdle();
    updateCardsBleedLeft();

    bleedObserver = new ResizeObserver(() => {
      updateCardsBleedLeft();
    });
    bleedObserver.observe(root);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!mobileMq.matches) {
          updateAccent();
          updateCardsBleedLeft();
        }
      });
    }
  }

  function applyMode() {
    if (mobileMq.matches) {
      bindStaticMobile();
      return;
    }
    bindCarousel();
  }

  mobileMq.addEventListener('change', applyMode);
  applyMode();
}

export function initAllCardsCarousels() {
  document.querySelectorAll('[data-cards-carousel]').forEach((el) => {
    if (el instanceof HTMLElement) {
      initCardsCarousel(el);
    }
  });
}
