import Popup from "./Popup";

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }

    open({text, imgUrl}){
        const img = this._popupElement.querySelector('.view-card__img');
        img.src = imgUrl;
        img.alt = text;

        this._popupElement.querySelector('.view-card__text').textContent = text;
        super.open();
    }

}
