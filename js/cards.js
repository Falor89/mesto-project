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
//Добавление дефолтных карточек
initialCards.forEach((item) => {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const likeButton = cardElement.querySelector('.element__button-like');
  const deleteButton = cardElement.querySelector('#element__button-delete');
  const elementItem = cardElement.querySelector('.element__title');
  const elementImage = cardElement.querySelector('.element__image');
  const cardImage = document.querySelector('.popup__card-image');

  elementItem.textContent = item.name;
  elementImage.src = item.link;

  elementImage.addEventListener('click', function () {
    popupDescription.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    openPopup(popupBigImage);
  })

  likeButton.addEventListener('click', cardLike);
  deleteButton.addEventListener('click', cardDelete);

  cardsElements.append(cardElement);
});
