import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(formSubmitCallback, popupSelector, userInfoObject) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('form');
    this._inputs = Array.from(this._form.querySelectorAll('input'));
    this._userInfo = userInfoObject.getUserInfo();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _setInputValues() {
    this._inputs[0].value = this._userInfo.name;
    this._inputs[1].value = this._userInfo.activity;
  }

  open() {
    super.open();
    if (this._form.name === 'popupEditForm') {
      this._setInputValues();
    }
  }

  close() {
    super.close();
    if (this._form.name === 'popupAddForm') {
      this._form.reset();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._formSubmitCallback);
  }
}
