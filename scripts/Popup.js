export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_visible');
    this._handleEscClose();
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_visible');
  }

  _closePopupByClick(evt) {
    if (evt.target.classList.contains('popup__close-button') || evt.target == evt.currentTarget) {
      this.close();
    }
  }

  _setCloseOnEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleEscClose() {
    document.addEventListener('keydown', this._setCloseOnEsc.bind(this), { once: true });
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupByClick.bind(this));
  }
}
