import { Popup } from './Popup.js'

export class PopupRemoveCard extends Popup {
  constructor({popupSelector, handleRemoveCard}) {
    super({popupSelector});
    this._handleRemoveCard = handleRemoveCard;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      // отменяем стандартную отправку формы
      evt.preventDefault()
      // удаляем карточку с сервера
      this._handleRemoveCard(this._cardId, this._element, super.close());
    })
  }

  open(removeElem, cardId) {
    super.open();
    this._element = removeElem;
    this._cardId = cardId
  }
}