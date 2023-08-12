import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { settings, editButton, addButton, forms, avatarButton } from '../utils/constants.js';
import Api from '../components/Api.js';

// Объявление переменных-------------------------------------------

const userInfo = new UserInfo({
  accountNameSelector: '.profile__name',
  accountActivitySelector: '.profile__activity',
  accountAvatarSelector: '.profile__avatar'
});
const editPopup = new PopupWithForm(sendProfileData, '#edit-popup');

const addPopup = new PopupWithForm(sendGalleryData, '#add-popup');

const avatarPopup = new PopupWithForm(sendAvatarData, '#avatar-popup');

const mixinMethods = {
  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonTxt;
    }
  },

  getPopupForm() {
    return this._form;
  }
};

const confirmPopup = new PopupConfirm(removeCardData, '#confirm-popup');

const request = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '30cf22be-8f37-4b70-b933-ced2c424285c',
    'Content-Type': 'application/json'
  }
});

const imagePopup = new PopupWithImage('#preview-popup');

const validators = {};

//---------------------------------- Основная часть кода ----------------------------------

Object.assign(PopupConfirm.prototype, mixinMethods); // тут так как создавал свой класс, а множественного наследования у js нет, пришлось в prototype вручную копировать метод renderLoading, чтобы и моя форма с подтверждением могла к ней обращаться (нашел способ в интернетах, возможно можно сделать лучше, но пока в голову ничего не приходит, буду рад критике и помощи)
Object.assign(PopupWithForm.prototype, mixinMethods);

let section;

Promise.all([request.getUserInfo(), request.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    section = new Section({ items: initialCards, renderer: createCard }, '.photo-gallery__list');
    section.renderItems();
  })
  .catch(console.error);

// Включение валидации для каждой формы на странице -------------------------------

forms.forEach(form => {
  const validator = new FormValidator(settings, form);
  validator.enableValidation();
  validators[form.getAttribute('name')] = validator;
});

// Функции отправки данных --------------------------------------------------------
function sendAvatarData({ popupAvatarLink: link }) {
  async function makeRequest() {
    return await request.changeAvatar(link).then(res => {
      userInfo.setUserInfo({ name: res.name, about: res.about, avatar: res.avatar, _id: res._id });
    });
  }

  handleSubmit(makeRequest, avatarPopup);
}

function sendProfileData({ popupName: name, popupActivity: activity }) {
  async function makeRequest() {
    return await request.editProfileData(name, activity).then(res => {
      userInfo.setUserInfo({ name: res.name, about: res.about, avatar: res.avatar, _id: res._id });
    });
  }

  handleSubmit(makeRequest, editPopup);
}

function sendGalleryData({ popupPicName: title, popupPicLink: link }) {
  async function makeRequest() {
    return request.addNewCard(title, link).then(res => {
      section.addItem(createCard(res.name, res.link, res.owner._id, res._id, res.likes));
    });
  }

  handleSubmit(makeRequest, addPopup);
}

function removeCardData(data) {
  async function makeRequest() {
    return await request.removeCard(data.cardId).then(() => {
      data.cardEl.remove();
    });
  }

  handleSubmit(makeRequest, confirmPopup, 'Удаление...');
}

function handleSubmit(request, popup, loadingText) {
  popup.renderLoading(true, loadingText);
  validators[popup.getPopupForm().name].disableButton(); // тут пришлось кнопку дизейблить, потому что при нажатии несколько раз во время сохранения отправляется несколько запросов сразу (случайно нашел баг)
  request()
    .then(() => {
      popup.close();
    })
    .catch(console.error)
    .finally(() => {
      popup.renderLoading(false);
    });
}

// Добавление карточки -------------------------------------------------
function createCard(name, link, ownerId, cardId, likes) {
  return new Card({
    name: name,
    link: link,

    templateSelector: '#card',
    handleCardClick: (name, link) => {
      imagePopup.open(name, link);
    },
    ownerId: ownerId,
    userId: userInfo.getUserInfo()._id,
    cardId: cardId,
    likes: likes,
    setLikeRequest: async cardId => {
      return await request.setLike(cardId).catch(err => {
        return Promise.reject(err);
      });
    },
    removeLikeRequest: async cardId => {
      return await request.removeLike(cardId).catch(err => {
        return Promise.reject(err);
      });
    },
    confirmPopup: confirmPopup
  }).createCard();
}

// Заполнение начальными карточками  -------------------------------------------------

// Слушатели ------------------------------------------

editButton.addEventListener('click', () => {
  editPopup.open();
  const { activity, name } = userInfo.getUserInfo();
  editPopup.setInputValues({
    popupName: name,
    popupActivity: activity
  });
});
addButton.addEventListener('click', () => {
  addPopup.open();
  validators['popupAddForm'].resetValidation();
});

avatarButton.addEventListener('click', () => {
  avatarPopup.open();
  validators['popupAvatarForm'].resetValidation();
});
