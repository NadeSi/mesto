export default class Card {
    constructor(data, cardSelector, handleCardClick, handleCardDelete, handleCardLike, handleCardLikeDelete) {
        this._cardSelector = cardSelector;

        this._id = data._id;
        this._text = data.name;
        this._imgUrl = data.link;
        this._likes = data.likes;
        this._owner = data.owner;

        this._handleCardClick = handleCardClick.bind(this);
        this._handleCardDelete = handleCardDelete.bind(this);
        this._handleCardLike = handleCardLike.bind(this);
        this._handleCardLikeDelete = handleCardLikeDelete.bind(this);

        this._handleLikeClick = this._handleLikeClick.bind(this);
        this._handleDeleteBtnClick = this._handleDeleteBtnClick.bind(this);
    }

    _handleLikeClick() {
        const callBack = (result) => {
            element.classList.toggle('element__like_active');
            this._likes = result.likes;
            this._element.querySelector('.element__like-count').textContent = this._likes.length;
        };

        const element = this._element.querySelector('.element__like');

        if (element.classList.contains('element__like_active')) {
            this._handleCardLikeDelete(this._id, callBack);
        } else {
            this._handleCardLike(this._id, callBack);
        }
    };

    _handleDeleteBtnClick() {
        this._element.remove();
        this._element = null;
    };

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    };

    generateCard(currentUserId) {
        this._element = this._getTemplate();

        if (this._imgUrl) {
            const img = this._element.querySelector('.element__img');
            img.src = this._imgUrl;
            img.alt = this._text;
            //img.addEventListener('click', this._handleCardClick.bind(this));
            img.addEventListener('click', this._handleCardClick);
        }

        if (this._likes) {
            this._element.querySelector('.element__like-count').textContent = this._likes.length;

            if(this._likes.filter(item => item._id === currentUserId).length !== 0){
                this._element.querySelector('.element__like').classList.toggle('element__like_active');
            }
        }

        this._element.querySelector('.element__text').textContent = this._text;
        this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick);

        if (this._owner && this._owner._id === currentUserId) {
            const deleteBtn = this._element.querySelector('.element__delete-card');

            deleteBtn.classList.add('element__delete-card_visible');
            deleteBtn.addEventListener('click', () => this._handleCardDelete(this._id, this._handleDeleteBtnClick));
        }

        return this._element;
    }
}
