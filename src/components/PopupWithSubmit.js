import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setSubmitCallBack(submitCallBack){
        this._submitCallBack = submitCallBack;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitCallBack()
        });
    }

    close() {
        this._submitCallBack = null;
        super.close();
    }

}
