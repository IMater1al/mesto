let accountNameInput = document.querySelector('input[name="popupName"]');
let accountActivityInput = document.querySelector('input[name="popupActivity"]');
let picNameInput = document.querySelector('input[name="popupPicName"]');
let picLinkInput = document.querySelector('input[name="popupPicLink"]');

let editPopup = document.querySelector('#edit-popup');
let addPopup = document.querySelector('#add-popup');
let previewPopup = document.querySelector('#preview-popup');

let accountName = document.querySelector('.profile__name');
let accountActivity = document.querySelector('.profile__activity');

let profileForm = editPopup.querySelector('.popup__form');
let galleryForm = addPopup.querySelector('.popup__form');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelectorAll('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');

let photoGallery = document.querySelector('.photo-gallery__list');

let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function sendProfileData(evt) {
  evt.preventDefault();
  accountName.textContent = accountNameInput.value;
  accountActivity.textContent = accountActivityInput.value;
  closePopup(evt);
}

function sendGalleryData(evt) {
  evt.preventDefault();
  addCard(picNameInput.value, picLinkInput.value);
  closePopup(evt);
}

function editProfile() {
  editPopup.classList.add('popup_visible');
  accountNameInput.value = accountName.textContent;
  accountActivityInput.value = accountActivity.textContent;
}

function editGallery() {
  addPopup.classList.add('popup_visible');
}

function closePopup(evt) {
  evt.target.parentNode.parentNode.classList.remove('popup_visible');
}

function addCard(name, link) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.photo-gallery__item').cloneNode(true);
  cardElement.querySelector('.photo-gallery__image').src = link;
  cardElement.querySelector('.photo-gallery__image').alt = name;
  cardElement.querySelector('.photo-gallery__name').textContent = name;
  photoGallery.prepend(cardElement);

  let likeButton = cardElement.querySelector('.photo-gallery__like');
  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('photo-gallery__like_active');
  });

  let rmButton = cardElement.querySelector('.photo-gallery__remove');
  rmButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardElement.querySelector('.photo-gallery__image').addEventListener('click', () => {
    previewPopup.classList.add('popup_visible');
    previewPopup.querySelector('.popup__preview-image').src = link;
    previewPopup.querySelector('.popup__preview-image').alt = name;
    previewPopup.querySelector('.popup__preview-text').textContent = name;
  });
}

initialCards.forEach(item => {
  addCard(item.name, item.link);
});

profileForm.addEventListener('submit', sendProfileData);
galleryForm.addEventListener('submit', sendGalleryData);
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', editGallery);
closeButton.forEach(item => {
  item.addEventListener('click', closePopup);
});
