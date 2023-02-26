import { closePopup, popupPlace } from "./modal.js";
import { createCard, renderCards } from './cards.js';

export { config, getInitialCards, getProfileInfo, updateProfileInfo, downloadNewCard, deleteCard }
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-21',
    headers: {
        authorization: 'fc93c77d-0a8c-4b02-a6a2-8885f6c1bc09',
        'Content-type': 'application/json'
    }
}

fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
    .then((res) => {
        return res.json()
    })

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
        .then((res) => {
            res.forEach((card) => {
                renderCards(card)
            })
        })
        .catch((err) => {
            console.log(`Ошибка в загрузке карточек: ${err}`)
        })
}

function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse)
        .catch((err) => {
            console.log(`Ошибка в загрузке профиля: ${err}`)
        })
}

function updateProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userData.name,
            about: userData.about
        })
    })
        .then(handleResponse)
        .catch((err) => {
            console.log(`Ошибка в обновлении профиля: ${err}`)
        })
}

function downloadNewCard(item) {
    fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: item.name,
            link: item.link,
        })
    })
        .then(handleResponse)
        .then((res) => {
            createCard(res);
            closePopup(popupPlace);
        })
        .catch((err) => {
            console.log(`Ошибка в добавлении карточки: ${err}`)
        })
}
function deleteCard(card) {
    fetch(`${config.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(`Ошибка не удалось удалить карточку. ${err}`)
        })
}