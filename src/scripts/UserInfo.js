export default class UserInfo {
  constructor({ accountNameSelector, accountActivitySelector }) {
    this._accountName = document.querySelector(accountNameSelector);
    this._accountActivity = document.querySelector(accountActivitySelector);
  }

  getUserInfo() {
    return {
      name: this._accountName.textContent,
      activity: this._accountActivity.textContent
    };
  }

  setUserInfo(newName, newActivity) {
    this._accountName.textContent = newName;
    this._accountActivity.textContent = newActivity;
  }
}
