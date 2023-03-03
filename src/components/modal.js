
import {  updateProfileAvatar, updateProfileInfo } from './api.js';
import { renderLoading } from './utils.js';
import { profileUserName, profileUserAvatar, renderProfileInfo } from './profile.js'
import { popupDescription, cardImage } from './cards.js'

const popupProfile = document.querySelector('.popup__profile');
const popupPlace = document.querySelector('.popup__add-card');
const popupImage = document.querySelector('.popup__big-image');

const popupAvatar = document.querySelector('.popup__avatar');
const formAvatar = document.forms.form__avatar;
const avatarInput = formAvatar.querySelector('.avatar-input')

const popupDeleteConfirm = document.querySelector('.popup__delete-confirm')
const popupButtonSubmit = popupDeleteConfirm.querySelector('.form__button-submit')

const formProfile = document.forms.form__profile;
const nameInput = formProfile.querySelector('.name-input');
const aboutInput = formProfile.querySelector('.about-input');
const nameField = document.querySelector('.profile__title');
const aboutField = document.querySelector('.profile__subtitle');


//Функции для открытия и закрытия попапа.
function openPopup(popup) {
    popup.classList.add('popup_opened');
    window.addEventListener('keyup', handleEscape)
};
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    window.removeEventListener('keyup', handleEscape)
};

function hideOpenedPopup() {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
        closePopup(openedPopup)
    }
}

// Функция закрытия попапа через кнопу Esc
function handleEscape(evt) {
    if (evt.key === 'Escape') {
        hideOpenedPopup()
    }
}
//Попап профиль
// Функция для попапа редактирования
function openPopupProfile() {
    nameInput.value = nameField.textContent;
    aboutInput.value = aboutField.textContent;
    openPopup(popupProfile);
}


//Сохранение изменения попапа

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupProfile, 'Сохранение...')
  updateProfileInfo(nameInput, aboutInput)
    .then((res) => {
      renderProfileInfo(res)
      closePopup(popupProfile)
})
    .catch((err) => {
      console.log(`Ошибка в обновлении профиля: ${err}`)
})
    .finally(() => {
      renderLoading(false, popupProfile)
})
}


function handleProfileAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupAvatar, 'Сохранение')
  updateProfileAvatar(avatarInput)
    .then((res) => {
      renderProfileInfo(res)
      closePopup(popupAvatar)
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Ошибка в изменении аватара: ${err}`)
    })
    .finally(() => {
      renderLoading(false, popupAvatar)
    })
}


export { openPopup, closePopup, popupProfile, popupPlace, popupImage, popupAvatar, popupDeleteConfirm, formProfile, formAvatar, nameField, aboutField, openPopupProfile, handleProfileFormSubmit, handleProfileAvatarSubmit, popupButtonSubmit }
