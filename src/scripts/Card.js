class Card {
  constructor(name, link, templateSelector, handleCardClick, ownerId, userId) {
    this._name = name;
    this._link = link;
    this._ownerId = ownerId;
    this._userId = userId;
    this._templateSelector = templateSelector;

    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector('.photo-gallery__item').cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector('.photo-gallery__image');

    this._likeButton = this._cardElement.querySelector('.photo-gallery__like');
    this._rmButton = this._cardElement.querySelector('.photo-gallery__remove');

    this._handleCardClick = handleCardClick;
  }

  // Генерация карточки ------------------------------------------

  createCard() {
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardElement.querySelector('.photo-gallery__name').textContent = this._name;

    if (this._ownerId !== this._userId) {
      this._rmButton.style.display = 'none';
    }

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

  // Слушатели --------------------------------------------------------

  _setLikeListener() {
    this._likeButton.addEventListener('click', this._addLike);
  }

  _setRemoveListener() {
    this._rmButton.addEventListener('click', this._removeCard.bind(this));
  }

  _setCardListener() {
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export { Card };
