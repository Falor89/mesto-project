import '../pages/index.css';
import { openPopup, closePopup, popupPlace, openPopupProfile, formProfile, formAvatar, handleProfileFormSubmit, handleProfileAvatarSubmit, popupAvatar } from './modal.js'
import { enableValidation } from "./validate";
import { getInitialCards, getProfileInfo } from './api.js';
import { renderCards, formCreateCards, handleCardSubmit } from './cards.js';
import { renderProfileInfo, profileUserAvatarButton } from './profile.js'


const popups = document.querySelectorAll('.popup');
const popupProfileButton = document.querySelector('.profile__button-edit');
const popupAddButton = document.querySelector('.profile__button-add');

//Кнопка открытия попапа добавления карточки.
popupProfileButton.addEventListener('click', openPopupProfile);

popupAddButton.addEventListener('click', () => { openPopup(popupPlace) });

profileUserAvatarButton.addEventListener('click', () => { openPopup(popupAvatar) });

formCreateCards.addEventListener('submit', handleCardSubmit)

formProfile.addEventListener('submit', handleProfileFormSubmit);

formAvatar.addEventListener('submit', handleProfileAvatarSubmit);

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

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    renderProfileInfo(userData);
    cards.forEach((card) => {
      renderCards(card)
    })
  })
  .catch((err) => {
    console.log(`Ошибка в загрузке карточек или профиля пользователя: ${err}`)
  })


const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_inactive',
  inputErrorClass: 'form__field-error_border',
  errorClass: 'form__field-error_active'
};

enableValidation(validationSettings);

