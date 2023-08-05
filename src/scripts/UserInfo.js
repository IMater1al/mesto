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

  setUserInfo(data) {
    const { popupName: name, popupActivity: activity } = data;
    this._accountName.textContent = name;
    this._accountActivity.textContent = activity;
  }
}
