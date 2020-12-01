import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector);
        this._submitCallBack = submitCallBack;
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    }

    setInputValues(inputValues) {
        for (const [key, value] of Object.entries(inputValues)){
            const inputElement = this._inputList.filter((input) => (input.name === key))[0];
            if(inputElement) inputElement.value = value;
        }
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitCallBack(event, this._getInputValues())
        });
    }

}
