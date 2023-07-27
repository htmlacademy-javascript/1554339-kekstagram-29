const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

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

function hideMessage() {
  document.querySelector('.message').remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', onOutSideClick);
}

const showMessage = (elemMessage, closeButtonClass) => {
  bodyElement.append(elemMessage);
  elemMessage.classList.add('message');
  elemMessage.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.addEventListener('click', onOutSideClick);
  elemMessage.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
