import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.popupImage = this._popup.querySelector('.popup__preview-image');
    this.popupText = this._popup.querySelector('.popup__preview-text');
  }

  open(imageTitle, imageLink) {
    super.open();
    this.popupImage.src = imageLink;
    this.popupImage.alt = imageTitle;
    this.popupText.textContent = imageTitle;
  }
}
