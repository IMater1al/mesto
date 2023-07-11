import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { initialCards } from '../scripts/initial-cards.js';

// Объявление переменных-------------------------------------------
const accountNameInput = document.querySelector('input[name="popupName"]');
const accountActivityInput = document.querySelector('input[name="popupActivity"]');

const picNameInput = document.querySelector('input[name="popupPicName"]');
const picLinkInput = document.querySelector('input[name="popupPicLink"]');

const editPopup = document.querySelector('#edit-popup');

const addPopup = document.querySelector('#add-popup');
const previewPopup = document.querySelector('#preview-popup');

const popupPreviewImage = previewPopup.querySelector('.popup__preview-image');
const popupPreviewText = previewPopup.querySelector('.popup__preview-text');

const accountName = document.querySelector('.profile__name');
const accountActivity = document.querySelector('.profile__activity');

const profileForm = editPopup.querySelector('.popup__form');

const galleryForm = addPopup.querySelector('.popup__form');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editCloseButton = document.querySelector('.popup__close-edit');
const addCloseButton = document.querySelector('.popup__close-add');
const previewCloseButton = document.querySelector('.popup__close-preview');

const photoGallery = document.querySelector('.photo-gallery__list');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  buttonHoverEffectClass: 'button_opacity_high'
};

const forms = Array.from(document.forms);
//---------------------------------- Основная часть кода ----------------------------------
accountNameInput.value = accountName.textContent;
accountActivityInput.value = accountActivity.textContent;

// Включение валидации для каждой формы на странице -------------------------------
forms.forEach(form => {
  new FormValidator(settings, form).enableValidation();
});

// Функции отправки данных --------------------------------------------------------
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

// Функции включения и отключения кнопок -------------------------------------------
function disableButton(buttonEl, inactiveButtonClass, buttonHoverEffectClass) {
  buttonEl.classList.add(inactiveButtonClass);
  buttonEl.classList.remove(buttonHoverEffectClass);
  buttonEl.setAttribute('disabled', true);
}

function enableButton(buttonEl, inactiveButtonClass, buttonHoverEffectClass) {
  buttonEl.classList.remove(inactiveButtonClass);
  buttonEl.classList.add(buttonHoverEffectClass);
  buttonEl.removeAttribute('disabled');
}
// Вынесенные функции для слушателей -----------------------------------------------
function editProfile() {
  openPopup(editPopup);
}

function editGallery() {
  openPopup(addPopup);
}

// Функции открытия и закрытия popup -------------------------------------------------
function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', setCloseOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', setCloseOnEsc);
}

// Закрытие popup на Esc
function setCloseOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget.querySelector('.popup_visible'));
  }
}

// Добавление карточки -------------------------------------------------
function addCard(card) {
  photoGallery.prepend(card);
}

// Заполнение начальными карточками  -------------------------------------------------
initialCards.forEach(item => {
  addCard(new Card(item.name, item.link, '#card').createCard());
});

// Установка слушателей -----------------------------------------------
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

// Экспорт данных
export {
  openPopup,
  previewPopup,
  popupPreviewImage,
  popupPreviewText,
  enableButton,
  disableButton
};
