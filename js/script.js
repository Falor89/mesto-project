const popupProfile = document.querySelector('.popup__profile');
const popupAddCard = document.querySelector('.popup__add-card');
const popupBigImage = document.querySelector('.popup__big-image')
const popupOpenImage = document.querySelector('.popup__image');
const popupOpenButton = document.querySelector('.profile__button-edit');
const popupCloseButton = document.querySelectorAll('.popup__button-close');
const addButtonOpen = document.querySelector('.profile__button-add');

//Функции для открытия и закрытия попапа.
function openPopup(popup) {
  popup.classList.add('popup_opened')
};
function closePopup() {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
};

//Кнопки открытия и закрытия.
popupOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
});
addButtonOpen.addEventListener('click', () => {
  openPopup(popupAddCard);
});
popupCloseButton.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', function () {
    closePopup(popup);
  })
});

//Лайки для карточек
function cardLike(evt) {
  evt.target.classList.toggle('element__button-like_active')
};
// Удаление карточки
function cardDelete(evt) {
  const deleteCard = evt.target.parentElement;
  deleteCard.remove();
}


const firstForm = document.forms[0];
firstForm.setAttribute("autocomplete", "off");


//Эффект для попапа (место)
const secondForm = document.forms[1];
secondForm.setAttribute("autocomplete", "off");

const secondFormNameImput = secondForm.placeInput;
const secondFormNameImputPlaceholder = secondFormNameImput.placeholder;

secondFormNameImput.addEventListener('focus', (evt) => {
  secondFormNameImput.placeholder = '';
});
secondFormNameImput.addEventListener('blur', (evt) => {
  secondFormNameImput.placeholder = secondFormNameImputPlaceholder;
});

const secondFormLinkImput = secondForm.linkInput;
const secondFormLinkImputPlaceholder = secondFormLinkImput.placeholder;

secondFormLinkImput.addEventListener('focus', (evt) => {
  secondFormLinkImput.placeholder = '';
});
secondFormLinkImput.addEventListener('blur', (evt) => {
  secondFormLinkImput.placeholder = secondFormLinkImputPlaceholder;
})

//Сохранение изменения попапа
const formProfile = document.querySelector('.form__edit-profile');
const nameInput = formProfile.querySelector('.name-input');
const aboutInput = formProfile.querySelector('.about-input');
const nameField = document.querySelector('.profile__title');
const aboutField = document.querySelector('.profile__subtitle');

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  aboutField.textContent = aboutInput.value;
  closePopup();
  //Функция для редактирования профиля + закрытие попапа
}

formProfile.addEventListener('submit', handleFormSubmit);

//Добавление карточки
const formCreateCards = document.querySelector('.form__add-place');
const cardsElements = document.querySelector('.elements');
const popupDescription = document.querySelector('.popup__description');

function addCard(evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const placeInput = formCreateCards.querySelector('.place-input');
  const linkInput = formCreateCards.querySelector('.link-input');
  const likeButton = cardElement.querySelector('.element__button-like');
  const deleteButton = cardElement.querySelector('#element__button-delete');
  const elementItem = cardElement.querySelector('.element__title');
  const elementImage = cardElement.querySelector('.element__image');
  const cardImage = document.querySelector('.popup__card-image');

  elementItem.textContent = placeInput.value;
  elementImage.src = linkInput.value;
  cardsElements.prepend(cardElement);

  elementImage.addEventListener('click', function () {
    popupDescription.textContent = elementItem.textContent;
    cardImage.src = elementImage.src;
    cardImage.alt = elementItem.textContent;
    openPopup(popupBigImage);
  })


  likeButton.addEventListener('click', cardLike);
  deleteButton.addEventListener('click', cardDelete);

  closePopup();
  placeInput.value = '';
  linkInput.value = '';
};

formCreateCards.addEventListener('submit', addCard);
