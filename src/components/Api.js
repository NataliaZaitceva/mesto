export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._token = headers["authorization"];
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  addCards(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: data.link,
        name: data.name,
      }),
    }).then(this._getResponseData);
  }

  getInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  saveInfo({ name, about }) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseData);
  }

  likedCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  dislikedCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  deleteUserCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }

  updateUserPhoto(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getResponseData);
  }

  // другие методы работы с API
}
