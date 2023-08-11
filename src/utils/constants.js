const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  buttonHoverEffectClass: 'button_opacity_high'
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');

const forms = Array.from(document.forms);

const token = '30cf22be-8f37-4b70-b933-ced2c424285c';
const cohort = 'cohort-72';

export { settings, editButton, addButton, forms, token, cohort, avatarButton };
