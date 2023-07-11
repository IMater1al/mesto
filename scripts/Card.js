import { openPopup, previewPopup, popupPreviewImage, popupPreviewText } from './index.js';

class Card {
  constructor(name, link, templateSelector) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
  }

  createCard() {
    const cardTemplate = document.querySelector(this.templateSelector).content;
    const cardElement = cardTemplate.querySelector('.photo-gallery__item').cloneNode(true);
    const cardImageElement = cardElement.querySelector('.photo-gallery__image');
    cardImageElement.src = this.link;
    cardImageElement.alt = this.name;

    cardElement.querySelector('.photo-gallery__name').textContent = this.name;

    this._setEventListeners(cardElement, cardImageElement);

    return cardElement;
  }

  _setEventListeners(cardElement, cardImageElement) {
    this._setLikeListener(cardElement);
    this._setRemoveListener(cardElement);
    this._setCardListener(cardImageElement);
  }

  _setLikeListener(cardElement) {
    const likeButton = cardElement.querySelector('.photo-gallery__like');

    function addLike(evt) {
      evt.target.classList.toggle('photo-gallery__like_active');
    }

    likeButton.addEventListener('click', addLike);
  }

  _setRemoveListener(cardElement) {
    const rmButton = cardElement.querySelector('.photo-gallery__remove');

    function removeCard(card) {
      card.remove();
    }

    rmButton.addEventListener('click', () => {
      removeCard(cardElement);
    });
  }

  _setCardListener(cardImageElement) {
    cardImageElement.addEventListener('click', () => {
      openPopup(previewPopup);
      popupPreviewImage.src = this.link;
      popupPreviewImage.alt = this.name;
      popupPreviewText.textContent = this.name;
    });
  }
}

export { Card };
