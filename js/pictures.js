import {openFullSizePicture} from './full-size-pictures.js';

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '20';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.color = 'red';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureFragment = document.createDocumentFragment();

const clearPictures = () => {
  const pictures = pictureList.querySelectorAll('.picture');

  if (!pictures) {
    return;
  }

  for (let i = pictures.length - 1; i >= 0; i--) {
    pictures[i].remove();
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

  pictureList.addEventListener('click', openFullSizePicture);

  pictureList.append(pictureFragment);

  return pictureList;
};

export {createPictureCards, pictureList, showAlert};
