import { cardTemplate } from '../index';
import { deleteCard, putLikeCard, removeLike } from './api';

function createCard(element, { removeCard, likeCard, openImagePopup, myId } ) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;

  const likesCount = Array.isArray(element.likes) ? element.likes.length : 0;
  cardElement.querySelector('.card__likes-number').textContent = likesCount;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardDescription = cardElement.querySelector('.card__description');
  const likeButton = cardDescription.querySelector('.card__like-button');

  if (element.owner && element.owner._id === myId) {
    deleteButton.classList.add('card__delete-button_active');
  }

  if (Array.isArray(element.likes)) {
    element.likes.forEach((elem) => {
      if (elem._id === myId) {
        likeButton.classList.add('card__like-button_is-active');
      }
    });
  }

  deleteButton.addEventListener('click', (evt) => removeCard(evt, element._id));
  likeButton.addEventListener('click', (evt) => likeCard(evt, element._id));
  cardImage.addEventListener('click', () => openImagePopup(element));

  return cardElement;
};

function removeCard(evt, card) {
  const cardElement = evt.target.closest('.places__item');
  cardElement.remove();
  deleteCard(card);
}

function likeCard(evt, cardId) {
  const likeElement = evt.target;
  const cardElement = likeElement.closest('.places__item');
  const likedCardNumber = cardElement.querySelector('.card__likes-number');
  
  if (!evt.target.classList.contains('card__like-button_is-active')) {
    putLikeCard(cardId)
      .then((updatedCard) => {
        likeElement.classList.add('card__like-button_is-active');
        likedCardNumber.textContent = updatedCard.likes.length;
      })
      .catch((err) => {console.log(err)});
  } else {
    removeLike(cardId)
      .then((updatedCard) => {
        likeElement.classList.remove('card__like-button_is-active');
        likedCardNumber.textContent = updatedCard.likes.length;
      })
      .catch((err) => {console.log(err)});
  }
} 


export { createCard, removeCard, likeCard };