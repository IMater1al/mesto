export default class UserInfo {
  constructor({ accountNameSelector, accountActivitySelector, accountAvatarSelector }) {
    this._accountName = document.querySelector(accountNameSelector);
    this._accountActivity = document.querySelector(accountActivitySelector);

    this._accountAvatar = document.querySelector(accountAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._accountName.textContent,
      activity: this._accountActivity.textContent
    };
  }

  setUserInfo(name, activity) {
    this._accountName.textContent = name;
    this._accountActivity.textContent = activity;
  }

  setUserAvatar(avatar) {
    this._accountAvatar.style.backgroundImage = `url("${avatar}")`;
  }
}
