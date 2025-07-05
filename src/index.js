import './pages/index.css';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation} from './components/validation';
import { changeProfileInfo, getInitialCards, addNewCard, fetchInitialData, getProfileInfo, changeProfileImage } from './components/api';

const cardTemplate = document.querySelector('#card-template').content;
const placesItem = document.querySelector('.places__list');

const editProfileForm = document.querySelector('[name="edit-profile"]');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');
const formNewPlace = document.querySelector('[name="new-place"]');
const placeInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');
const editAvatar = document.querySelector('[name="new-avatar"]');
const avatarInput = editAvatar.querySelector('.popup__input_type_url');

const popups = document.querySelectorAll('.popup');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const avatarPopup = document.querySelector('.popup_type_new-avatar');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const formValidationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

fetchInitialData(getProfileInfo, getInitialCards)
    .then(([profileInfo, cards]) => {
        profileTitle.textContent = profileInfo.name;
        profileDescription.textContent = profileInfo.about;
        profileImage.setAttribute('style', `background-image: url(${profileInfo.avatar})`);
        return cards.forEach((cardData) => {
            const card = createCard(cardData, {
              removeCard,
              likeCard,
              openImagePopup, 
              myId: profileInfo._id
            });
            placesItem.append(card);
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
  const initialText = 'Сохранить'
  const loadingText = 'Сохранение...'
  
 if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = initialText;
  }
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

profileImage.addEventListener('click', function() {
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

  changeProfileInfo({
    name: nameValue,
    about: jobValue
  })
    .then((res) => {
      console.log('Профиль отредактирован', res),
      document.querySelector('.profile__title').textContent = nameValue,
      document.querySelector('.profile__description').textContent = jobValue,
      closeModal(popupEdit)
    })
    .catch((err) => {
      console.log('Ошибка при редактировании профиля', err)
    })
    .finally(() => {
      renderLoading(false, editProfileForm)
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
    console.log('Аватар отредактирован', updatedImage),
    profileImage.setAttribute('style', `background-image: url(${updatedImage.avatar})`),
    editAvatar.reset(),
    closeModal(avatarPopup)
  })
  .catch((err) => {
      console.log('Ошибка при редактировании аватара', err)
    })
  .finally(() => {
    renderLoading(false, editAvatar)
  })
}

editAvatar.addEventListener('submit', editProfileAvatar);

function imageFormSubmit(evt) {
  evt.preventDefault(); 

  renderLoading(true, formNewPlace)

  const newPlaceArr = { name: placeInput.value, alt: placeInput.value, link: linkInput.value };

  addNewCard({
    name: newPlaceArr.name,
    link: newPlaceArr.link
  })
  .then((res) => {
      console.log('Новая карточка создана', res)
      const card = createCard(res, {
        removeCard,
        likeCard,
        openImagePopup,
        myId: res.owner._id
      });
      placesItem.prepend(card);

      formNewPlace.reset(),
      closeModal(popupNewCard)
    })
  .catch((err) => {
      console.log('Ошибка при создании новой карточки', err)
    })
  .finally(() => {
    renderLoading(false, formNewPlace)
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

export { cardTemplate, openImagePopup, placesItem, nameInput, jobInput, profileTitle, profileDescription, profileImage, formValidationConfig }