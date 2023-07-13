import {openFullSizePicture} from './full-size-pictures.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureFragment = document.createDocumentFragment();

const clearPictureList = () => {
  pictureList.innerHTML = '';
};

const createPictureCards = (pictureCards) => {
  pictureCards.forEach(({id, url, description, like, comment}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__img').id = id;
    pictureElement.querySelector('.picture__comments').textContent = comment.length;
    pictureElement.querySelector('.picture__likes').textContent = like;
    pictureFragment.appendChild(pictureElement);
  });


  pictureList.addEventListener('click', openFullSizePicture);

  pictureList.append(pictureFragment);

  return pictureList;
};

export {createPictureCards, clearPictureList, pictureList};
