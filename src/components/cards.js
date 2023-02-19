export { initialCards, cardLike, cardDelete, formCreateCards, renderCard }
import { openPopup, closePopup, popupPlace, popupImage } from './modal.js'

const formCreateCards = document.querySelector('.form__add-place');
const cardsContainer = document.querySelector('.elements');
const popupDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#element-template').content;
const cardImage = document.querySelector('.popup__card-image');
const placeInput = document.querySelector('.place-input');
const linkInput = document.querySelector('.link-input');


//Лайки для карточек
function cardLike(evt) {
  evt.target.classList.toggle('element__button-like_active')
};

// Удаление карточки
function cardDelete(evt) {
  evt.target.closest('.element').remove();
};

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
    openPopup(popupImage);
  });

  return element;
};

//Функция для загрузки карточек
function renderCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(placeInput.value, linkInput.value));
  formCreateCards.reset();
  closePopup(popupPlace);
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



//Дефолтные карточки
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item.name, item.link))
})

