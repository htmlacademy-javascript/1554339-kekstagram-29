import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { reset, editImage } from './edit-image.js';

const uploadPictureForm = document.querySelector('.img-upload__form');
const uploadPictureOverlay = uploadPictureForm.querySelector('.img-upload__overlay');
const closeButton = uploadPictureForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const descriptionField = uploadPictureForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const uploadImageField = uploadPictureForm.querySelector('.img-upload__input');
const uploadImagePreview = uploadPictureForm.querySelector('.img-upload__preview img');
const effectsPreview = uploadPictureForm.querySelectorAll('.effects__preview');

const hastagExp = /^#[a-zа-яë0-9]{1,19}$/i;
const HASHTAGS = 5;

const UPLOAD_FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

const SubmitButtonText = {
  SUBMITTING: 'Идет отправка',
  IDLE: 'ОПУБЛИКОВАТЬ',
};

const formPristine = new Pristine(uploadPictureForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'p', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__field-wrapper--error' // Класс для элемента с текстом ошибки
});

const checkValidHashtag = () => {
  const valueArray = hashtagsField.value.trim().split(' ').map((element) => element.toLowerCase());

  if (valueArray[0] === '') {
    return true;
  }

  return valueArray.every((element) => element.match(hastagExp));
};

formPristine.addValidator(hashtagsField, checkValidHashtag, 'введён невалидный хэш-тег');

const checkCountHashtag = () => {
  const string = hashtagsField.value.trim().split(' ').map((element) => element.toLowerCase());
  return (string.length <= HASHTAGS);
};

formPristine.addValidator(hashtagsField, checkCountHashtag, 'превышено количество хэш-тегов');

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

formPristine.addValidator(hashtagsField, checkUniqueHashtag, 'хэш-теги повторяются');

const openModal = () => {
  editImage();
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
  reset();
};

const onCloseButtonClick = () => closeModal();
closeButton.addEventListener('click', onCloseButtonClick);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  formPristine.validate();
};

uploadPictureForm.addEventListener('submit', onFormSubmit);

function onModalKeydown(evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagsField || document.activeElement === descriptionField)) {
    evt.preventDefault();
    closeModal();
  }
}

const showImagePreview = () => {
  const uploadedFile = uploadImageField.files[0];
  const isCorrectType = UPLOAD_FILE_TYPES.some((fileType) => uploadedFile.name.toLowerCase().endsWith(fileType));

  if (isCorrectType) {
    uploadImagePreview.src = URL.createObjectURL(uploadedFile);
    Array.from(effectsPreview).forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(uploadedFile)})`;
    });
  }
};

const onUploadFieldClick = () => showImagePreview();
uploadImageField.addEventListener('change', onUploadFieldClick);

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;

  if (isDisabled) {
    submitButton.textContent = SubmitButtonText.SUBMITTING;
  } else {
    submitButton.textContent = SubmitButtonText.IDLE;
  }
};

const setOnFormSubmit = (callback) => {
  uploadPictureForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = formPristine.validate();
    if(isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(uploadPictureForm));
      toggleSubmitButton();
    }
  });
};

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

export {openModal, formPristine};
