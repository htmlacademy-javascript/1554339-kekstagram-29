import {isEscapeKey} from './util.js';
import {clearPictureList} from './pictures.js';

const fullSizePicture = document.querySelector('.big-picture');
const fullSizePictureButtonClose = fullSizePicture.querySelector('.big-picture__cancel');
// const commentsList = fullSizePicture.querySelector('.social__comments');
// const commentTemplate = commentsList.querySelector('.social__comment');

const getFullSizePictureData = ({url, description, like, comment}) => {
  fullSizePicture.querySelector('.big-picture__img').querySelector('img').src = url;
  fullSizePicture.querySelector('.likes-count').textContent = like;
  fullSizePicture.querySelector('.comments-count').textContent = comment.length;
  fullSizePicture.querySelector('.social__caption').textContent = description;

  fullSizePicture.querySelector('.social__comment-count').classList.add('hidden');
  fullSizePicture.querySelector('.comments-loader').classList.add('hidden');
};

function closeFullSizePicture () {
  fullSizePicture.classList.add('hidden');
  // clearPictureList();
}

fullSizePictureButtonClose.addEventListener('click', () => {
  closeFullSizePicture();
});

function openFullSizePicture (pictureData) {
  fullSizePicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  getFullSizePictureData(pictureData);
}

export {openFullSizePicture};
