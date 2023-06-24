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

function sendProfileData(evt) {
  evt.preventDefault();
  accountName.textContent = accountNameInput.value;
  accountActivity.textContent = accountActivityInput.value;
  closePopup(editPopup);
}

function sendGalleryData(evt) {
  evt.preventDefault();
  addCard(createCard(picNameInput.value, picLinkInput.value));
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

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.photo-gallery__item').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.photo-gallery__image');
  cardImageElement.src = link;
  cardImageElement.alt = name;

  cardElement.querySelector('.photo-gallery__name').textContent = name;

  const likeButton = cardElement.querySelector('.photo-gallery__like');
  likeButton.addEventListener('click', addLike);

  const rmButton = cardElement.querySelector('.photo-gallery__remove');
  rmButton.addEventListener('click', () => {
    removeCard(cardElement);
  });

  cardImageElement.addEventListener('click', () => {
    openPopup(previewPopup);
    popupPreviewImage.src = link;
    popupPreviewImage.alt = name;
    popupPreviewText.textContent = name;
  });

  return cardElement;
}

function addCard(card) {
  photoGallery.prepend(card);
}

function addLike(evt) {
  evt.target.classList.toggle('photo-gallery__like_active');
}

function removeCard(card) {
  card.remove();
}

initialCards.forEach(item => {
  addCard(createCard(item.name, item.link));
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

addPopup.addEventListener('click', evt => {
  if (evt.target === addCloseButton || evt.target === addPopup) {
    closePopup(addPopup);
  }
});

previewPopup.addEventListener('click', evt => {
  if (evt.target === previewCloseButton || evt.target === previewPopup) {
    closePopup(previewPopup);
  }
});
