import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { initialCards, settings } from './constants.js';

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

const forms = Array.from(document.forms);

const validators = {};
//---------------------------------- Основная часть кода ----------------------------------
accountNameInput.value = accountName.textContent;
accountActivityInput.value = accountActivity.textContent;

// Включение валидации для каждой формы на странице -------------------------------
forms.forEach(form => {
  const validator = new FormValidator(settings, form);
  validator.enableValidation();
  validators[form.getAttribute('name')] = validator;
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
  addCard(createCard(picNameInput.value, picLinkInput.value));
  closePopup(addPopup);
  galleryForm.reset();

  validators[galleryForm.getAttribute('name')].disableButton();
}

// Вынесенные функции для слушателей -----------------------------------------------
function editProfile() {
  openPopup(editPopup);
}

function editGallery() {
  openPopup(addPopup);
}

function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup__close-button') || evt.target == evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
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
function createCard(name, link) {
  return new Card(name, link, '#card').createCard(); // Немного не понял про создание отдельного метода, подумал про отдельную функцию, которая карточку возвращает, напишите пожалуйста если что то другое имели ввиду
}

function addCard(card) {
  photoGallery.prepend(card);
}

// Заполнение начальными карточками  -------------------------------------------------
initialCards.forEach(item => {
  addCard(createCard(item.name, item.link));
});

// Установка слушателей -----------------------------------------------
profileForm.addEventListener('submit', sendProfileData);
galleryForm.addEventListener('submit', sendGalleryData);

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', editGallery);

editPopup.addEventListener('mousedown', closePopupByClick);
addPopup.addEventListener('mousedown', closePopupByClick);
previewPopup.addEventListener('mousedown', closePopupByClick);

// Экспорт данных
export { openPopup, previewPopup, popupPreviewImage, popupPreviewText };
