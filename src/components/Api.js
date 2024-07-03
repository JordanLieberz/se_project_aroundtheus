export default class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}/${url}`, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request("cards", {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request("users/me", {
      headers: this._headers,
    });
  }

  updateUserInfo(userInfo) {
    return this._request("users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    });
  }

  addCard(cardData) {
    return this._request("cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    });
  }

  updateAvatarPhoto(Avatar) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(Avatar),
    });
  }

  handleLike(cardId, isLiked) {
    return this._request(`cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
      body: JSON.stringify(),
    });
  }

  handleDeleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

// other methods for working with the API
