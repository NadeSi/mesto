import {initialCards, validationParameters, CARD_TEMPLATE_SELECTOR} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const popupOperations = {
    open: openPopup,
    close: closePopup,
    misclick: handleMisclick,
};

const buttonEditElement = document.querySelector('.button_type_edit');
const buttonAddCardElement = document.querySelector('.button_type_add');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const cardListElement = document.querySelector('.elements');

/*.popup-edit-profile*/
const popupEditProfileElement = document.querySelector('.popup_type_edit-profile');
const buttonClosePopupEditProfileElement = popupEditProfileElement.querySelector('.button_type_close');
const inputName = popupEditProfileElement.querySelector('.popup__input_field_name');
const inputDescription = popupEditProfileElement.querySelector('.popup__input_field_description');

/*.popup_type_add-card*/
const popupAddCardElement = document.querySelector('.popup_type_add-card');
const buttonClosePopupAddCardElement = popupAddCardElement.querySelector('.button_type_close');
const inputCardName = popupAddCardElement.querySelector('.popup__input_field_name');
const inputCardUrl = popupAddCardElement.querySelector('.popup__input_field_url');

const handleKeyEscape = (evt) => {
    if(evt.key === "Escape") {
        closePopup(evt.currentTarget.querySelector('.popup_opened'));
    }
};

function handleMisclick(evt) {
    if(evt.target === document.querySelector('.popup_opened')) {
        closePopup(evt.currentTarget);
    }
}

function fillEditProfilePopupContainer() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function cleanAddFormContainer() {
    inputCardName.value = '';
    inputCardUrl.value = '';
}

function openPopup(popupElement) {
    popupElement && popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleKeyEscape);
}

export const cleanInputErrors = (popupElement, validationParameters) => {
    const {formSelector, inputSelector, inputErrorClass, errorClass} = validationParameters;
    const formElement = popupElement.querySelector(formSelector);
    if(formElement) {
        const inputList = formElement.querySelectorAll(inputSelector);
        inputList.forEach(inputElement => {
            const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
            inputElement.classList.remove(inputErrorClass);
            errorElement.classList.remove(errorClass);
            errorElement.textContent = '';
        });
    }
};

function closePopup(popupElement) {
    document.removeEventListener('keydown', handleKeyEscape);
    popupElement && popupElement.classList.remove('popup_opened');
    cleanInputErrors(popupElement, validationParameters);
}

function handleButtonEditElement() {
    fillEditProfilePopupContainer();
    openPopup(popupEditProfileElement);
}

function handleButtonAddCardElement() {
    cleanAddFormContainer();
    openPopup(popupAddCardElement);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    addNewCard(inputCardName.value, inputCardUrl.value);

    closePopup(popupAddCardElement);
}

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    closePopup(popupEditProfileElement);
}

function addNewCard(text, imgUrl) {
    const card = new Card({text, imgUrl}, CARD_TEMPLATE_SELECTOR, popupOperations);
    cardListElement.prepend(card.generateCard());
}

function initCardList() {
    initialCards.forEach(card => addNewCard(card.name, card.link));
}

function initValidation(mapSelectors){
    const formList = Array.from(document.querySelectorAll(mapSelectors.formSelector));

    formList.forEach((formElement) => {
        const formElementValidation = new FormValidator(mapSelectors, formElement);
        formElementValidation.enableValidation();
    });
}

initCardList();
fillEditProfilePopupContainer();
initValidation(validationParameters);

/*.popup-edit-profile*/
popupEditProfileElement.addEventListener('submit', handleFormEditSubmit);
popupEditProfileElement.addEventListener('click', handleMisclick);
buttonEditElement.addEventListener('click', handleButtonEditElement);
buttonClosePopupEditProfileElement.addEventListener('click', () => closePopup(popupEditProfileElement));

/*.popup_type_add-card*/
popupAddCardElement.addEventListener('submit', handleFormAddSubmit);
popupAddCardElement.addEventListener('click', handleMisclick);
buttonAddCardElement.addEventListener('click', handleButtonAddCardElement);
buttonClosePopupAddCardElement.addEventListener('click', () => closePopup(popupAddCardElement));

