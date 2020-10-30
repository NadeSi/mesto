const hasInvalidInput = (inputList) => inputList.some((inputElement) => {
    return !inputElement.validity.valid;
});

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

const showInputError = (formElement, inputElement, mapSelectors, errorMessage) => {
    const {inputErrorClass, errorClass} = mapSelectors;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, mapSelectors) => {
    const {inputErrorClass, errorClass} = mapSelectors;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, mapSelectors) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, mapSelectors);
    } else {
        showInputError(formElement, inputElement, mapSelectors, inputElement.validationMessage);
    }
};

const setEventListeners = (formElement, mapSelectors) => {
    const {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = mapSelectors;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

export const cleanInputErrors = (popupElement, validationParameters) => {
    const {formSelector, inputSelector, inputErrorClass, errorClass} = validationParameters;
    const form = popupElement.querySelector(formSelector);
    if(form) {
        const inputList = form.querySelectorAll(inputSelector);
        inputList.forEach(inputElement => hideInputError(form, inputElement, {inputErrorClass, errorClass}));
    }
}

export const enableValidation = (mapSelectors) => {
    // const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = mapSelectors;
    const formList = Array.from(document.querySelectorAll(mapSelectors.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, mapSelectors);
    });
};
