import { isEscapeKey } from './util.js';
import { openModal } from './forms.js';
import { editImage } from './edit-image.js';
import { getData } from './api.js';

const data = await getData();
const fullSizePictureContainer = document.querySelector('.big-picture');
const fullSizePictureButtonClose = fullSizePictureContainer.querySelector('.big-picture__cancel');
const fullSizePicture = fullSizePictureContainer.querySelector('.big-picture__img img');
const fullSizePictureDiscription = fullSizePictureContainer.querySelector('.social__caption');
const fullSizePictureLikes = fullSizePictureContainer.querySelector('.likes-count');
const fullSizePictureDisplayedCommentCount = fullSizePictureContainer.querySelector('.comments-count');
const fullSizePictureCommentList = fullSizePictureContainer.querySelector('.social__comments');
const fullSizePictureCommentTemplate = fullSizePictureContainer.querySelector('.social__comment');
const fullSizePictureCommentCount = fullSizePictureContainer.querySelector('.social__comment-count');
const fullSizePictureCommentLoader = fullSizePictureContainer.querySelector('.comments-loader');
const UPLOAD_COMMENTS_BY_CLICK = 5;

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
  fullSizePictureCommentLoader.classList.remove('hidden');
});

const getComments = (commentsList, commentsListStart, commentsListEnd) => {

  const commentFragment = document.createDocumentFragment();
  const newCommentsList = commentsList.slice(commentsListStart, commentsListEnd);

  newCommentsList.forEach((comment) => {
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

const loadCommentsDescribe = (commentsList, commentsListStart, commentsListEnd, commentsCount) => {
  getComments(commentsList, commentsListStart, commentsListEnd);
  fullSizePictureCommentCount.innerHTML = `${Math.min(commentsListEnd, commentsCount)} из ${fullSizePictureDisplayedCommentCount.textContent} комментариев`;
};

const loadComments = (object, length) => {
  fullSizePictureCommentList.innerHTML = '';
  const commentsList = object.comments;
  const commentsListStart = 0;
  let commentsListEnd = UPLOAD_COMMENTS_BY_CLICK;

  loadCommentsDescribe(commentsList, commentsListStart, commentsListEnd, length);
  if (commentsListEnd >= length) {
    fullSizePictureCommentLoader.classList.add('hidden');
  }

  let countClick = 1;

  fullSizePictureCommentLoader.addEventListener('click', () => {
    countClick += 1;
    fullSizePictureCommentList.innerHTML = '';
    commentsListEnd += UPLOAD_COMMENTS_BY_CLICK;
    loadCommentsDescribe(commentsList, commentsListStart, commentsListEnd, length);

    if (countClick * 5 >= length) {
      fullSizePictureCommentLoader.classList.add('hidden');
      countClick = 1;
      commentsListEnd = UPLOAD_COMMENTS_BY_CLICK;
    } else {
      fullSizePictureCommentLoader.classList.remove('hidden');
    }
  });
};

const openFullSizePicture = (evt) => {

  if (evt.target.matches('.picture__img')) {
    fullSizePictureContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);

    fullSizePicture.src = evt.target.src;
    fullSizePictureDiscription.textContent = evt.target.alt;
    fullSizePictureLikes.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    fullSizePictureDisplayedCommentCount.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    const objectArray = data.find((object) => object.id === Number(evt.target.id));
    loadComments(objectArray, objectArray.comments.length);
  }

  if (evt.target.matches('.img-upload__input')) {
    evt.target.addEventListener('change', openModal);
    editImage();
  }
};

export { openFullSizePicture };
