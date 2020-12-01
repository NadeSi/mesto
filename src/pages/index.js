import './index.css';

import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';

import {
    initialCards,
    userInfoSelectors,
    popupSelectors,
    validationParameters,
    CARD_TEMPLATE_SELECTOR,
    CARD_LIST_SELECTOR,
} from '../utils/constants.js';
import PopupWithImage from "../components/PopupWithImage";

const userInfo = new UserInfo(userInfoSelectors);

const cardList = new Section({
        items: initialCards,
        renderer: ({name, link}) => {
            addNewCard(name, link);
        }
    },
    CARD_LIST_SELECTOR
);

const buttonEditElement = document.querySelector('.button_type_edit');
const buttonAddCardElement = document.querySelector('.button_type_add');

const popupEditProfile = new PopupWithForm(popupSelectors.editProfile, handleFormEditSubmit);
const popupAddCard = new PopupWithForm(popupSelectors.addCard, handleFormAddSubmit);
const popupViewCard = new PopupWithImage(popupSelectors.viewCard);

function init() {
    cardList.renderItems();
    setElementListeners();

    //fillEditProfilePopupContainer();
    initValidation(validationParameters);
}

function setElementListeners() {
    popupEditProfile.setEventListeners();
    popupAddCard.setEventListeners();
    popupViewCard.setEventListeners();

    buttonEditElement.addEventListener('click', handleButtonEditElement);
    buttonAddCardElement.addEventListener('click', (event) => {
        popupAddCard.open(event)
    });
}

function handleFormEditSubmit(event, inputValues) {
    userInfo.setUserInfo({
        userName: inputValues['edit-profile-name'],
        userDescription: inputValues['edit-profile-description']
    });

    popupEditProfile.close();
}

function handleFormAddSubmit(event, inputValues) {
    addNewCard(inputValues['add-card-name'], inputValues['add-card-url']);
    popupAddCard.close();
}

function addNewCard(text, imgUrl) {
    const card = new Card({text, imgUrl}, CARD_TEMPLATE_SELECTOR, (event) => {
        popupViewCard.open(event)
    });
    cardList.addItem(card.generateCard(), false);
}

function fillEditProfilePopupContainer() {
    const {userName, userDescription} = userInfo.getUserInfo();
    const editProfileInputValues = {};
    editProfileInputValues['edit-profile-name'] = userName;
    editProfileInputValues['edit-profile-description'] = userDescription;

    popupEditProfile.setInputValues(editProfileInputValues);
}

function handleButtonEditElement() {
    fillEditProfilePopupContainer();
    popupEditProfile.open();
}

function initValidation(mapSelectors) {
    const formList = Array.from(document.querySelectorAll(mapSelectors.formSelector));

    formList.forEach((formElement) => {
        const formElementValidation = new FormValidator(mapSelectors, formElement);
        formElementValidation.enableValidation();
    });
}


init();

