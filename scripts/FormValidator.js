class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._buttonEl = this._form.querySelector(this._settings.submitButtonSelector);
    this._inputElements = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
  }

  enableValidation() {
    this._isFormValid(this._inputElements, this._buttonEl);

    this._inputElements.forEach(inputEl => {
      inputEl.addEventListener('input', evt => {
        this._isInputValid(inputEl);
        this._isFormValid(this._inputElements, this._buttonEl);
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
    const errorEl = this._form.querySelector(`.${inputEl.id}-error`);

    inputEl.classList.add(this._settings.inputErrorClass);
    errorEl.classList.add(this._settings.errorClass);
    errorEl.textContent = errorMessage;
  }

  _hideError(inputEl) {
    const errorEl = this._form.querySelector(`.${inputEl.id}-error`);

    inputEl.classList.remove(this._settings.inputErrorClass);
    errorEl.classList.remove(this._settings.errorClass);
    errorEl.textContent = '';
  }

  _isFormValid() {
    if (this._hasAnyInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  _hasAnyInvalidInput() {
    return this._inputElements.some(inputEl => {
      return !inputEl.validity.valid;
    });
  }

  // Функции включения и отключения кнопок -------------------------------------------
  disableButton() {
    this._buttonEl.classList.add(this._settings.inactiveButtonClass);
    this._buttonEl.classList.remove(this._settings.buttonHoverEffectClass);
    this._buttonEl.setAttribute('disabled', true);
  }

  enableButton() {
    this._buttonEl.classList.remove(this._settings.inactiveButtonClass);
    this._buttonEl.classList.add(this._settings.buttonHoverEffectClass);
    this._buttonEl.removeAttribute('disabled');
  }
}

export { FormValidator };
