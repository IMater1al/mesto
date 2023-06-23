function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));

  forms.forEach(form => {
    setEventListeners(form);
  });

  function setEventListeners(form) {
    const inputElements = Array.from(form.querySelectorAll(settings.inputSelector));
    const buttonEl = form.querySelector(settings.submitButtonSelector);
    isFormValid(inputElements, buttonEl);
    inputElements.forEach(inputEl => {
      inputEl.addEventListener('input', evt => {
        isInputValid(form, inputEl);
        isFormValid(inputElements, buttonEl);
      });
    });
  }

  function isInputValid(form, inputEl) {
    if (!inputEl.validity.valid) {
      showError(form, inputEl, inputEl.validationMessage);
    } else {
      hideError(form, inputEl);
    }
  }

  function showError(form, inputEl, errorMessage) {
    const errorEl = form.querySelector(`.${inputEl.id}-error`);

    inputEl.classList.add(settings.inputErrorClass);
    errorEl.classList.add(settings.errorClass);
    errorEl.textContent = errorMessage;
  }

  function hideError(form, inputEl) {
    const errorEl = form.querySelector(`.${inputEl.id}-error`);

    inputEl.classList.remove(settings.inputErrorClass);
    errorEl.classList.remove(settings.errorClass);
    errorEl.textContent = '';
  }

  function isFormValid(inputElements, buttonEl) {
    if (hasAnyInvalidInput(inputElements)) {
      buttonEl.classList.add(settings.inactiveButtonClass);
      buttonEl.setAttribute('disabled', true);
    } else {
      buttonEl.classList.remove(settings.inactiveButtonClass);
      buttonEl.removeAttribute('disabled');
    }
  }

  function hasAnyInvalidInput(inputElements) {
    return Array.from(inputElements).some(inputEl => {
      return !inputEl.validity.valid;
    });
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
