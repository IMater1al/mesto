let accountNameInput = document.querySelector('.popup__input-name');
let accountActivityInput = document.querySelector('.popup__input-activity');

let popup = document.querySelector('.popup');

let accountName = document.querySelector('.profile__name');
let accountActivity = document.querySelector('.profile__activity');

let saveButton = document.querySelector('.popup__save-button');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let likeButton = document.querySelectorAll('.photo-gallery__like');

accountNameInput.setAttribute('value', `${accountName.textContent}`);
accountActivityInput.setAttribute('value', `${accountActivity.textContent}`);

saveButton.addEventListener('click', function () {
  accountName.textContent = accountNameInput.value;
  accountActivity.textContent = accountActivityInput.value;

  popup.style.display = 'none';
});

editButton.addEventListener('click', function () {
  popup.style.display = 'block';
});

closeButton.addEventListener('click', function () {
  popup.style.display = 'none';
});

likeButton.forEach(function (item) {
  item.addEventListener('click', function () {
    item.classList.toggle('photo-gallery__like_active');
  });
});
