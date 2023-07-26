const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const hideMessage = () => {
  document.querySelector('.message').classList.add('hidden');
};

const onOutSideClick = (evt) => {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
};

const showMessage = (messageElem, closeButtonClass) => {
  body.append(messageElem);
  messageElem.classList.add('message');
  messageElem.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onOutSideClick);
  messageElem.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
