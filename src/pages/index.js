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

const formValidationEditProfile = new FormValidator(validationParameters, '#popup-edit-profile');
const formValidationAddCard = new FormValidator(validationParameters, '#popup-add-card');

function init() {
    cardList.renderItems();
    setElementListeners();
}

function setElementListeners() {
    popupEditProfile.setEventListeners();
    popupAddCard.setEventListeners();
    popupViewCard.setEventListeners();

    buttonEditElement.addEventListener('click', handleButtonEditElement);
    buttonAddCardElement.addEventListener('click', handleButtonAddCardElement);
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
    const card = new Card({text, imgUrl}, CARD_TEMPLATE_SELECTOR, () => {
        popupViewCard.open({text, imgUrl})
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
    formValidationEditProfile.cleanInputs();
    fillEditProfilePopupContainer();
    formValidationEditProfile.enableValidation();
    popupEditProfile.open();
}

function handleButtonAddCardElement() {
    formValidationAddCard.cleanInputs();
    formValidationAddCard.enableValidation();
    popupAddCard.open()
}


init();

