export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authorization = options.headers.authorization;
    }

    callApi(url, init = {}){
        return fetch(`${this._baseUrl}${url}`, init)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    //Cards
    ///////////////////////////////////////////////////////
    getInitialCards() {
        return this.callApi('/cards', {
            headers: {
                authorization: this._authorization
            }
        });
    }

    addNewCard({name, link}) {
        return this.callApi('/cards', {
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        });
    }

    deleteCard(cardId) {
        return this.callApi(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
            },
        });
    }

    addLikeCard(cardId) {
        return this.callApi(`/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
        });
    }

    deleteLikeCard(cardId) {
        return this.callApi(`/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
        });
    }

    //UserInfo
    ///////////////////////////////////////////////////////
    getUserInfo() {
        return this.callApi('/users/me', {
            headers: {
                authorization: this._authorization
            }
        });
    }

    setUserInfo({name, about}) {
        return this.callApi('/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }

    setUserAvatar(avatarUrl){
        return this.callApi('/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl,
            })
        });
    }
}
