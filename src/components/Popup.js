// Класс Popup отвечает за открытие и закрытие попапа

export class Popup {
  constructor({popupSelector}) {
    // Селектор попапа
    this._popup = document.querySelector(popupSelector);
  }
  // Публчный метод открытия попапа
  open() {
    this._popup.classList.add("popup_opened")
  }
  // Публичный метод закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened")
  }
  // Приватный метод содержит логику закрытия попапа по клику на оверлэй и на клавишу Esc
  _handleEscClose(evt) {
    if ((this._popup.classList.contains('popup_opened')) && (evt.target.classList.contains('popup') || (evt.key === "Escape"))) {
      this._popup.classList.toggle("popup_opened")
    }
  }
  // Публичный метод добавляет слушатели клика иконке закрытия попапа, оверлэю и Esc
  setEventListeners() {

    this._popupCloseBtn = this._popup.querySelector('.popup__close-icon');

    // Слушатель клика кнопки закрытия попапа
    this._popupCloseBtn.addEventListener('click', () => this.close())
    // Слушатель клика по оверлэю
    this._popup.addEventListener('click', (evt) => this._handleEscClose(evt))
    // Слушатель нажатия клавиши Esc
    window.addEventListener('keydown', (evt) => this._handleEscClose(evt))
  }
}