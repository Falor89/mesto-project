const popupProfile = document.querySelector('.popup__profile');
const popupAddCard = document.querySelector('.popup__add-card');
const popupBigImage = document.querySelector('.popup__big-image')
const popupOpenImage = document.querySelector('.popup__image');
const popupProfileButton = document.querySelector('.profile__button-edit');
const popupCloseButtonList = document.querySelectorAll('.popup__button-close');
const popupAddButton = document.querySelector('.profile__button-add');
const formCreateCards = document.querySelector('.form__add-place');
const cardsContainer = document.querySelector('.elements');
const popupDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#element-template').content;
const cardImage = document.querySelector('.popup__card-image');
const formProfile = document.querySelector('.form__edit-profile');
const nameInput = formProfile.querySelector('.name-input');
const aboutInput = formProfile.querySelector('.about-input');
const nameField = document.querySelector('.profile__title');
const aboutField = document.querySelector('.profile__subtitle');
const placeInput = document.querySelector('.place-input');
const linkInput = document.querySelector('.link-input');

//Функции для открытия и закрытия попапа.
function openPopup(popup) {
  popup.classList.add('popup_opened')
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//Кнопка открытия попапа добавления карточки.
popupAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// Закрытие всех попапов
popupCloseButtonList.forEach(function (button) {
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
  evt.target.closest('.element').remove();
};

//Попап профиль
// Функция для попапа редактирования
function popupProfileEdit () {
  nameInput.value = nameField.textContent;
  aboutInput.value = aboutField.textContent;
  openPopup(popupProfile);
}
//Кнопка открытия попапа редактирования
popupProfileButton.addEventListener('click', popupProfileEdit);


//Сохранение изменения попапа
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameField.textContent = nameInput.value;
  aboutField.textContent = aboutInput.value;
  closePopup(popupProfile);
  //Функция для редактирования профиля + закрытие попапа
}

formProfile.addEventListener('submit', handleFormSubmit);

//Функция для добавления всех карточек
function createCard(itemName, itemLink) {
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  const elementItem = element.querySelector('.element__title');
  const elementImage = element.querySelector('.element__image');
  const elementLikeButton = element.querySelector('.element__button-like');
  const elementDeleteButton = element.querySelector('#element__button-delete');

    elementItem.textContent = itemName;
    elementImage.src = itemLink;
    elementImage.alt = itemName;

    elementLikeButton.addEventListener('click', cardLike);
    elementDeleteButton.addEventListener('click', cardDelete);

    elementImage.addEventListener('click', function () {
      popupDescription.textContent = itemName;
      cardImage.src = itemLink;
      cardImage.alt = itemName;
      openPopup(popupBigImage);
    });

  return element;
};

//Функция для загрузки карточек
function renderCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(placeInput.value, linkInput.value));
    formCreateCards.reset();
    closePopup(popupAddCard);
};
formCreateCards.addEventListener('submit', renderCard);

//Дефолтные карточки
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item.name, item.link))
})
