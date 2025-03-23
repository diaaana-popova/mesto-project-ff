const cardTemplate = document.querySelector('#card-template').content;
const placesItem = document.querySelector('.places__list');

function cardAppend(element, callback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');

  placesItem.append(cardElement);

  deleteButton.addEventListener('click', callback);
};

function removeCard(event) {
  event.target.parentElement.remove();
}

initialCards.forEach((cardData) => {
  cardAppend(cardData, removeCard);
});