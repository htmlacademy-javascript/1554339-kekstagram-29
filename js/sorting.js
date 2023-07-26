import { createPictureCards } from './pictures.js';
import { getRandomInteger } from './util.js';

const MAX_RANDOM_CARDS = 10;
const FiltersList = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');

let filterButton;

const changeActiveFilter = (choisenFilter) => {
  const activeFilter = filters.querySelector('.img-filters__button--active');

  if (choisenFilter !== activeFilter) {
    activeFilter.classList.remove('img-filters__button--active');
    choisenFilter.classList.add('img-filters__button--active');
  }
};

const onFilterDefaultClick = (data) => {
  createPictureCards(data);
};

const onFilterRandomClick = (data) => {
  const randomCards = data
    .slice()
    .sort(() => getRandomInteger(0, data.length) - getRandomInteger(0, data.length))
    .slice(0, MAX_RANDOM_CARDS);
  createPictureCards(randomCards);
};

const onFilterDiscussedClick = (data) => {
  const mostDiscussedPictures = data
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);
  createPictureCards(mostDiscussedPictures);
};

const onFilterClick = (data) => {
  if (filterButton.id.endsWith(FiltersList.DEFAULT)) {
    onFilterDefaultClick(data);
  } else if (filterButton.id.endsWith(FiltersList.RANDOM)) {
    onFilterRandomClick(data);
  } else if (filterButton.id.endsWith(FiltersList.DISCUSSED)) {
    onFilterDiscussedClick(data);
  }
};

const setFilters = (cb) => {
  filters.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    filterButton = evt.target;
    if (filterButton.classList.contains('img-filters__button')) {
      changeActiveFilter(filterButton);
      cb();
    }
  });
};

export { setFilters, onFilterClick};
