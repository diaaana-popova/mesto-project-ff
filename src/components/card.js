import { cardTemplate } from '../index';

function createCard(element, removeCard, likeCard, openImagePopup) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardDescription = cardElement.querySelector('.card__description');
  const likeButton = cardDescription.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  deleteButton.addEventListener('click', removeCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => openImagePopup(element));

  return cardElement;
};

function removeCard(evt) {
  evt.target.closest('.places__item').remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}


export { createCard, removeCard, likeCard };