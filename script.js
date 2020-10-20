let buttonEditElement = document.querySelector('.button__edit');
let popupElement = document.querySelector('.popup');
let buttonClosePopupElement = document.querySelector('.button__close');


function openPopup() {
    popupElement.classList.add('popup_opened');
    fillPopupContainer();
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

function fillPopupContainer() {
    let profileName = document.querySelector('.profile__name');
    let profileDescription = document.querySelector('.profile__description');

    let inputName = popupElement.querySelector('.input_field_name');
    let inputDescription = popupElement.querySelector('.input_field_description');

    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    let inputName = popupElement.querySelector('.input_field_name');
    let inputDescription = popupElement.querySelector('.input_field_description');

    let profileName = document.querySelector('.profile__name');
    let profileDescription = document.querySelector('.profile__description');

    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    closePopup();
}

popupElement.addEventListener('submit', formSubmitHandler);

buttonEditElement.addEventListener('click', openPopup);
buttonClosePopupElement.addEventListener('click', closePopup);
