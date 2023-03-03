import { openPopup, closePopup, popupPlace, popupImage, popupDeleteConfirm, popupButtonSubmit } from './modal.js'
import { downloadNewCard, deleteCard, putLikeCard, removeLikeCard } from './api.js';
import { renderLoading } from './utils.js'
import { userId } from './profile.js'

const formCreateCards = document.forms.form__place;
const cardsContainer = document.querySelector('.elements');
const popupDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#element-template').content;
const cardImage = document.querySelector('.popup__card-image');
const placeInput = document.querySelector('.place-input');
const linkInput = document.querySelector('.link-input');


// Функции для лайков и дислайков через апи.

function handleCardPutLike(element, button, count) {
  putLikeCard(element)
    .then((res) => {
      button.classList.add('element__button-like_active')
      count.textContent = res.likes.length
    })
    .catch((err) => {
      console.log(`Ошибка в добавлении лайка. ${err}`)
    })
}

function handleCardRemoveLike (element, button, count) {
  removeLikeCard(element)
    .then((res) => {
      button.classList.remove('element__button-like_active')
      count.textContent = res.likes.length
    })
    .catch((err) => {
      console.log(`Ошибка в удалении лайка. ${err}`)
    })
}


function createCard(card) {
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  const elementItem = element.querySelector('.element__title');
  const elementImage = element.querySelector('.element__image');
  const elementLikeButton = element.querySelector('.element__button-like');
  const elementDeleteButton = element.querySelector('#element__button-delete');
  const elementLikeNumber = element.querySelector('.element__like-number');

  elementItem.textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementLikeNumber.textContent = card.likes.length;

  // Добавляем попап-картинку
  elementImage.addEventListener('click', function () {
    popupDescription.textContent = card.name;;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    openPopup(popupImage);
  });

  // Удаление карточки пользователя
  if (card.owner._id !== userId) {
    elementDeleteButton.remove()
  }

  elementDeleteButton.addEventListener('click', () => {
    deleteCard(card)
      .then(() => {
        element.remove()
    })
      .catch((err) => {
        console.log(`Ошибка не удалось удалить карточку. ${err}`)
    })
  })


// Лайки
  const likes = Array.from(card.likes);
  likes.forEach((item) => {
    if (item._id == userId) {
      elementLikeButton.classList.add('element__button-like_active')
    }
  })

  elementLikeButton.addEventListener('click', () => {
    if (elementLikeButton.classList.contains('element__button-like_active')) {
      handleCardRemoveLike(card, elementLikeButton, elementLikeNumber)
    }
    else {
      handleCardPutLike(card, elementLikeButton, elementLikeNumber)
    }
  })

  return element;
};

function renderCards(card) {
  const element = createCard(card)
  cardsContainer.prepend(element)
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupPlace, 'Сохранение...')
  const card = {
    name: placeInput.value,
    link: linkInput.value
  }
    downloadNewCard(card)
      .then((res) => {
        renderCards(res)
        closePopup(popupPlace);
        evt.target.reset();
  })
      .catch((err) => {
        console.log(`Ошибка в добавлении карточки: ${err}`)
  })
      .finally(() => {
        renderLoading(false, popupPlace)
  })
}

export { deleteCard, createCard, renderCards, cardsContainer, formCreateCards, handleCardSubmit, popupDescription, cardImage }


// Попап удаления карточки(реализовать позже)
/*
elementDeleteButton.addEventListener('click', () => {
  openPopup(popupDeleteConfirm)
  popupButtonSubmit.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderLoading(true, popupDeleteConfirm, 'Удаление...')
    deleteCard(card)
      .then(() => {
        element.remove()
        closePopup(popupDeleteConfirm)
    })
      .catch((err) => {
        console.log(`Ошибка не удалось удалить карточку. ${err}`)
    })
      .finally(() => {
        renderLoading(false, popupDeleteConfirm)
    })
  })
})
// Рабочая функция удаления
  elementDeleteButton.addEventListener('click', () => {
      deleteCard(card)
        .then(() => {
          element.remove()
      })
        .catch((err) => {
          console.log(`Ошибка не удалось удалить карточку. ${err}`)
      })
    })


*/
