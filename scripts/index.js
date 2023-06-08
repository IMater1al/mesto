let accountNameInput = document.querySelector('input[name="popupName"]');
let accountActivityInput = document.querySelector('input[name="popupActivity"]');

let popup = document.querySelector('.popup');

let accountName = document.querySelector('.profile__name');
let accountActivity = document.querySelector('.profile__activity');

let form = document.querySelector('.popup__form');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');

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

function sendData(evt) {
  evt.preventDefault();
  accountName.textContent = accountNameInput.value;
  accountActivity.textContent = accountActivityInput.value;
  popup.classList.remove('popup_visible');
}

function editData() {
  popup.classList.add('popup_visible');
  accountNameInput.value = accountName.textContent;
  accountActivityInput.value = accountActivity.textContent;
}

function closePopup() {
  popup.classList.remove('popup_visible');
}

function like() {
  this.classList.toggle('photo-gallery__like_active');
}

function addCard(name, link) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.photo-gallery__item').cloneNode(true);
  cardElement.querySelector('.photo-gallery__image').src = link;
  cardElement.querySelector('.photo-gallery__image').alt = name;
  cardElement.querySelector('.photo-gallery__name').textContent = name;
  photoGallery.append(cardElement);
}

initialCards.forEach(item => {
  addCard(item.name, item.link);
});

form.addEventListener('submit', sendData);
editButton.addEventListener('click', editData);
closeButton.addEventListener('click', closePopup);

let likeButton = document.querySelectorAll('.photo-gallery__like'); // Логика лайков
likeButton.forEach(function (item) {
  item.addEventListener('click', () => {
    item.classList.toggle('photo-gallery__like_active');
  });
});
