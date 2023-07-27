import { isEscapeKey } from './util.js';
import { openModal } from './forms.js';
import { getData } from './api.js';

const data = await getData();
const UPLOAD_COMMENTS_BY_CLICK = 5;

const fullSizePictureContainerElement = document.querySelector('.big-picture');
const fullSizePictureButtonCloseElement = fullSizePictureContainerElement.querySelector('.big-picture__cancel');
const fullSizePictureElement = fullSizePictureContainerElement.querySelector('.big-picture__img img');
const fullSizePictureDescriptionElement = fullSizePictureContainerElement.querySelector('.social__caption');
const fullSizePictureLikesElement = fullSizePictureContainerElement.querySelector('.likes-count');
const fullSizePictureDisplayedCommentCountElement = fullSizePictureContainerElement.querySelector('.comments-count');
const fullSizePictureCommentListElement = fullSizePictureContainerElement.querySelector('.social__comments');
const fullSizePictureCommentTemplate = fullSizePictureContainerElement.querySelector('.social__comment');
const fullSizePictureCommentCountElement = fullSizePictureContainerElement.querySelector('.social__comment-count');
const fullSizePictureCommentLoaderElement = fullSizePictureContainerElement.querySelector('.comments-loader');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    fullSizePictureContainerElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const closeFullSizePicture = () => {
  fullSizePictureContainerElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const getComments = (commentsList, commentsListStart, commentsListEnd) => {
  const commentFragment = document.createDocumentFragment();
  const newCommentsList = commentsList.slice(commentsListStart, commentsListEnd);

  newCommentsList.forEach((comment) => {
    const oneMoreCommentElement = fullSizePictureCommentTemplate.cloneNode(true);
    const commentAvatarElement = oneMoreCommentElement.querySelector('.social__picture');
    const commentMessageElement = oneMoreCommentElement.querySelector('.social__text');
    commentAvatarElement.src = comment.avatar;
    commentAvatarElement.alt = comment.name;
    commentMessageElement.textContent = comment.message;

    commentFragment.append(oneMoreCommentElement);
  });

  fullSizePictureCommentListElement.append(commentFragment);
};

const loadCommentsDescribe = (commentsList, commentsListStart, commentsListEnd, commentsCount) => {
  getComments(commentsList, commentsListStart, commentsListEnd);
  fullSizePictureCommentCountElement.innerHTML = `${Math.min(commentsListEnd, commentsCount)} из ${fullSizePictureDisplayedCommentCountElement.textContent} комментариев`;
};

const loadComments = (object, length) => {
  fullSizePictureCommentListElement.innerHTML = '';
  const commentsList = object.comments;
  const commentsListStart = 0;
  let commentsListEnd = UPLOAD_COMMENTS_BY_CLICK;

  loadCommentsDescribe(commentsList, commentsListStart, commentsListEnd, length);
  if (commentsListEnd >= length) {
    fullSizePictureCommentLoaderElement.classList.add('hidden');
  }

  let countClick = 1;

  fullSizePictureCommentLoaderElement.addEventListener('click', () => {
    countClick += 1;
    fullSizePictureCommentListElement.innerHTML = '';
    commentsListEnd += UPLOAD_COMMENTS_BY_CLICK;
    loadCommentsDescribe(commentsList, commentsListStart, commentsListEnd, length);

    if (countClick * 5 >= length) {
      fullSizePictureCommentLoaderElement.classList.add('hidden');
      countClick = 1;
      commentsListEnd = UPLOAD_COMMENTS_BY_CLICK;
    } else {
      fullSizePictureCommentLoaderElement.classList.remove('hidden');
    }
  });
};

const openFullSizePicture = (evt) => {
  if (evt.target.matches('.picture__img')) {
    fullSizePictureContainerElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);

    fullSizePictureElement.src = evt.target.src;
    fullSizePictureDescriptionElement.textContent = evt.target.alt;
    fullSizePictureLikesElement.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    fullSizePictureDisplayedCommentCountElement.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    const objectArray = data.find((object) => object.id === Number(evt.target.id));
    loadComments(objectArray, objectArray.comments.length);
  }

  if (evt.target.matches('.img-upload__input')) {
    evt.target.addEventListener('change', openModal);
  }
};

fullSizePictureButtonCloseElement.addEventListener('click', () => {
  closeFullSizePicture();
  fullSizePictureCommentLoaderElement.classList.remove('hidden');
});

export { openFullSizePicture };
