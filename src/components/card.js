import { cardTemplate } from '../index';
import { deleteCard, putLikeCard, removeLike } from './api';

function createCard(element, { removeCard, likeCard, openImagePopup } ) {
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

  deleteButton.addEventListener('click', (evt) => removeCard(evt.target.closest('.places__item'), element._id));
  likeButton.addEventListener('click', (evt) => likeCard(evt, element._id));
  cardImage.addEventListener('click', () => openImagePopup(element));

  return cardElement;
};

function removeCard(placesItem, card) {
  placesItem.remove();
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