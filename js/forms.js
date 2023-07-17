import { isEscapeKey } from './util.js';
// import { initEditImage } from './edit-image.js';
// initEditImage();
const uploadPictureForm = document.querySelector('.img-upload__form');
const uploadPictureOverlay = uploadPictureForm.querySelector('.img-upload__overlay');
const closeButton = uploadPictureForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const descriptionField = uploadPictureForm.querySelector('.text__description');

const hastagExp = /^#[a-zа-яë0-9]{1,19}$/i;
const HASHTAGS = 5;

const formPristine = new Pristine(uploadPictureForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  // errorClass: 'img-upload__field-wrapper--invalid', // Класс, обозначающий невалидное поле
  // successClass: 'img-upload__field-wrapper', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'p', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__field-wrapper--invalid' // Класс для элемента с текстом ошибки
});

const checkValidHashtag = () => {
  const valueArray = hashtagsField.value.trim().split(' ').map((element) => element.toLowerCase());

  if (valueArray[0] === '') {
    return true;
  }

  return valueArray.every((element) => element.match(hastagExp));
};

formPristine.addValidator(hashtagsField, checkValidHashtag, 'Невалидный хэш-тег');

const checkCountHashtag = () => {
  const string = hashtagsField.value.trim().split(' ').map((element) => element.toLowerCase());
  return (string.length <= HASHTAGS);
};

formPristine.addValidator(hashtagsField, checkCountHashtag, 'Максимум 5 хэш-тегов');

const checkUniqueHashtag = () => {
  const string = hashtagsField.value.trim().split(' ').map((element) => element.toLowerCase());
  if (string.length > 1) {
    for (let i = 1; i <= string.length; i++) {
      if (string[i] === string[i - 1]) {
        return false;
      }
    }
  }
  return true;
};

formPristine.addValidator(hashtagsField, checkUniqueHashtag, 'Хэш-теги не могут повторяться');

const openModal = () => {
  uploadPictureOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalKeydown);
};

const closeModal = () => {
  uploadPictureForm.reset();
  formPristine.reset();
  uploadPictureOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalKeydown);
};

const onCloseButtonClick = () => closeModal();

closeButton.addEventListener('click', onCloseButtonClick);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  formPristine.validate();
};

uploadPictureForm.addEventListener('submit', onFormSubmit);
// initEditImage();

function onModalKeydown(evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsField || document.activeElement === descriptionField)) {
    evt.preventDefault();
    closeModal();
  }
}

export {openModal, formPristine};
