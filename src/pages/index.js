import '../pages/index.css';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import { settings, editButton, addButton, forms, cohort, token } from '../utils/constants.js';
import Api from '../scripts/Api.js';

// Объявление переменных-------------------------------------------

const userInfo = new UserInfo({
  accountNameSelector: '.profile__name',
  accountActivitySelector: '.profile__activity'
});
const editPopup = new PopupWithForm(sendProfileData, '#edit-popup');

const addPopup = new PopupWithForm(sendGalleryData, '#add-popup');

const request = new Api(token, cohort);

const initialCards = await request.getInitialCards().catch(res => {
  console.log(res);
});

const renderCards = new Section(
  { items: initialCards, renderer: createCard },
  '.photo-gallery__list'
);

const imagePopup = new PopupWithImage('#preview-popup');

const validators = {};

//---------------------------------- Основная часть кода ----------------------------------

const userId = await request.getUserInfo().then(res => {
  userInfo.setUserInfo(res.name, res.about);
  return res._id;
});

// Включение валидации для каждой формы на странице -------------------------------

forms.forEach(form => {
  const validator = new FormValidator(settings, form);
  validator.enableValidation();
  validators[form.getAttribute('name')] = validator;
});

// Функции отправки данных --------------------------------------------------------
function sendProfileData({ popupName: name, popupActivity: activity }) {
  request
    .editProfileData(name, activity)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch(err => {
      console.log(err);
    });

  editPopup.close();
}

function sendGalleryData({ popupPicName: title, popupPicLink: link }) {
  request
    .addNewCard(title, link)
    .then(res => {
      renderCards.addItem(createCard(res.name, res.link, res.owner._id, res._id));
    })
    .catch(err => {
      console.log(err);
    });
  addPopup.close();
}

// Добавление карточки -------------------------------------------------
function createCard(name, link, ownerId, cardId) {
  return new Card(
    name,
    link,
    '#card',
    (name, link) => {
      imagePopup.open(name, link);
    },
    ownerId,
    userId,
    cardId,
    cardId => {
      request.removeCard(cardId).catch(err => {
        console.log(err);
      });
    }
  ).createCard();
}

// Заполнение начальными карточками  -------------------------------------------------
renderCards.renderItems();

// Слушатели ------------------------------------------

editButton.addEventListener('click', () => {
  editPopup.open();
  editPopup.setInputValues({
    popupName: userInfo.getUserInfo().name,
    popupActivity: userInfo.getUserInfo().activity
  });
});
addButton.addEventListener('click', () => {
  addPopup.open();
  validators['popupAddForm'].disableButton();
});