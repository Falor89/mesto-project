import '../pages/index.css';
import { formCreateCards, renderCard } from './cards.js';
import { openPopup, closePopup, keyOutside, popupProfile, popupPlace, popupImage, popupProfileEdit, formProfile, handleFormSubmit } from './modal.js'
import { enableValidation } from "./validate";


const popupProfileButton = document.querySelector('.profile__button-edit');
const popupCloseButtonList = document.querySelectorAll('.popup__button-close');
const popupAddButton = document.querySelector('.profile__button-add');

//Кнопка открытия попапа добавления карточки.
popupAddButton.addEventListener('click', () => {
  openPopup(popupPlace);
});

// Кнопка закрытия всех попапов
popupCloseButtonList.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', function () {
    closePopup(popup);
  })
});

// Закрытие попапов кликом вне попапа
popupProfile.addEventListener('click', keyOutside);
popupPlace.addEventListener('click', keyOutside);
popupImage.addEventListener('click', keyOutside);

//Кнопка открытия попапа редактирования
popupProfileButton.addEventListener('click', popupProfileEdit);

// Слушатель изменения попапа
formProfile.addEventListener('submit', handleFormSubmit);

// Слушатель загрузки карточки
formCreateCards.addEventListener('submit', renderCard);

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-sumbite_inactive',
  inputErrorClass: 'form__field-error_active',
  errorClass: 'form__field-error'
});