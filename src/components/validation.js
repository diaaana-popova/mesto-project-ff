import { formValidationConfig } from '../index';

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(formValidationConfig.inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formValidationConfig.errorClass);
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.remove(formValidationConfig.inputErrorClass);
    inputElement.classList.remove(formValidationConfig.errorClass);
    errorElement.textContent = '';
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, formValidationConfig);
  } else {
      enableButton(buttonElement, formValidationConfig);
  }
}

const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(formValidationConfig.inputSelector));
    const buttonElement = formElement.querySelector(formValidationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    }) 
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
        inputElement.textContent = '';
    })
    disableButton(buttonElement, validationConfig);
    toggleButtonState(inputList, buttonElement);
}

export { enableValidation, clearValidation, formValidationConfig };