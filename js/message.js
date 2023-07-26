const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

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
  body.removeEventListener('click', onOutSideClick);
}

const showMessage = (elemMessage, closeButtonClass) => {
  body.append(elemMessage);
  elemMessage.classList.add('message');
  elemMessage.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onOutSideClick);
  elemMessage.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
