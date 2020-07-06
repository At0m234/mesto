import { Popup } from './Popup.js'
import { api } from '../index.js'

export class PopupRemoveCard extends Popup {
  constructor({popupSelector}) {
    super({popupSelector});
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      // отменяем стандартную отправку формы
      evt.preventDefault()
      // удаляем карточку с сервера
      api.removeCard(this._cardId)
        .then((data) => {
          console.log(data);
          this._element.querySelector('.place__trash').closest('.place').remove()
        })
        .catch(err => console.log(err))

      // закрываем форму
      super.close()
    })
  }

  open(removeElem, cardId) {
    super.open();
    this._element = removeElem;
    this._cardId = cardId
  }

}