export default class FormValidator {
    constructor(mapSelectors, formElementId) {
        //this._formSelector = mapSelectors.formSelector;
        this._inputSelector = mapSelectors.inputSelector;
        this._submitButtonSelector = mapSelectors.submitButtonSelector;
        this._inactiveButtonClass = mapSelectors.inactiveButtonClass;
        this._inputErrorClass = mapSelectors.inputErrorClass;
        this._errorClass = mapSelectors.errorClass;
        this._formElement = document.querySelector(formElementId);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError(inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement){
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    };

    _inputElementHandler(inputElement){
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
    };

    _setEventListeners(){
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._inputElementHandler(inputElement)
            });
        });
    };

    toggleButtonState(){
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    cleanInputs() {
        this._inputList.forEach((inputElement) => {
            inputElement.value = '';
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._setEventListeners();
    };
}
