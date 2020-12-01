export default class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}) {
        this._name = document.querySelector(userNameSelector);
        this._description = document.querySelector(userDescriptionSelector);
    }

    getUserInfo(){
        return {
            userName: this._name.textContent,
            userDescription: this._description.textContent,
        };
    }

    setUserInfo({userName, userDescription}) {
        this._name.textContent = userName;
        this._description.textContent = userDescription;
    }

}
