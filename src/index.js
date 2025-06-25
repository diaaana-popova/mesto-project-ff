import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, removeCard, likeCard } from './components/card';
import { popupEdit, popupNewCard, openModal } from './components/modal';

const cardTemplate = document.querySelector('#card-template').content;
const placesItem = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, likeCard, openImagePopup );
  placesItem.append(card);
});

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  document.querySelector('.profile__title').textContent = nameValue;
  document.querySelector('.profile__description').textContent = jobValue;

  popupEdit.classList.remove('popup_is-opened');
}

formElement.addEventListener('submit', handleFormSubmit); 

const formNewPlace = document.querySelector('[name="new-place"]');
const placeInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

function ImageFormSubmit(evt) {
  evt.preventDefault(); 
  const newPlaceArr = { name: placeInput.value, alt: placeInput.value, link: linkInput.value };
  
  const card = createCard(newPlaceArr, removeCard); 
  placesItem.prepend(card);

  placeInput.value = '';
  linkInput.value = '';
  popupNewCard.classList.remove('popup_is-opened');
}

formNewPlace.addEventListener('submit', ImageFormSubmit); 

function openImagePopup(image) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');
    openModal(popupTypeImage);
    popupImage.src = image.link;
    popupImage.alt = image.name;
    popupCaption.textContent = image.name;
}

export { placesItem, popups, cardTemplate, openImagePopup, nameInput, jobInput }