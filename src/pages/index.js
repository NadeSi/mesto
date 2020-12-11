import './index.css';

import Api from '../server/Api.js';

import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from "../components/PopupWithImage";
import PopupWithSubmit from "../components/PopupWithSubmit";

import {
    TOKEN, BASE_URL
} from '../server/server-constants.js';

import {
    userInfoSelectors,
    popupSelectors,
    validationParameters,
    CARD_TEMPLATE_SELECTOR,
    CARD_LIST_SELECTOR,
} from '../utils/constants.js';

const api = new Api({
    baseUrl: BASE_URL,
    headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
    }
});

const buttonEditAvatarElement = document.querySelector('.button_type_edit-avatar');
const buttonEditElement = document.querySelector('.button_type_edit');
const buttonAddCardElement = document.querySelector('.button_type_add');

const popupEditAvatar = new PopupWithForm(popupSelectors.editAvatar, handleFormEditAvatarSubmit);
const popupEditProfile = new PopupWithForm(popupSelectors.editProfile, handleFormEditSubmit);
const popupAddCard = new PopupWithForm(popupSelectors.addCard, handleFormAddSubmit);
const popupViewCard = new PopupWithImage(popupSelectors.viewCard);
const popupDeleteCard = new PopupWithSubmit(popupSelectors.deleteCard, handleFormDelete);

const formValidationEditAvatar = new FormValidator(validationParameters, '#popup-edit-avatar');
const formValidationEditProfile = new FormValidator(validationParameters, '#popup-edit-profile');
const formValidationAddCard = new FormValidator(validationParameters, '#popup-add-card');

const userInfo = new UserInfo(userInfoSelectors);

const cardList = new Section({
        items: [],
        renderer: (data) => {
            addNewCard(data, true);
        },
    },
    CARD_LIST_SELECTOR
);

const showError = (error) => {
    console.log(error);
};

function init() {
    const initCards = api.getInitialCards();
    const fillProfile = api.getUserInfo();

    Promise.all([initCards, fillProfile]
    ).then((result) => {
        const cards = result[0];
        const userInfo = result[1];

        setUserInfo(userInfo);
        cardList.renderItems(cards);

        setElementListeners();
        initValidation();
    }).catch((error) => {
        showError(error);
    });
}

function setUserInfo({name, about, avatar, _id}) {
    userInfo.setUserInfo({
        userName: name,
        userDescription: about,
        userAvatarUrl: avatar,
        _id,
    });
}

function setElementListeners() {
    popupEditAvatar.setEventListeners();
    popupEditProfile.setEventListeners();
    popupAddCard.setEventListeners();
    popupViewCard.setEventListeners();
    popupDeleteCard.setEventListeners();

    buttonEditAvatarElement.addEventListener('click', handleButtonEditAvatarElement);
    buttonEditElement.addEventListener('click', handleButtonEditElement);
    buttonAddCardElement.addEventListener('click', handleButtonAddCardElement);
}

function initValidation() {
    formValidationEditAvatar.enableValidation();
    formValidationEditProfile.enableValidation();
    formValidationAddCard.enableValidation();
}

function handleFormEditAvatarSubmit(event, inputValues) {
    popupEditAvatar.setSubmitButtonText('Сохранение...');
    api.setUserAvatar(inputValues['edit-avatar-url'])
        .then(info => {
            setUserInfo(info);
            popupEditAvatar.close();
        })
        .catch((error) => {
            showError(error)
        })
        .finally(() => {
            popupEditAvatar.setSubmitButtonText('Сохранить');
        })
}

function handleFormEditSubmit(event, inputValues) {
    popupEditProfile.setSubmitButtonText('Сохранение...');
    api.setUserInfo({
        name: inputValues['edit-profile-name'],
        about: inputValues['edit-profile-description']
    })
        .then(info => {
            setUserInfo(info);
            popupEditProfile.close();
        })
        .catch((error) => {
            showError(error)
        })
        .finally(() => {
            popupEditProfile.setSubmitButtonText('Сохранить');
        })
}

function handleFormAddSubmit(event, inputValues) {
    popupAddCard.setSubmitButtonText('Сохранение...');
    api.addNewCard({
        name: inputValues['add-card-name'],
        link: inputValues['add-card-url']
    })
        .then((card) => {
            addNewCard(card);
            popupAddCard.close();
        })
        .catch((error) => {
            showError(error)
        })
        .finally(() => {
            popupAddCard.setSubmitButtonText('Создать');
        })
}

function handleFormDelete(cardId, submitCallBack) {
    api.deleteCard(cardId)
        .then((result) => {
            console.log(result);
            submitCallBack();
            popupDeleteCard.close();
        })
        .catch((error) => {
            showError(error)
        })
}

function addNewCard(card, defaultDirection = false) {
    const newCard = new Card(card, CARD_TEMPLATE_SELECTOR, () => {
            popupViewCard.open({text: card.name, imgUrl: card.link})
        },
        (cardId, submitCallBack) => {
            popupDeleteCard.setSubmitCallBack(() => handleFormDelete(cardId, submitCallBack));
            popupDeleteCard.open()
        },
        (cardId, callBack) => {
            api.addLikeCard(cardId)
                .then(result => {
                    callBack(result)
                })
                .catch((error) => {
                    showError(error)
                })
        },
        (cardId, callBack) => {
            api.deleteLikeCard(cardId)
                .then(result => {
                    callBack(result);
                })
                .catch((error) => {
                    showError(error)
                })
        }
    );

    cardList.addItem(newCard.generateCard(userInfo.getUserId()), defaultDirection);
}

function fillEditProfilePopupContainer() {
    const {userName, userDescription} = userInfo.getUserInfo();
    const editProfileInputValues = {};
    editProfileInputValues['edit-profile-name'] = userName;
    editProfileInputValues['edit-profile-description'] = userDescription;

    popupEditProfile.setInputValues(editProfileInputValues);
}

function handleButtonEditAvatarElement() {
    formValidationEditAvatar.cleanInputs();
    formValidationEditAvatar.toggleButtonState();
    popupEditAvatar.open();
}

function handleButtonEditElement() {
    formValidationEditProfile.cleanInputs();
    fillEditProfilePopupContainer();
    formValidationEditProfile.toggleButtonState();
    popupEditProfile.open();
}

function handleButtonAddCardElement() {
    formValidationAddCard.cleanInputs();
    formValidationAddCard.toggleButtonState();
    popupAddCard.open()
}


init();

