import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';

const cardTemplate = document.querySelector('#card-template').content;
const placesItem = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const editProfileForm = document.querySelector('[name="edit-profile"]');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, likeCard, openImagePopup );
  placesItem.append(card);
});

addButton.addEventListener('click', function() {
  openModal(popupNewCard);
});

editButton.addEventListener('click', function() {
  openModal(popupEdit);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
});

closeButtons.forEach((button) => {
  button.addEventListener('click', function() {
    const openedPopup = button.closest('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  })
})

function editFormSubmit(evt) {
  evt.preventDefault(); 
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  document.querySelector('.profile__title').textContent = nameValue;
  document.querySelector('.profile__description').textContent = jobValue;

  popupEdit.classList.remove('popup_is-opened');
}

editProfileForm.addEventListener('submit', editFormSubmit); 

const formNewPlace = document.querySelector('[name="new-place"]');
const placeInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

function imageFormSubmit(evt) {
  evt.preventDefault(); 
  const newPlaceArr = { name: placeInput.value, alt: placeInput.value, link: linkInput.value };
  
  const card = createCard(newPlaceArr, removeCard); 
  placesItem.prepend(card);

  formNewPlace.reset();
  popupNewCard.classList.remove('popup_is-opened');
}

formNewPlace.addEventListener('submit', imageFormSubmit); 

function openImagePopup(imageData) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');
    openModal(popupTypeImage);
    popupImage.src = imageData.link;
    popupImage.alt = imageData.name;
    popupCaption.textContent = imageData.name;
}

export { cardTemplate }