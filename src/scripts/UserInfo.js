export default class UserInfo {
  constructor({ accountNameSelector, accountActivitySelector, accountAvatarSelector }) {
    this._accountName = document.querySelector(accountNameSelector);
    this._accountActivity = document.querySelector(accountActivitySelector);

    this._accountAvatar = document.querySelector(accountAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._accountName.textContent,
      activity: this._accountActivity.textContent,
      avatar: this._avatar,
      _id: this._accountId
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._accountName.textContent = name;
    this._accountActivity.textContent = about;
    this._accountAvatar.style.backgroundImage = `url("${avatar}")`;
    this._accountId = _id;
    this._avatar = avatar;
  }
}
