import {MAIN_URL} from "./const.js"

class Api {
  constructor(data) {
    this._url = data.url;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  signUp(data) {
    return fetch(`${this._url}/signUp`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(
        data
       )
    })
      .then(this._checkStatus)
  }

  signIn(data) {
    return fetch(`${this._url}/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
       data
      )
    })
      .then(this._checkStatus)
  }

  getMe(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET'
    })
      .then(this._checkStatus)
  }

  editMe(data,token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       ...data
      })
    })
      .then(this._checkStatus)
  }

  getMyMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkStatus);
  }

  addMovie(data,token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: data.id,
        country: data.country,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        year: data.year,
        director: data.director,
        duration: data.duration,
        description: data.description,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    })
      .then(this._checkStatus)
  }

  deleteMovie(id,token) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkStatus)
  }
}

export const mainApi = new Api({
  url: MAIN_URL
})











