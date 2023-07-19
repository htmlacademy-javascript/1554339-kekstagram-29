import {openFullSizePicture} from './full-size-pictures.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureFragment = document.createDocumentFragment();

const clearPictureList = () => {
  pictureList.innerHTML = '';
};

const createPictureCards = (data) => {
  data.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__img').id = id;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureFragment.appendChild(pictureElement);
  });


  pictureList.addEventListener('click', openFullSizePicture);

  pictureList.append(pictureFragment);

  return pictureList;
};

try {
  const data = await getData();
  createPictureCards(data);
} catch (err) {
  showAlert(err.message);
}

export {createPictureCards, clearPictureList, pictureList};
