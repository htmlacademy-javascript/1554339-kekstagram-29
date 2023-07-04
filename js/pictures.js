import {openFullSizePicture} from './full-size-pictures.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureFragment = document.createDocumentFragment();

const clearPictureList = () => {
  pictureList.innerHTML = '';
};

const createPictureCards = (pictureCards) => {
  pictureCards.forEach(({url, description, like, comment}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = like;
    pictureElement.querySelector('.picture__likes').textContent = comment.length;
    pictureFragment.appendChild(pictureElement);
  });

  pictureList.append(pictureFragment);

  return pictureList;
};

pictureList.addEventListener('click', () => openFullSizePicture(pictureList));

export {createPictureCards, clearPictureList};
