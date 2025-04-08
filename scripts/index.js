const cardTemplate = document.querySelector('#card-template').content;
const placesItem = document.querySelector('.places__list');

function createCard(element, callback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', callback);

  return cardElement;
};

function removeCard(event) {
  event.target.closest('.places__item').remove();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard);
  placesItem.append(card);
});