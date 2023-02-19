
export { openPopup, closePopup, keyOutside, popupProfile, popupPlace, popupImage, formProfile, popupProfileEdit, handleFormSubmit }
import { enableValidation } from "./validate";

const popupProfile = document.querySelector('.popup__profile');
const popupPlace = document.querySelector('.popup__add-card');
const popupImage = document.querySelector('.popup__big-image')


const formProfile = document.querySelector('.form__edit-profile');
const nameInput = formProfile.querySelector('.name-input');
const aboutInput = formProfile.querySelector('.about-input');
const nameField = document.querySelector('.profile__title');
const aboutField = document.querySelector('.profile__subtitle');


//Функции для открытия и закрытия попапа.
function openPopup(popup) {
    popup.classList.add('popup_opened');
    window.addEventListener('keyup', keyEscape)
};
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    window.addEventListener('keyup', keyEscape)
};

function closeFast() {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
        closePopup(openedPopup)
    }
}

// Функция закрытия попапа через кнопу Esc
function keyEscape(evt) {
    if (evt.key === 'Escape') {
        closeFast()
    }
}

// Функция закрытия кликом вне попапа
function keyOutside(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closeFast()
    }
}

//Попап профиль
// Функция для попапа редактирования
function popupProfileEdit() {
    nameInput.value = nameField.textContent;
    aboutInput.value = aboutField.textContent;
    openPopup(popupProfile);
}

//Сохранение изменения попапа
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameField.textContent = nameInput.value;
    aboutField.textContent = aboutInput.value;
    closePopup(popupProfile);
    //Функция для редактирования профиля + закрытие попапа
}
