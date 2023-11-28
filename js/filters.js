import { renderThumbnails } from './thumbnail.js';
import { debounce } from './util.js';

const MAX_RANDOM_FILTER = 10;

const FiltersEnum = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const filterButtonsElement = filtersFormElement.querySelectorAll('button');
const pictureContainerElement = document.querySelector('.pictures');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [FiltersEnum.DEFAULT]: (data) => data,

  [FiltersEnum.RANDOM]: (data) => {
    const randomItems = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomItems.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomItems.includes(index)){
        randomItems.push(index);
      }
    }
    return randomItems.map((index) => data[index]);
  },

  [FiltersEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

let currentFilter = FiltersEnum.DEFAULT;

const repaint = (filter, data) => {
  if(currentFilter !== filter) {
    const filteredData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderThumbnails(filteredData, pictureContainerElement);

    currentFilter = filter;
  }
};

const debouncedRepaint = debounce(repaint);

const initFilters = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  filterButtonsElement.forEach((button) => {
    button.addEventListener('click', (event) => {
      const currentActiveElement = filtersFormElement.querySelector('.img-filters__button--active');
      currentActiveElement.classList.remove('img-filters__button--active');
      event.target.classList.add('img-filters__button--active');
      debouncedRepaint(event.target.id, data);
    });
  });
};

export { initFilters };
