export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async getUserInfo() {
    return await this._request(`/users/me`, {
      headers: this._headers
    });
  }

  async getInitialCards() {
    return await this._request(`/cards `, {
      headers: this._headers
    });
  }

  async editProfileData(name, activity) {
    return await this._request(`/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: activity
      })
    });
  }

  async addNewCard(name, link) {
    return await this._request(`/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  async removeCard(cardId) {
    return await this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  async setLike(cardId) {
    return await this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  async removeLike(cardId) {
    return await this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  async changeAvatar(avatarLink) {
    return await this._request(`/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async _request(endpoint, options) {
    return await fetch(`${this._baseUrl + endpoint}`, options).then(this._checkResponse);
  }
}
