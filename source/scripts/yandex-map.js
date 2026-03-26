const YANDEX_MAP_API_KEY = 'bcd385e7-7d30-4cbb-adb6-d091b049e0ad';

/** Центр и метка: широта, долгота (формат API 2.1) */
const MAP_CENTER = [59.93812, 30.324852];
const MAP_ZOOM = 17;

const MAP_MOBILE_MAX_WIDTH = 767;

const PIN_INNER_COLOR = '#182044';
const PIN_OUTER_COLOR = '#ffffff';

const PIN_DESKTOP = { outer: 56, inner: 24 };
const PIN_MOBILE = { outer: 41, inner: 17 };

function isMapMobileViewport() {
  return window.matchMedia(`(max-width: ${MAP_MOBILE_MAX_WIDTH}px)`).matches;
}

function getPinSizes() {
  return isMapMobileViewport() ? PIN_MOBILE : PIN_DESKTOP;
}

function createPinDataUri(outerDiameter, innerDiameter) {
  const rOuter = outerDiameter / 2;
  const rInner = innerDiameter / 2;
  const c = outerDiameter / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${outerDiameter}" height="${outerDiameter}" viewBox="0 0 ${outerDiameter} ${outerDiameter}"><circle cx="${c}" cy="${c}" r="${rOuter}" fill="${PIN_OUTER_COLOR}"/><circle cx="${c}" cy="${c}" r="${rInner}" fill="${PIN_INNER_COLOR}"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getPlacemarkIconOptions() {
  const { outer, inner } = getPinSizes();
  const half = outer / 2;
  return {
    iconLayout: 'default#image',
    iconImageHref: createPinDataUri(outer, inner),
    iconImageSize: [outer, outer],
    iconImageOffset: [-half, -half],
  };
}

function loadYandexMapsScript(apiKey) {
  if (window.ymaps) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Не удалось загрузить API Яндекс.Карт'));
    document.head.appendChild(script);
  });
}

function createMap(container) {
  const map = new window.ymaps.Map(container, {
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    controls: [],
  });

  const placemark = new window.ymaps.Placemark(
    MAP_CENTER,
    {
      balloonContent: 'ул. Большая Конюшенная, 19/8',
    },
    getPlacemarkIconOptions()
  );

  map.geoObjects.add(placemark);

  requestAnimationFrame(() => {
    map.container.fitToViewport();
  });

  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      map.container.fitToViewport();
      placemark.options.set(getPlacemarkIconOptions());
    }, 150);
  };
  window.addEventListener('resize', onResize);
}

export async function initYandexMap() {
  const container = document.getElementById('map-yandex');
  if (!container) {
    return;
  }

  if (YANDEX_MAP_API_KEY === 'YOUR_API_KEY') {
    console.warn(
      '[yandex-map] Замените YANDEX_MAP_API_KEY в source/scripts/yandex-map.js на ключ из кабинета разработчика.'
    );
    return;
  }

  try {
    await loadYandexMapsScript(YANDEX_MAP_API_KEY);
  } catch {
    return;
  }

  window.ymaps.ready(() => {
    createMap(container);
  });
}


