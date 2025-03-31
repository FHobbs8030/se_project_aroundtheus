export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  getUserId() {
    return this._id;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    if (avatar) {
      this._avatarElement.src = avatar;
    }
    if (_id) {
      this._id = _id;
    }
  }
}
