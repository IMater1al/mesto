import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(formSubmitCallback, popupSelector) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('form');
    this._inputs = Array.from(this._form.querySelectorAll('input'));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(inputValues) {
    this._inputs.forEach(input => {
      input.value = inputValues[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      // evt.currentTarget.textContent = 'Сохранение...';
      evt.target.querySelector('button[type="submit"]').textContent = 'Сохранение...';
      this._formSubmitCallback(this._getInputValues(), evt);
    });
  }
}
