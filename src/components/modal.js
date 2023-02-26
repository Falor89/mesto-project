
export { openPopup, closePopup, popupProfile, popupPlace, popupImage, formProfile, nameField, aboutField, openPopupProfile, handleProfileFormSubmit }
import { enableValidation } from "./validate";

const popupProfile = document.querySelector('.popup__profile');
const popupPlace = document.querySelector('.popup__add-card');
const popupImage = document.querySelector('.popup__big-image')


const formProfile = document.querySelector('.form__profile');
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
    nameField.textContent = nameInput.value;
    aboutField.textContent = aboutInput.value;
    closePopup(popupProfile);
    //Функция для редактирования профиля + закрытие попапа
}






/*
// Функция закрытия кликом вне попапа
function handleOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        hideOpenedPopup()
    }
}
*/