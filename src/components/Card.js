import { api, popupRemove } from '../index.js'

// Класс Card создаёт карточку с текстом и ссылкой на изображение
export class Card {
  constructor({data, cardSelector, handleCardClick}) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._likesCounter = data.likes.length;
    this._ownerId = data.owner._id;
    this._cardId= data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  // Приватный метод, который достает шаблон карточки,
  // клонирует содержимое тега template
  // и записывает в переменную placeElement
  _getTemplate() {
    const placeElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    this._element = placeElement;
  }

  _toggleCardLike() {
    const like = this._element.querySelector('.place__like-icon');

    like.classList.toggle('.place__like-icon_filled');

    if(like.classList.contains('.place__like-icon_filled')) {
      api.addLike(this._cardId)
        .then((data) => {
          this._element.querySelector('.place__like-counter').textContent = data.likes.length;
        })
        .catch(err => console.log(err))
    } else {
      api.removeLike(this._cardId)
      .then((data) => {
        this._element.querySelector('.place__like-counter').textContent = data.likes.length;
      })
      .catch(err => console.log(err))
    }
  }

  // Приватный метод установки слушателей
  _setCardEventListeners() {
    // Находим кнопку удаления и добавляем ей слушатель, который по клику удаляет карточку
    this._element.querySelector(".place__trash").addEventListener('click', () => {
      popupRemove.open(this._element, this._cardId)
    });
    // Находим кнопку лайка и добавляем ей слушатель, который по клику ставит лайк карточке
    this._element.querySelector(".place__like-icon").addEventListener('click', () => {
      this._toggleCardLike()
    });
    // Находим картинку и записываем в переменную
    const placeImage = this._element.querySelector(".place__image");
    // Устанавиваем слушатель на картинку,
    // который при клике выполняет фунцкию открытия увеличенного изображения
    placeImage.addEventListener("click", () => {
      this._handleCardClick(placeImage)
    });
  }
  // Публичный метод, который возвращает полностью работоспособный
  // и наполненный данными элемент карточки
  generateCard(userId) {
    this._getTemplate();
    this._setCardEventListeners();
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__image').alt = this._name;
    this._element.querySelector('.place__name').textContent = this._name;
    this._element.querySelector('.place__like-counter').textContent = this._likesCounter;

    // условие отображения кнопки удаления карточки только на своих карточках
    if(this._ownerId != userId) {
      this._element.querySelector('.place__trash').classList.add('place__trash_invisible')
    }

    this._likes.forEach((like) => {
      if (like._id == userId) {
        this._element.querySelector('.place__like-icon').classList.add('place__like-icon_filled');
      }
    })

    return this._element;
  }
}
