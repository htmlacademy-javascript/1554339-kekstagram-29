import { createPictureCards, showAlert } from './pictures.js';
import { getData } from './api.js';
import { setFilters, onFilterClick } from './sorting.js';
import { debaunce } from './util.js';

try {
  const data = await getData();
  setFilters(debaunce(() => onFilterClick(data)));
  createPictureCards(data);
} catch (err) {
  showAlert(err.message);
}
