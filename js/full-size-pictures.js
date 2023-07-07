import { isEscapeKey } from './util.js';

const fullSizePictureContainer = document.querySelector('.big-picture');
const fullSizePictureButtonClose = fullSizePictureContainer.querySelector('.big-picture__cancel');
const fullSizePicture = fullSizePictureContainer.querySelector('.big-picture__img img');
const fullSizePictureDiscription = fullSizePictureContainer.querySelector('.social__caption');
const fullSizePictureLikes = fullSizePictureContainer.querySelector('.likes-count');
const fullSizePictureComments = fullSizePictureContainer.querySelector('.comments-count');
const fullSizePictureCommentCount = fullSizePictureContainer.querySelector('.social__comment-count');
const fullSizePictureCommentLoader = fullSizePictureContainer.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    fullSizePictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const closeFullSizePicture = () => {
  fullSizePictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

fullSizePictureButtonClose.addEventListener('click', () => {
  closeFullSizePicture();
});

const openFullSizePicture = (evt) => {
  evt.preventDefault();

  if (evt.target.matches('.picture__img')) {
    fullSizePictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    fullSizePictureCommentCount.classList.add('hidden');
    fullSizePictureCommentLoader.classList.add('hidden');

    fullSizePicture.src = evt.target.src;
    fullSizePictureDiscription.textContent = evt.target.alt;
    fullSizePictureLikes.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    fullSizePictureComments.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
  }
};

export {openFullSizePicture};
