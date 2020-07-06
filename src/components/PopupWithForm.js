import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super({popupSelector});
    // Функция колбэк-сабмита формы
    this._handleFormSubmit = handleFormSubmit;
  }
  // Приватный метод собирает данные всех полей формы
  _getInputValues() {
    // Находим все поля в попапе и записываем в переменную
    this._inputsList = this._popup.querySelectorAll('.popup__text');
    // Создаем пустой объект
    this._formValues = {};
    // Записываем в пустой объект значения всех полей попапа
    this._inputsList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // Возвращаем заполненный объект
    return this._formValues;
  }
  // Публичный метод добавляет обработчики клика иконке закрытия, оверлэю и Esc,
  // а также добавляет обработчик сабмита формы
  setEventListeners() {
    // Наследуем родительский метод
    super.setEventListeners();
    // Обработчик сабмита формы
    this._popup.addEventListener('submit', (evt) => {
      // Отменяем стандартную отправку формы
      evt.preventDefault();
      // вызываем функцию _handleFormSubmit,
      // передав в ее аргумент заполненный объект со значениями полей,
      // полученный из метода _getInputValues
      // Вызываем публичный метод закрытия формы
      this._handleFormSubmit(this._getInputValues(), this.close());
    })
  }
  // Публичный метод закрытия попапа и очистки формы
  close() {
    // Наследуем родительский метод закрытия формы
    super.close();
    // Очищаем форму
    this._popup.querySelector('.popup__container').reset();
  }
  // Публичный метод отображения состояния кнопки сабмита во время загрузки данных
  saving(inProgress) {
    if (inProgress) {
        this._popup.querySelector('.popup__save').textContent = 'Сохранение...';
    } else {
        document.querySelector('.popup__save_edit').textContent = 'Сохранить';
        document.querySelector('.popup__save_create').textContent = 'Создать';
        document.querySelector('.popup__save_avatar').textContent = 'Сохранить';
    }
  }
}
