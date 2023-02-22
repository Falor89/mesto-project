import '../pages/index.css';
import { formCreateCards, renderCard } from './cards.js';
import { openPopup, closePopup, popupPlace, openPopupProfile, formProfile, handleProfileFormSubmit } from './modal.js'
import { enableValidation } from "./validate";

const popups = document.querySelectorAll('.popup');

const popupProfileButton = document.querySelector('.profile__button-edit');
const popupAddButton = document.querySelector('.profile__button-add');

//Кнопка открытия попапа добавления карточки.
popupAddButton.addEventListener('click', () => {
  openPopup(popupPlace);
});

// Объединенный обработчик оверлея и крестиков

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup)
    }
  })
})

//Кнопка открытия попапа редактирования
popupProfileButton.addEventListener('click', openPopupProfile);

// Слушатель изменения попапа
formProfile.addEventListener('submit', handleProfileFormSubmit);

// Слушатель загрузки карточки
formCreateCards.addEventListener('submit', renderCard);


const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__field-error_border',
  errorClass: 'form__field-error_active'
};

enableValidation(validationSettings);

// Кнопка закрытия всех попапов
/*
popupCloseButtonList.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', function () {
    closePopup(popup);
  })
});

// Закрытие попапов кликом вне попапа

popupProfile.addEventListener('click', handleOverlay);
popupPlace.addEventListener('click', handleOverlay);
popupImage.addEventListener('click', handleOverlay);
*/