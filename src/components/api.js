import { profileTitle, profileDescription, profileImage } from '../index';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: 'e70fd6a8-d42d-48ec-a0a2-7c81d4db40dc',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
    if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
}

const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
    // .then((data) => {
    //     title.textContent = data.name;
    //     description.textContent = data.about;
    //     image.setAttribute('style', `background-image: url(${data.avatar})`);
    //     return data._id;
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
}

const fetchInitialData = (getProfileInfo, getInitialCards) => {
    return Promise.all([
        getProfileInfo(),
        getInitialCards()
    ])
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
}

const changeProfileInfo = (newProfileInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newProfileInfo.name,
            about: newProfileInfo.about
        })
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
}

const addNewCard = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
}

const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
}

const putLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
}

const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
}

const changeProfileImage = (newProfileImage) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newProfileImage.avatar
        })
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
    .catch((err) => {
        console.log(err);
    })
}


export { getProfileInfo, getInitialCards, changeProfileInfo, addNewCard, deleteCard, putLikeCard, removeLike, fetchInitialData, changeProfileImage }


