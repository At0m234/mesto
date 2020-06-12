import { popupImg, popupBigImg, popupCaption } from './utils.js'


export class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const placeElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    this._element = placeElement;
  }

  _removeCard() {
    this._element.querySelector(".place__trash").closest('.place').remove();
  }

  _likeCard() {
    this._element.querySelector(".place__like-icon").classList.toggle("place__like-icon_filled");
  }

  _bigImagePopupClosed() {
    popupBigImg.classList.remove('popup_opened')
    this._toggleEventListeners()
  }

  _togglePopup(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup !== null && (evt.target === openedPopup || (evt.key === "Escape"))) {
      this._bigImagePopupClosed(evt);
    }
  }

  _toggleEventListeners() {
    if (popupBigImg.classList.contains('popup_opened')) {
      // Устанавливаем слушатель закрытия формы кликом на оверлей
      window.addEventListener('click', (evt) => {
        this._togglePopup(evt)
      });
      // Устанавливаем слушатель клавиатуры
      window.addEventListener('keydown', (evt) => {
        this._togglePopup(evt)
      });
    } else {
      // Снятие слушателя закрытия формы кликом на оверлей
      window.removeEventListener('click', (evt) => {
        this._togglePopup(evt)
      });
      // Снятие слушателя клавиатуры
      window.removeEventListener('keydown', (evt) => {
        this._togglePopup(evt)
      });
    }
  }

  _bigImagePopupOpened() {
    popupImg.src = this._element.querySelector('.place__image').src;
    popupImg.alt = this._element.querySelector('.place__image').alt;
    popupCaption.textContent = this._element.querySelector('.place__name').textContent;
    popupBigImg.classList.toggle('popup_opened');
    this._toggleEventListeners()
  }

  _setCardEventListeners() {
    this._element.querySelector(".place__trash").addEventListener('click', () => {
      this._removeCard()
    });
    this._element.querySelector(".place__like-icon").addEventListener('click', () => {
      this._likeCard()
    });
    this._element.querySelector(".place__image").addEventListener("click", () => {
      this._bigImagePopupOpened()
    });
  }

  generateCard() {
    this._getTemplate();
    this._setCardEventListeners();
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__name').textContent = this._name;
    return this._element;
  }
}
