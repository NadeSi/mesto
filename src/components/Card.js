export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._cardSelector = cardSelector;
        this._text = data.text;
        this._imgUrl = data.imgUrl;

        this._handleCardClick = handleCardClick;
    }

    _handleLikeClick(event) {
        const element = event.target;
        element.classList.toggle('element__like_active');
    };

    _handleDeleteBtnClick(event) {
        const element = event.target;
        element.parentElement.remove();
    };

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.cloneNode(true);
    };

    generateCard() {
        this._element = this._getTemplate();

        if (this._imgUrl) {
            const img = this._element.querySelector('.element__img');
            img.src = this._imgUrl;
            img.alt = this._text;
            img.addEventListener('click', this._handleCardClick.bind(this));
        }

        this._element.querySelector('.element__text').textContent = this._text;

        this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick.bind(this));
        this._element.querySelector('.element__delete-card').addEventListener('click', this._handleDeleteBtnClick.bind(this));

        return this._element;
    }
}