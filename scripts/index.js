const accountNameInput = document.querySelector('input[name="popupName"]');
const accountActivityInput = document.querySelector('input[name="popupActivity"]');

const picNameInput = document.querySelector('input[name="popupPicName"]');
const picLinkInput = document.querySelector('input[name="popupPicLink"]');

const editPopup = document.querySelector('#edit-popup');

const addPopup = document.querySelector('#add-popup');
const previewPopup = document.querySelector('#preview-popup');

const accountName = document.querySelector('.profile__name');
const accountActivity = document.querySelector('.profile__activity');

accountNameInput.value = accountName.textContent;
accountActivityInput.value = accountActivity.textContent;

const profileForm = editPopup.querySelector('.popup__form');

const galleryForm = addPopup.querySelector('.popup__form');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editCloseButton = document.querySelector('.popup__close-edit');
const addCloseButton = document.querySelector('.popup__close-add');
const previewCloseButton = document.querySelector('.popup__close-preview');

const photoGallery = document.querySelector('.photo-gallery__list');

const cardTemplate = document.querySelector('#card').content;

const popupPreviewImage = previewPopup.querySelector('.popup__preview-image');
const popupPreviewText = previewPopup.querySelector('.popup__preview-text');

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

function sendProfileData(evt) {
  evt.preventDefault();
  accountName.textContent = accountNameInput.value;
  accountActivity.textContent = accountActivityInput.value;
  closePopup(editPopup);
}

function sendGalleryData(evt) {
  evt.preventDefault();
  addCard(new Card(picNameInput.value, picLinkInput.value, '#card').createCard());
  closePopup(addPopup);
  galleryForm.reset();

  disableButton(
    evt.target.querySelector('[type="submit"]'),
    'popup__save-button_disabled',
    'button_opacity_high'
  );
}

function editProfile() {
  openPopup(editPopup);
}

function editGallery() {
  openPopup(addPopup);
}

function openPopup(popup) {
  popup.classList.add('popup_visible');

  document.addEventListener('keydown', setCloseOnEsc);
}

function setCloseOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget.querySelector('.popup_visible'));
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', setCloseOnEsc);
}

function addCard(card) {
  photoGallery.prepend(card);
}

initialCards.forEach(item => {
  addCard(new Card(item.name, item.link, '#card').createCard());
});

profileForm.addEventListener('submit', sendProfileData);
galleryForm.addEventListener('submit', sendGalleryData);
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', editGallery);

editPopup.addEventListener('mousedown', evt => {
  if (evt.target === editCloseButton || evt.target === editPopup) {
    closePopup(editPopup);
  }
});

addPopup.addEventListener('mousedown', evt => {
  if (evt.target === addCloseButton || evt.target === addPopup) {
    closePopup(addPopup);
  }
});

previewPopup.addEventListener('mousedown', evt => {
  if (evt.target === previewCloseButton || evt.target === previewPopup) {
    closePopup(previewPopup);
  }
});
