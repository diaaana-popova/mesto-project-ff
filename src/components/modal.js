import { nameInput, jobInput } from '../index';
import { popups } from '../index';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closeButton = document.querySelectorAll('.popup__close');

function openModal(popupType) {
  popupType.classList.add('popup_is-opened');
}

addButton.addEventListener('click', function() {
  openModal(popupNewCard);
});

editButton.addEventListener('click', function() {
  openModal(popupEdit);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
});

function closeModal(closeButton) {
  closeButton.addEventListener('click', function() {
    const popup = closeButton.closest('.popup_is-opened');
    if (popup) {
      popup.classList.remove('popup_is-opened');
    }
  })
};

closeButton.forEach(closeModal);

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    popups.forEach(function(popup) {
      if (popup.classList.contains('popup_is-opened')) {
        popup.classList.remove('popup_is-opened');
      }
    })
  }
  evt.target.removeEventListener('keydown', closeEsc);
}

document.addEventListener('keydown', closeEsc);

function closeOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    popups.forEach(function(popup) {
      if (popup.classList.contains('popup_is-opened')) {
        popup.classList.remove('popup_is-opened');
      }
    })
  }
  evt.target.removeEventListener('click', closeOverlay);
}

document.addEventListener('click', closeOverlay);


export { popupEdit, popupNewCard, editButton, addButton, openModal }
