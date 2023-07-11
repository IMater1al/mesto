import { disableButton, enableButton } from '../scripts/index.js';

class FormValidator {
  constructor(settings, form) {
    this.settings = settings;
    this.form = form;
  }

  enableValidation() {
    const inputElements = Array.from(this.form.querySelectorAll(this.settings.inputSelector));
    const buttonEl = this.form.querySelector(this.settings.submitButtonSelector);

    this._isFormValid(inputElements, buttonEl);

    inputElements.forEach(inputEl => {
      inputEl.addEventListener('input', evt => {
        this._isInputValid(inputEl);
        this._isFormValid(inputElements, buttonEl);
      });
    });
  }

  _isInputValid(inputEl) {
    if (!inputEl.validity.valid) {
      this._showError(inputEl, inputEl.validationMessage);
    } else {
      this._hideError(inputEl);
    }
  }

  _showError(inputEl, errorMessage) {
    const errorEl = this.form.querySelector(`.${inputEl.id}-error`);

    inputEl.classList.add(this.settings.inputErrorClass);
    errorEl.classList.add(this.settings.errorClass);
    errorEl.textContent = errorMessage;
  }

  _hideError(inputEl) {
    const errorEl = this.form.querySelector(`.${inputEl.id}-error`);

    inputEl.classList.remove(this.settings.inputErrorClass);
    errorEl.classList.remove(this.settings.errorClass);
    errorEl.textContent = '';
  }

  _isFormValid(inputElements, buttonEl) {
    if (this._hasAnyInvalidInput(inputElements)) {
      disableButton(
        buttonEl,
        this.settings.inactiveButtonClass,
        this.settings.buttonHoverEffectClass
      );
    } else {
      enableButton(
        buttonEl,
        this.settings.inactiveButtonClass,
        this.settings.buttonHoverEffectClass
      );
    }
  }

  _hasAnyInvalidInput(inputElements) {
    return Array.from(inputElements).some(inputEl => {
      return !inputEl.validity.valid;
    });
  }
}

export { FormValidator, disableButton, enableButton };
