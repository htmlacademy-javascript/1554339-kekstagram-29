import {openFullSizePicture} from './full-size-pictures.js';

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertElement = document.createElement('div');
  alertElement.style.position = 'absolute';
  alertElement.style.zIndex = '20';
  alertElement.style.left = '0';
  alertElement.style.top = '0';
  alertElement.style.right = '0';
  alertElement.style.color = 'red';
  alertElement.style.fontSize = '30px';
  alertElement.style.textAlign = 'center';
  alertElement.textContent = message;
  document.body.append(alertElement);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

const pictureListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureFragment = document.createDocumentFragment();

const clearPictures = () => {
  const pictureElements = pictureListElement.querySelectorAll('.picture');

  if (!pictureElements) {
    return;
  }

  for (let i = pictureElements.length - 1; i >= 0; i--) {
    pictureElements[i].remove();
  }
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

  clearPictures();

  pictureListElement.addEventListener('click', openFullSizePicture);

  pictureListElement.append(pictureFragment);

  return pictureListElement;
};

export {createPictureCards, pictureListElement, showAlert};
