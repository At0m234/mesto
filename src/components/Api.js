import { data } from "autoprefixer";
export class Api {
  constructor({url, token}) {
    this._url = url;
    this._token = token;
  }

  // Метод загрузки информации о пользователе с сервера
  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err));
  }

  // Метод загрузки карточек с сервера
  getCards() {
    return fetch(this._url + '/cards', {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err));
  }

  // Метод загрузки новых данных о пользователе на сервер
  editUserInfo(formData) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.profession
      })
    })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err))
  }

  // Метод добавления новой карточки на сервер
  addNewCard(formData) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.title,
        link: formData.place
      })
    })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err))
  }

  // Метод удаления карточки с сервера
  removeCard(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err))
  }

  // Метод постановки лайка карточке
  addLike(cardId) {
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => {
      return res.json()
    })
      .catch(err => console.log(err))
  }

  // Метод снятия лайка с карточки
  removeLike(cardId) {
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err))
  }

  // Метод загрузки аватара пользователя
  changeUserAvatar(url) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url,
      })
    })
    .then(res => {
      return res.json()
    })
    .catch(err => console.log(err))
  }
}
