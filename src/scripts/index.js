import '../pages/index.css';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import {
  initialCards,
  settings,
  picLinkInput,
  picNameInput,
  editButton,
  addButton,
  photoGallery,
  forms
} from './constants.js';

// Объявление переменных-------------------------------------------

const userInfo = new UserInfo({
  accountNameSelector: '.profile__name',
  accountActivitySelector: '.profile__activity'
});
const editPopup = new PopupWithForm(sendProfileData, '#edit-popup', userInfo);

const addPopup = new PopupWithForm(sendGalleryData, '#add-popup', userInfo);

const validators = {};

//---------------------------------- Основная часть кода ----------------------------------

// Включение валидации для каждой формы на странице -------------------------------
forms.forEach(form => {
  const validator = new FormValidator(settings, form);
  validator.enableValidation();
  validators[form.getAttribute('name')] = validator;
});

// Функции отправки данных --------------------------------------------------------
function sendProfileData(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(editPopup.getInputValues());
  editPopup.close();
}

function sendGalleryData(evt) {
  evt.preventDefault();
  addCard(createCard(picNameInput.value, picLinkInput.value));
  addPopup.close();

  validators['popupAddForm'].disableButton();
}

// Добавление карточки -------------------------------------------------
function createCard(name, link) {
  return new Card(name, link, '#card', () => {
    new PopupWithImage(name, link, '#preview-popup').open();
  }).createCard();
}

function addCard(card) {
  photoGallery.prepend(card);
}

// Заполнение начальными карточками  -------------------------------------------------
initialCards.forEach(item => {
  addCard(createCard(item.name, item.link));
});

// Слушатели ------------------------------------------

editButton.addEventListener('click', () => {
  editPopup.open();
});
addButton.addEventListener('click', () => {
  addPopup.open();
});
