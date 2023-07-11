import { isEscapeKey } from './util.js';
import {objects} from './data.js';

const fullSizePictureContainer = document.querySelector('.big-picture');
const fullSizePictureButtonClose = fullSizePictureContainer.querySelector('.big-picture__cancel');
const fullSizePicture = fullSizePictureContainer.querySelector('.big-picture__img img');
const fullSizePictureDiscription = fullSizePictureContainer.querySelector('.social__caption');
const fullSizePictureLikes = fullSizePictureContainer.querySelector('.likes-count');
const fullSizePictureCommentList = fullSizePictureContainer.querySelector('.social__comments');
const fullSizePictureCommentTemplate = fullSizePictureContainer.querySelector('.social__comment');
const fullSizePictureDisplayedCommentCount = fullSizePictureContainer.querySelector('.comments-count');
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

const getComments = (picture) => {
  fullSizePictureCommentList.innerHTML = '';
  const commentsList = picture.comment;

  const commentFragment = document.createDocumentFragment();

  commentsList.forEach((comment) => {
    const oneMoreComment = fullSizePictureCommentTemplate.cloneNode(true);
    const commentAvatar = oneMoreComment.querySelector('.social__picture');
    const commentMessage = oneMoreComment.querySelector('.social__text');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentMessage.textContent = comment.message;


    commentFragment.append(oneMoreComment);
  });

  fullSizePictureCommentList.append(commentFragment);
};

const openFullSizePicture = (evt) => {
  if (evt.target.matches('.picture__img')) {
    fullSizePictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    fullSizePictureCommentCount.classList.add('hidden');
    fullSizePictureCommentLoader.classList.add('hidden');

    fullSizePicture.src = evt.target.src;
    fullSizePictureDiscription.textContent = evt.target.alt;
    fullSizePictureLikes.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    fullSizePictureDisplayedCommentCount.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    getComments(objects.find((object) => object.id === Number(evt.target.id)));
  }
};

export {openFullSizePicture};
