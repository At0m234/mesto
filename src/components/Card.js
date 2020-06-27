// Класс Card создаёт карточку с текстом и ссылкой на изображение
export class Card {
  constructor({data, cardSelector, handleCardClick}) {
    this._link = data.link;
    this._name = data.name;
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
  // Приватный метод удаления карточки
  _removeCard() {
    this._element.remove();
  }
  // Приватный метод проставления лайка для карточки
  _likeCard() {
    this._element.querySelector(".place__like-icon").classList.toggle("place__like-icon_filled");
  }
  // Приватный метод установки слушателей
  _setCardEventListeners() {
    // Находим кнопку удаления и добавляем ей слушатель, который по клику удаляет карточку
    this._element.querySelector(".place__trash").addEventListener('click', () => {
      this._removeCard()
    });
    // Находим кнопку лайка и добавляем ей слушатель, который по клику ставит лайк карточке
    this._element.querySelector(".place__like-icon").addEventListener('click', () => {
      this._likeCard()
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
  generateCard() {
    this._getTemplate();
    this._setCardEventListeners();
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__name').textContent = this._name;
    return this._element;
  }
}
