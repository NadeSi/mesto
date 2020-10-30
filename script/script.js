import {initialCards, validationParameters} from './constants.js';
import {enableValidation, cleanInputErrors} from './validate.js';

debugger;

const buttonEditElement = document.querySelector('.button_type_edit');
const buttonAddCardElement = document.querySelector('.button_type_add');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const cardListElement = document.querySelector('.elements');

const cardTemplate = document.querySelector('#template-card').content;

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

/*.popup_type_view-card*/
const popupViewCardElement = document.querySelector('.popup_type_view-card');
const buttonClosePopupViewCardElement = popupViewCardElement.querySelector('.button_type_close');

const handleKeyEscape = (evt) => {
    if(evt.key === "Escape") {
        closePopup(evt.currentTarget.querySelector('.popup_opened'));
    }
};

const handleMisclick = (evt) => {
    if(evt.target === document.querySelector('.popup_opened')) {
        closePopup(evt.currentTarget);
    }
};

function fillEditProfilePopupContainer() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function fillViewCardPopupContainer(popupElement, event) {
    const currentImgElement = event.target;
    const currentTextElement = event.target.nextElementSibling.querySelector('.element__text');

    const img = popupElement.querySelector('.view-card__img');
    img.src = currentImgElement.src;
    img.alt = currentImgElement.alt;

    popupElement.querySelector('.view-card__text').textContent = currentTextElement.textContent;
}

function cleanAddFormContainer() {
    inputCardName.value = '';
    inputCardUrl.value = '';
}

function openPopup(popupElement) {
    popupElement && popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleKeyEscape);
}

function closePopup(popupElement) {
    document.removeEventListener('keydown', handleKeyEscape);
    popupElement && popupElement.classList.remove('popup_opened');
    cleanInputErrors(popupElement);
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

function createCard(text, imgUrl) {
    const cardElement = cardTemplate.cloneNode(true);

    const handleImgClick = function (event) {
        fillViewCardPopupContainer(popupViewCardElement, event);
        openPopup(popupViewCardElement)
    };

    if (imgUrl) {
        const img = cardElement.querySelector('.element__img');
        img.src = imgUrl;
        img.alt = text;
        img.addEventListener('click', handleImgClick);
    }

    cardElement.querySelector('.element__text').textContent = text;

    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        const element = evt.target;
        element.classList.toggle('element__like_active');
    });

    cardElement.querySelector('.element__delete-card').addEventListener('click', function (evt) {
        const element = evt.target;
        element.parentElement.remove();
    });

    return cardElement;
}

function addNewCard(text, imgUrl) {
    cardListElement.prepend(createCard(text, imgUrl));
}

function initCardList() {
    initialCards.forEach(card => addNewCard(card.name, card.link));
}


initCardList();
enableValidation(validationParameters);

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

/*.popup_type_view-card*/
popupViewCardElement.addEventListener('click', handleMisclick);
buttonClosePopupViewCardElement.addEventListener('click', () => closePopup(popupViewCardElement));


