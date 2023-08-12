class Card {
  constructor({
    name,
    link,
    templateSelector,
    handleCardClick,
    ownerId,
    userId,
    cardId,
    likes,
    setLikeRequest,
    removeLikeRequest,
    confirmPopup
  }) {
    this._name = name;
    this._link = link;
    this._ownerId = ownerId;
    this._userId = userId;
    this._cardId = cardId;
    this._likes = likes.length;
    this._likesArray = likes;
    this._templateSelector = templateSelector;

    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector('.photo-gallery__item').cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector('.photo-gallery__image');

    this._likeButton = this._cardElement.querySelector('.photo-gallery__like-button');
    this._likeCounter = this._cardElement.querySelector('.photo-gallery__like-counter');
    this._rmButton = this._cardElement.querySelector('.photo-gallery__remove');

    // this._removeCardRequest = removeCardRequest;
    this._setLikeRequest = setLikeRequest;
    this._removeLikeRequest = removeLikeRequest;

    this._confirmPopup = confirmPopup;

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

    this._likesArray.forEach(like => {
      if (like._id === this._userId) {
        this._addLike();
      }
    });

    this._setLikesText(this._likes);
    this._setEventListeners();

    return this._cardElement;
  }

  // Установка слушателей ------------------------------------------

  _setEventListeners() {
    this._setLikeListener();
    this._setRemoveListener();
    this._setCardListener();
  }

  // Приватные методы

  _setLikesText(likes) {
    this._likeCounter.textContent = likes;
  }

  // Приватные методы для слушателей ---------------------------------

  _checkLikeState(evt) {
    if (evt.target.classList.contains('photo-gallery__like-button_active')) {
      this._removeLikeRequest(this._cardId)
        .then(res => {
          this._setLikesText(res.likes.length);
          this._removeLike();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this._setLikeRequest(this._cardId)
        .then(res => {
          this._setLikesText(res.likes.length);
          this._addLike();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  _removeLike() {
    this._likeButton.classList.remove('photo-gallery__like-button_active');
  }

  _addLike() {
    this._likeButton.classList.add('photo-gallery__like-button_active');
  }

  _removeCard() {
    this._confirmPopup.open();
    this._confirmPopup.setData({ cardId: this._cardId, cardEl: this._cardElement });
  }

  // Слушатели --------------------------------------------------------

  _setLikeListener() {
    this._likeButton.addEventListener('click', this._checkLikeState.bind(this));
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
