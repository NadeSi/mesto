import Popup from "./Popup";

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(event){
        const currentImgElement = event.target;
        const currentTextElement = event.target.nextElementSibling.querySelector('.element__text');

        const img = this._popupElement.querySelector('.view-card__img');
        img.src = currentImgElement.src;
        img.alt = currentImgElement.alt;

        this._popupElement.querySelector('.view-card__text').textContent = currentTextElement.textContent;
        super.open();
    }

}
