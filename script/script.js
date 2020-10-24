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

/*.popup_type_view-card*/
const popupViewCardElement = document.querySelector('.popup_type_view-card');
const buttonClosePopupViewCardElement = popupViewCardElement.querySelector('.button_type_close');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function fillEditProfilePopupContainer() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function fillViewCardPopupContainer(popupElement, event) {
    const currentImgElement = event.target;
    const currentTextElement = event.target.nextElementSibling.children[0];

    popupElement.querySelector('.view-card__img').src = currentImgElement.src;
    popupElement.querySelector('.view-card__img').alt = currentImgElement.alt;

    popupElement.querySelector('.view-card__text').textContent = currentTextElement.textContent;
}

function openPopup(popupElement, event) {
    if(popupElement.className.includes('popup_type_edit-profile')){
        fillEditProfilePopupContainer();
    }else if(popupElement.className.includes('popup_type_view-card')){
        fillViewCardPopupContainer(popupElement, event);
    }
    popupElement && popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement && popupElement.classList.remove('popup_opened');
}

function formAddSubmitHandler (evt) {
    evt.preventDefault();
    addNewCard(inputCardName.value, inputCardUrl.value);

    closePopup(popupAddCardElement);
}


function formEditSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    closePopup(popupEditProfileElement);
}

function addNewCard(text, imgUrl) {
    const cardTemplate = document.querySelector('#template-card').content;
    const cardElement = cardTemplate.cloneNode(true);

    if(imgUrl){
        const img = cardElement.querySelector('.element__img');
        img.src = imgUrl;
        img.alt = text;
        img.addEventListener('click', (event) => openPopup(popupViewCardElement, event));
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

    cardListElement.prepend(cardElement);
}

function initCardList() {
    initialCards.forEach(card => addNewCard(card.name, card.link));
}


initCardList();

/*.popup-edit-profile*/
popupEditProfileElement.addEventListener('submit', formEditSubmitHandler);
buttonEditElement.addEventListener('click', () => openPopup(popupEditProfileElement));
buttonClosePopupEditProfileElement.addEventListener('click', () => closePopup(popupEditProfileElement));

/*.popup_type_add-card*/
popupAddCardElement.addEventListener('submit', formAddSubmitHandler);
buttonAddCardElement.addEventListener('click', () => openPopup(popupAddCardElement));
buttonClosePopupAddCardElement.addEventListener('click', () => closePopup(popupAddCardElement));

/*.popup_type_view-card*/
buttonClosePopupViewCardElement.addEventListener('click', () => closePopup(popupViewCardElement));

