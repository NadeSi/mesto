export default class UserInfo {
    constructor({userNameSelector, userDescriptionSelector, userAvatarId}) {
        this._name = document.querySelector(userNameSelector);
        this._description = document.querySelector(userDescriptionSelector);
        this._avatar = document.getElementById(userAvatarId);
    }

    getUserInfo(){
        return {
            userName: this._name.textContent,
            userDescription: this._description.textContent,
        };
    }

    getUserId(){
        return this._id;
    }

    setUserInfo({userName, userDescription, userAvatarUrl, _id}) {
        this._name.textContent = userName;
        this._description.textContent = userDescription;
        this._avatar.style.backgroundImage = `url('${userAvatarUrl}')`;
        this._id = _id;
    }

}
