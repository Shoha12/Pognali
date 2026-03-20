/* в этот файл добавляет скрипты*/

import { initNavMenu } from './nav.js';
import progressBar from './progress-bar.js';
import filterBar from './filter-bar.js';
import filterRange from './filter-range.js';
import alphabetFilter from './alphabet-filter.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavMenu();
  progressBar();
  filterBar();
  filterRange();
  alphabetFilter();
});
