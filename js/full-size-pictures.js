import { isEscapeKey } from './util.js';
import { objects } from './data.js';
import { openModal } from './forms.js';
import { editImage } from './edit-image.js';

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

const loadComments = (allComments) => {
  const commentsCount = allComments.comment.length;
  fullSizePictureCommentList.innerHTML = '';
  const commentsList = allComments.comment;
  const commentsListStart = 0;
  let commentsListEnd = UPLOAD_COMMENTS_BY_CLICK;

  loadCommentsDescribe(commentsList, commentsListStart, commentsListEnd, commentsCount);
  if (commentsListEnd >= commentsCount) {
    fullSizePictureCommentLoader.classList.add('hidden');
    commentsListEnd = UPLOAD_COMMENTS_BY_CLICK;
  }

  fullSizePictureCommentLoader.addEventListener('click', () => {
    fullSizePictureCommentList.innerHTML = '';
    commentsListEnd += UPLOAD_COMMENTS_BY_CLICK;
    loadCommentsDescribe(commentsList, commentsListStart, commentsListEnd, commentsCount);
    if (commentsListEnd >= commentsCount) {
      fullSizePictureCommentLoader.classList.add('hidden');
      commentsListEnd = UPLOAD_COMMENTS_BY_CLICK;
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
    loadComments(objects.find((object) => object.id === Number(evt.target.id)));
  }

  if (evt.target.matches('.img-upload__input')) {
    evt.target.addEventListener('change', openModal);
    editImage();
  }
};

export { openFullSizePicture };
