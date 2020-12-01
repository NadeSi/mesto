const BUTTON_TYPE_CLOSE = '.button_type_close';

export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._buttonClosePopup = this._popupElement.querySelector(BUTTON_TYPE_CLOSE)
    }

    _handleEscClose(event){
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleMisclick(event){
        if (event.target === this._popupElement) {
            this.close();
        }
    }

    setEventListeners(){
        this._popupElement.addEventListener('click', this._handleMisclick.bind(this));
        this._buttonClosePopup.addEventListener('click', this.close.bind(this));

        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    open(){
       this._popupElement.classList.add('popup_opened');
    }

    close(){
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popupElement.classList.remove('popup_opened');
    }

}
