import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(imageTitle, imageLink, popupSelector) {
    super(popupSelector);
    this._imageLink = imageLink;
    this._imageTitle = imageTitle;
    this.popupImage = this._popup.querySelector('.popup__preview-image');
    this.popupText = this._popup.querySelector('.popup__preview-text');
  }

  open() {
    super.open();
    this.popupImage.src = this._imageLink;
    this.popupImage.alt = this._imageTitle;
    this.popupText.textContent = this._imageTitle;
  }
}
