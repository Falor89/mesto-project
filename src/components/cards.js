export { toggleLike, deleteCard, createCard, renderCards, cardsContainer, formCreateCards, handleCardSubmit }
import { openPopup, closePopup, popupPlace, popupImage, nameField, aboutField } from './modal.js'
import { getInitialCards, getProfileInfo, downloadNewCard, deleteCard } from './api.js';
import { renderLoading } from './utils'
const formCreateCards = document.querySelector('.form__place');
const cardsContainer = document.querySelector('.elements');
const popupDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#element-template').content;
const cardImage = document.querySelector('.popup__card-image');
const placeInput = document.querySelector('.place-input');
const linkInput = document.querySelector('.link-input');

//Лайки для карточек
function toggleLike(evt) {
  evt.target.classList.toggle('element__button-like_active')
};

// Удаление карточки
/*
function deleteCard(evt) {
  evt.target.closest('.element').remove();
};
*/

function createCard(card) {
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  const elementItem = element.querySelector('.element__title');
  const elementImage = element.querySelector('.element__image');
  const elementLikeButton = element.querySelector('.element__button-like');
  const elementDeleteButton = element.querySelector('#element__button-delete');
  const profile = document.querySelector('.profile');
  const userId = profile.getAttribute('data-id');

  elementItem.textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;

  elementLikeButton.addEventListener('click', toggleLike);


  if (card.owner._id == '60eb6f9c7195e1a2f6362552') {
    elementDeleteButton.addEventListener('click', () => {
      console.log(card._id)
      deleteCard(card)
    })
  }
  else {
    elementDeleteButton.remove()
  }

  return element;
};

function renderCards(card) {
  const element = createCard(card)
  cardsContainer.prepend(element)
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value
  }
  downloadNewCard(card)
  evt.target.reset();
}

/*
function handleCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupPlace);
  const cardData = {
    name: placeInput.value,
    link: linkInput.value
  }
  downloadNewCard(cardData)
    .then((res) => {
      console.log(res)
      return cardsContainer.prepend(createCard(res))
    })
    .finally(() => {
      renderLoading(false, popupPlace);
    })
}

function handleCardDelete(evt) {
  evt.preventDefault();
  return deleteCard(card._id)
}


/*
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

  elementLikeButton.addEventListener('click', toggleLike);
  elementDeleteButton.addEventListener('click', deleteCard);

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


function createCard(card) {
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  const elementItem = element.querySelector('.element__title');
  const elementImage = element.querySelector('.element__image');
  const elementLikeButton = element.querySelector('.element__button-like');
  const elementDeleteButton = element.querySelector('#element__button-delete');
  const profile = document.querySelector('.profile');
  const userId = profile.getAttribute('data-id');


  elementItem.textContent = card.name;
  element.setAttribute('data-id', card._id);
  elementImage.src = card.link;
  elementImage.alt = card.name;
  return element
}

Promise.All([getInitialCards(), getProfileInfo()])


  .then(function ([profileInfo, cards]) {
    nameField.textContent = profileInfo.name;
    aboutField.textContent = profileInfo.about;
    userId = profileInfo._id;
    cards.forEach((card) => {
      cardsContainer.prepend(createCard(card))
    })
    console.log(profileInfo)
    console.log(cards)
  })
  .catch((err) => {
    console.log(`Ошибка в загрузке профиля: ${err}`)
  })

*/