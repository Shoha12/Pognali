/* в этот файл добавляет скрипты*/

import { initNavMenu } from './nav.js';
import { initAllCardsCarousels } from './cards-carousel.js';
import progressBar from './progress-bar.js';
import filterBar from './filter-bar.js';
import filterRange from './filter-range.js';
import alphabetFilter from './alphabet-filter.js';
import { initYandexMap } from './yandex-map.js';
import { initProfileModal } from './modal.js';
import { initSubmitValidation } from './submit-validation.js';
import { initAboutParallax } from './about-parallax.js';

document.addEventListener('DOMContentLoaded', () => {
  initProfileModal();
  initNavMenu();
  initAllCardsCarousels();
  progressBar();
  filterBar();
  filterRange();
  alphabetFilter();
  initYandexMap();
  initSubmitValidation();
  initAboutParallax();
});
