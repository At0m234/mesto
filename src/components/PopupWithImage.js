import { Popup } from './Popup.js';
import { popupImg, popupCaption } from '../utils/constants.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  // Публичный метод открытия попапа
  open(cardImg) {
    // Вставляет в попап картинку и атрибут src изображения и подпись к картинке
    popupImg.src = cardImg.src;
    popupImg.alt = cardImg.alt;
    popupCaption.textContent = cardImg.alt;
    // Родительский метод открытия попапа
    super.open();
  }
}