import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._submitButton = this._popup.querySelector('button[type="submit"]');
    this._submitButtonTxt = this._submitButton.textContent;
    this._form = this._popup.querySelector('form');
  }

  setData(data) {
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitCallback(this._data);
    });
  }
}
