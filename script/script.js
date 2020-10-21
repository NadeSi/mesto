let buttonEditElement = document.querySelector('.button_type_edit');
let buttonClosePopupElement = document.querySelector('.button_type_close');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popupElement = document.querySelector('.popup');
let inputName = popupElement.querySelector('.popup__input_field_name');
let inputDescription = popupElement.querySelector('.popup__input_field_description');

function fillPopupContainer() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function openPopup() {
    popupElement.classList.add('popup_opened');
    fillPopupContainer();
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    closePopup();
}

popupElement.addEventListener('submit', formSubmitHandler);

buttonEditElement.addEventListener('click', openPopup);
buttonClosePopupElement.addEventListener('click', closePopup);
