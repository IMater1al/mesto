let accountNameInput = document.querySelector('input[name="popupName"]');
let accountActivityInput = document.querySelector('input[name="popupActivity"]');

let popup = document.querySelector('.popup');

let accountName = document.querySelector('.profile__name');
let accountActivity = document.querySelector('.profile__activity');

let form = document.querySelector('.popup__form');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let likeButton = document.querySelectorAll('.photo-gallery__like');

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

form.addEventListener('submit', sendData);
editButton.addEventListener('click', editData);
closeButton.addEventListener('click', closePopup);

likeButton.forEach(function (item) {
  item.addEventListener('click', function () {
    item.classList.toggle('photo-gallery__like_active');
  });
});
