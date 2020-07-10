import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor({popupSelector, imageSelector, imageCaptionSelector}) {
    super({popupSelector});
    this._image = this._popup.querySelector(imageSelector);
    this._imageCaption = this._popup.querySelector(imageCaptionSelector);
  }
  // Публичный метод открытия попапа
  open(cardImg) {
    // Вставляет в попап картинку и атрибут src изображения и подпись к картинке
    this._image.src = cardImg.src;
    this._image.alt = cardImg.alt;
    this._imageCaption.textContent = cardImg.alt;
    // Родительский метод открытия попапа
    super.open();
  }
}