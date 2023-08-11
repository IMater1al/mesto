import '../pages/index.css';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import {
  settings,
  editButton,
  addButton,
  forms,
  cohort,
  token,
  avatarButton
} from '../utils/constants.js';
import Api from '../scripts/Api.js';

// Объявление переменных-------------------------------------------

const userInfo = new UserInfo({
  accountNameSelector: '.profile__name',
  accountActivitySelector: '.profile__activity',
  accountAvatarSelector: '.profile__avatar'
});
const editPopup = new PopupWithForm(sendProfileData, '#edit-popup');

const addPopup = new PopupWithForm(sendGalleryData, '#add-popup');

const avatarPopup = new PopupWithForm(sendAvatarData, '#avatar-popup');

const request = new Api(token, cohort);

const initialCards = await request.getInitialCards().catch(err => {
  console.log(err);
});

const renderCards = new Section(
  { items: initialCards, renderer: createCard },
  '.photo-gallery__list'
);

const imagePopup = new PopupWithImage('#preview-popup');

const validators = {};

//---------------------------------- Основная часть кода ----------------------------------

const userId = await request.getUserInfo().then(res => {
  userInfo.setUserAvatar(res.avatar);
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
function sendAvatarData({ popupAvatarLink: link }, evt) {
  request
    .changeAvatar(link)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
      evt.target.querySelector('button[type="submit"]').textContent = 'Сохранить';
    })
    .catch(err => {
      console.log(err);
    });

  avatarPopup.close();
}

function sendProfileData({ popupName: name, popupActivity: activity }, evt) {
  request
    .editProfileData(name, activity)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      evt.target.querySelector('button[type="submit"]').textContent = 'Сохранить';
      editPopup.close();
    })
    .catch(err => {
      console.log(err);
    });
}

function sendGalleryData({ popupPicName: title, popupPicLink: link }, evt) {
  request
    .addNewCard(title, link)
    .then(res => {
      console.log(res);
      renderCards.addItem(createCard(res.name, res.link, res.owner._id, res._id, res.likes));
      evt.target.querySelector('button[type="submit"]').textContent = 'Сохранить';
    })
    .catch(err => {
      console.log(err);
    });
  addPopup.close();
}

// Добавление карточки -------------------------------------------------
function createCard(name, link, ownerId, cardId, likes) {
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
    async cardId => {
      return await request.removeCard(cardId).catch(err => {
        return Promise.reject(err);
      });
    },
    likes,
    async cardId => {
      return await request.setLike(cardId).catch(err => {
        return Promise.reject(err);
      });
    },
    async cardId => {
      return await request.removeLike(cardId).catch(err => {
        return Promise.reject(err);
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

avatarButton.addEventListener('click', () => {
  avatarPopup.open();
  validators['popupAvatarForm'].disableButton();
});
