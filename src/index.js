import './pages/index.css';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation, formValidationConfig } from './components/validation';
import { changeProfileInfo, getInitialCards, addNewCard, fetchInitialData, getProfileInfo, changeProfileImage } from './components/api';

const cardTemplate = document.querySelector('#card-template').content;
const placesItem = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const editProfileForm = document.querySelector('[name="edit-profile"]');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const formNewPlace = document.querySelector('[name="new-place"]');
const placeInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const avatarImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_new-avatar');
const editAvatar = document.querySelector('[name="new-avatar"]');
const avatarInput = editAvatar.querySelector('.popup__input_type_url');

fetchInitialData(getProfileInfo, getInitialCards)
    .then(([myId, cards]) => {
        return cards.forEach((cardData) => {
            const card = createCard(cardData, removeCard, likeCard, openImagePopup);
            placesItem.append(card);

            const deleteButton = card.querySelector('.card__delete-button');
            if (cardData.owner._id === myId) {
                deleteButton.classList.add('card__delete-button_active');
            }

            const likeButton = card.querySelector('.card__like-button');
            cardData.likes.forEach((elem) => {
                if (elem._id === myId) {
                    likeButton.classList.add('card__like-button_is-active');
                }
            }
            )
        })
    })
    .catch((err) => {
        console.log(err);
    });

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})

enableValidation(); 

function renderLoading(isLoading, form) {
  const submitButton = form.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  const loadingText = 'Сохранение...'
  submitButton.textContent = isLoading ? loadingText : initialText;
}

addButton.addEventListener('click', function() {
  openModal(popupNewCard);
  formNewPlace.reset();
  clearValidation(formNewPlace, formValidationConfig);
});

editButton.addEventListener('click', function() {
  openModal(popupEdit);
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  clearValidation(editProfileForm, formValidationConfig);
});

avatarImage.addEventListener('click', function() {
  openModal(avatarPopup);
})

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

  renderLoading(true, editProfileForm)
  
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  document.querySelector('.profile__title').textContent = nameValue;
  document.querySelector('.profile__description').textContent = jobValue;

  changeProfileInfo({
    name: nameValue,
    about: jobValue
  })
    .then((res) => {
      console.log('Профиль отредактирован', res)
    })
    .catch((err) => {
      console.log('Ошибка при редактировании профиля', err)
    })
    .finally(() => {
      renderLoading(false, editProfileForm),
      closeModal(popupEdit)
    })
}

editProfileForm.addEventListener('submit', editFormSubmit);

function editProfileAvatar(evt) {
  evt.preventDefault();

  renderLoading(true, editAvatar)

  const avatarValue = avatarInput.value;
  changeProfileImage({
    avatar: avatarValue
  })
  .then((updatedImage) => {
    profileImage.setAttribute('style', `background-image: url(${updatedImage.avatar})`);
  })
  .then((res) => {
      console.log('Аватар отредактирован', res)
    })
  .catch((err) => {
      console.log('Ошибка при редактировании аватара', err)
    })
  .finally(() => {
    renderLoading(false, editAvatar),
    editAvatar.reset(),
    closeModal(avatarPopup)
  })
}

editAvatar.addEventListener('submit', editProfileAvatar);

function imageFormSubmit(evt) {
  evt.preventDefault(); 

  renderLoading(true, formNewPlace)

  const newPlaceArr = { name: placeInput.value, alt: placeInput.value, link: linkInput.value };
  
  const card = createCard(newPlaceArr, removeCard); 
  placesItem.prepend(card);

  clearValidation(formNewPlace, formValidationConfig);

  addNewCard({
    name: newPlaceArr.name,
    link: newPlaceArr.link
  })
  .then((res) => {
      console.log('Новая карточка создана', res)
    })
  .catch((err) => {
      console.log('Ошибка при создании новой карточки', err)
    })
  .finally(() => {
    renderLoading(false, formNewPlace),
    formNewPlace.reset(),
    closeModal(popupNewCard)
  })
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

export { cardTemplate, openImagePopup, placesItem, nameInput, jobInput, profileTitle, profileDescription, profileImage }