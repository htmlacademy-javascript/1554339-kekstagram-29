import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { reset, editImage } from './edit-image.js';

const HASHTAG_EXP = /^#[a-zа-яë0-9]{1,19}$/i;
const HASHTAGS = 5;

const UPLOAD_FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

const SubmitButtonText = {
  SUBMITTING: 'Идет отправка',
  IDLE: 'ОПУБЛИКОВАТЬ',
};

const uploadPictureFormElement = document.querySelector('.img-upload__form');
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = uploadPictureFormElement.querySelector('.img-upload__cancel');
const hashtagsFieldElement = uploadPictureFormElement.querySelector('.text__hashtags');
const descriptionFieldElement = uploadPictureFormElement.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');
const uploadImageFieldElement = uploadPictureFormElement.querySelector('.img-upload__input');
const uploadImagePreviewElement = uploadPictureFormElement.querySelector('.img-upload__preview img');
const effectsPreviewElements = uploadPictureFormElement.querySelectorAll('.effects__preview');

const formPristine = new Pristine(uploadPictureFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const checkValidHashtag = () => {
  const valueArray = hashtagsFieldElement.value.trim().split(' ').map((element) => element.toLowerCase());

  if (valueArray[0] === '') {
    return true;
  }

  return valueArray.every((element) => element.match(HASHTAG_EXP));
};

const checkCountHashtag = () => {
  const string = hashtagsFieldElement.value.trim().split(' ').map((element) => element.toLowerCase());
  return (string.length <= HASHTAGS);
};

const checkUniqueHashtag = () => {
  const string = hashtagsFieldElement.value.trim().split(' ').map((element) => element.toLowerCase());
  if (string.length > 1) {
    for (let i = 1; i <= string.length; i++) {
      if (string[i] === string[i - 1]) {
        return false;
      }
    }
  }
  return true;
};

const closeModal = () => {
  uploadPictureFormElement.reset();
  formPristine.reset();
  uploadPictureOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalKeydown);
  reset();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  formPristine.validate();
};

function onModalKeydown(evt) {
  if (isEscapeKey(evt) && !(document.querySelector('.message')) && !(document.activeElement === hashtagsFieldElement || document.activeElement === descriptionFieldElement)) {
    evt.preventDefault();
    closeModal();
  }
}

const showImagePreview = () => {
  const uploadedFile = uploadImageFieldElement.files[0];
  const isCorrectType = UPLOAD_FILE_TYPES.some((fileType) => uploadedFile.name.toLowerCase().endsWith(fileType));

  if (isCorrectType) {
    uploadImagePreviewElement.src = URL.createObjectURL(uploadedFile);
    Array.from(effectsPreviewElements).forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(uploadedFile)})`;
    });
  }
};

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;

  if (isDisabled) {
    submitButtonElement.textContent = SubmitButtonText.SUBMITTING;
  } else {
    submitButtonElement.textContent = SubmitButtonText.IDLE;
  }
};

const openModal = () => {
  editImage();
  uploadPictureOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalKeydown);
};

const setOnFormSubmit = (callback) => {
  uploadPictureFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = formPristine.validate();
    if(isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(uploadPictureFormElement));
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

const onUploadFieldClick = () => showImagePreview();
const onCloseButtonClick = () => closeModal();

formPristine.addValidator(hashtagsFieldElement, checkUniqueHashtag, 'хэш-теги повторяются');
formPristine.addValidator(hashtagsFieldElement, checkValidHashtag, 'введён невалидный хэш-тег');
formPristine.addValidator(hashtagsFieldElement, checkCountHashtag, 'превышено количество хэш-тегов');

uploadPictureFormElement.addEventListener('submit', onFormSubmit);
uploadImageFieldElement.addEventListener('change', onUploadFieldClick);
closeButtonElement.addEventListener('click', onCloseButtonClick);

export { openModal, formPristine };
