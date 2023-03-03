
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-21',
    headers: {
        authorization: 'fc93c77d-0a8c-4b02-a6a2-8885f6c1bc09',
        'Content-type': 'application/json'
    }
}

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse)
}

function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse)
}

function updateProfileInfo(nameInput, aboutInput) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput.value,
            about: aboutInput.value
        })
    })
        .then(handleResponse)
}

function downloadNewCard(item) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: item.name,
            link: item.link,
        })
    })
        .then(handleResponse)
}
function deleteCard(card) {
    return fetch(`${config.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse)
}

function putLikeCard(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(handleResponse)
}

function removeLikeCard(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponse)
}

function updateProfileAvatar(avatarInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value
    })
  })
    .then(handleResponse)
}

export { config, getInitialCards, getProfileInfo, updateProfileInfo, downloadNewCard, deleteCard, putLikeCard, removeLikeCard, updateProfileAvatar }
