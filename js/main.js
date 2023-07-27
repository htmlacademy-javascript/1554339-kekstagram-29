import { createPictureCards, showAlert } from './pictures.js';
import { getData } from './api.js';
import { setFilters, onFilterClick } from './sorting.js';
import { debounce } from './util.js';

try {
  const data = await getData();
  setFilters(debounce(() => onFilterClick(data)));
  createPictureCards(data);
} catch (err) {
  showAlert(err.message);
}
