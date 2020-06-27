import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  // Публичный метод открытия попапа
  open(cardImg) {
    // Находим в попапе картинку и подпись к ней
    this._popupImg = this._popup.querySelector('.popup__big-img');
    this._popupCaption = this._popup.querySelector('.popup__caption');
    // Вставляет в попап картинку и атрибут src изображения и подпись к картинке
    this._popupImg.src = cardImg.src;
    this._popupImg.alt = cardImg.alt;
    this._popupCaption.textContent = cardImg.alt;
    // Родительский метод открытия попапа
    super.open();
  }
}