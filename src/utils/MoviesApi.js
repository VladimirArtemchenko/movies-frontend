import {FILMS_URL} from "./const.js"

class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}`, {
      headers: this._headers,
      method: 'GET'
    })
      .then(this._checkStatus)
  }
}

export const movieApi = new Api({
  url: FILMS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})











