const popupViewCardElement = document.querySelector('.popup_type_view-card');
const buttonClosePopupViewCardElement = popupViewCardElement.querySelector('.button_type_close');

export class Card {
    constructor(data, cardSelector, popupOperations) {
        this._cardSelector = cardSelector;
        this._text = data.text;
        this._imgUrl = data.imgUrl;

        this._openPopup = popupOperations.open;
        this._closePopup = popupOperations.close;
        this._misclickPopup = popupOperations.misclick;
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.cloneNode(true);
    };

    _setEventListeners() {
        popupViewCardElement.addEventListener('click', this._misclickPopup);
        buttonClosePopupViewCardElement.addEventListener('click', () => this._closePopup(popupViewCardElement));
    };

    _handleImgClick = (event) => {
        const currentImgElement = event.target;
        const currentTextElement = event.target.nextElementSibling.querySelector('.element__text');

        const img = popupViewCardElement.querySelector('.view-card__img');
        img.src = currentImgElement.src;
        img.alt = currentImgElement.alt;

        popupViewCardElement.querySelector('.view-card__text').textContent = currentTextElement.textContent;
        this._openPopup(popupViewCardElement);
    };

    _handleLikeClick = (event) => {
        const element = event.target;
        element.classList.toggle('element__like_active');
    };

    _handleDeleteBtnClick = (event) => {
        const element = event.target;
        element.parentElement.remove();
    };

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        if (this._imgUrl) {
            const img = this._element.querySelector('.element__img');
            img.src = this._imgUrl;
            img.alt = this._text;
            img.addEventListener('click', this._handleImgClick);
        }

        this._element.querySelector('.element__text').textContent = this._text;

        this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick);
        this._element.querySelector('.element__delete-card').addEventListener('click', this._handleDeleteBtnClick);

        return this._element;
    }
}
