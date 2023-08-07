import '../pages/index.css';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import { initialCards, settings, editButton, addButton, forms } from '../utils/constants.js';

// Объявление переменных-------------------------------------------

const userInfo = new UserInfo({
  accountNameSelector: '.profile__name',
  accountActivitySelector: '.profile__activity'
});
const editPopup = new PopupWithForm(sendProfileData, '#edit-popup');

const addPopup = new PopupWithForm(sendGalleryData, '#add-popup');

const renderCards = new Section(
  { items: initialCards, renderer: createCard },
  '.photo-gallery__list'
);

const imagePopup = new PopupWithImage('#preview-popup');

const validators = {};

//---------------------------------- Основная часть кода ----------------------------------

editPopup.setInputValues({
  // пришлось это перенести выше, чтобы валидатор срабатывал, когда поля уже заняты значением, иначе кнопка при открытии попапа аккаунта неактивна была
  popupName: userInfo.getUserInfo().name,
  popupActivity: userInfo.getUserInfo().activity
});

// Включение валидации для каждой формы на странице -------------------------------

forms.forEach(form => {
  const validator = new FormValidator(settings, form);
  validator.enableValidation();
  validators[form.getAttribute('name')] = validator;
});

// Функции отправки данных --------------------------------------------------------
function sendProfileData({ popupName: name, popupActivity: activity }) {
  userInfo.setUserInfo(name, activity);
  editPopup.close();
}

function sendGalleryData({ popupPicName: title, popupPicLink: link }) {
  renderCards.addItem(createCard(title, link));
  addPopup.close();
}

// Добавление карточки -------------------------------------------------
function createCard(name, link) {
  return new Card(name, link, '#card', (name, link) => {
    imagePopup.open(name, link);
  }).createCard();
}

// Заполнение начальными карточками  -------------------------------------------------
renderCards.renderItems();

// Слушатели ------------------------------------------

editButton.addEventListener('click', () => {
  editPopup.open();
});
addButton.addEventListener('click', () => {
  addPopup.open();
  validators['popupAddForm'].disableButton(); // Просто у меня идея с валидацией возникла, подумал, что просто при открытии будут все поля классом валидатора проверяться и все хорошо и все счастливы. И так так валидация при открытии происходит, то не получится заполнить попап валидными данными, не сохраняя закрыть, так как при след открытии произойдет валидация и кнопка задизейблится
});
