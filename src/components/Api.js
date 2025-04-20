class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _request(endpoint, options = {}) {
    const finalOptions = {
      headers: this._headers,
      ...options,
    };
    const url = `${this._baseUrl}${endpoint}`;
    return fetch(url, finalOptions).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  getInitialCards() {
    return this._request("/cards");
  }

  getCardById(cardId) {
    return this._request(`/cards/${cardId}`);
  }

  updateUserInfo(data) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addNewCard(data) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  addLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  removeLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  updateAvatar(data) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar: data.avatar }),
    });
  }
}

export default Api;
