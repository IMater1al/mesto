import { openPopup, previewPopup, popupPreviewImage, popupPreviewText } from './index.js';

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;

    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector('.photo-gallery__item').cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector('.photo-gallery__image');

    this._likeButton = this._cardElement.querySelector('.photo-gallery__like');
    this._rmButton = this._cardElement.querySelector('.photo-gallery__remove');
  }

  // Генерация карточки ------------------------------------------

  createCard() {
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardElement.querySelector('.photo-gallery__name').textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  // Установка слушателей ------------------------------------------

  _setEventListeners() {
    this._setLikeListener();
    this._setRemoveListener();
    this._setCardListener();
  }

  // Приватные методы для слушателей ---------------------------------
  _addLike(evt) {
    evt.target.classList.toggle('photo-gallery__like_active');
  }

  _removeCard() {
    this._cardElement.remove();
  }

  _showPreviewPopup() {
    openPopup(previewPopup);
    popupPreviewImage.src = this._link;
    popupPreviewImage.alt = this._name;
    popupPreviewText.textContent = this._name;
  }

  // Слушатели --------------------------------------------------------

  _setLikeListener() {
    this._likeButton.addEventListener('click', this._addLike);
  }

  _setRemoveListener() {
    this._rmButton.addEventListener('click', this._removeCard.bind(this));
  }

  _setCardListener() {
    this._cardImageElement.addEventListener('click', this._showPreviewPopup.bind(this));
  }
}

export { Card };
