// Класс FormValidator, который настраивает валидацию полей формы
export class FormValidator {
  constructor(configObj, formElement) {
    // Объект настроек с селекторами и классами формы
    this._configObj = configObj;
    // Элемент формы, который валидируется
    this._formElement = formElement;
  }
  // Приватный метод отображения сообщений об ошибке
  _showInputError(formElement, inputElement, errorMessage, configObj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(configObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configObj.errorClass);
  }
  // Приватный метод скрытия сообщений об ошибке
  _hideInputError(formElement, inputElement, configObj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(configObj.inputErrorClass);
    errorElement.classList.remove(configObj.errorClass);
    errorElement.textContent = "";
  }
  // Приватный метод, который в зависимости от валидности введенного значения
  // показывает или скрывает ошибку
  _checkInputValidity(formElement, inputElement, configObj) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, configObj);
    } else {
      this._hideInputError(formElement ,inputElement, configObj);
    }
  }
  // Приватный метод, который который проверяет валидность введенных значений в поле
  _hasInvalidInput(inputElements) {
    // проходим по массиву методом some
    return inputElements.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
    })
  }
  // Приватный метод изменения состояния кнопки сабмита
  _toggleButtonState(inputElements, buttonElement, configObj) {
    // Если есть хотя бы один невалидный инпут
      if (this._hasInvalidInput(inputElements)) {
    // сделает кнопку неактивной
        buttonElement.classList.add(configObj.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'true');
        } else {
    // иначе сделакт кнопку активной
        buttonElement.classList.remove(configObj.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
        }
  }
  // Приватный метод установки слушателей
  _setEventListeners(formElement, configObj) {
    // Находим все поля внутри формы, делаем из них массив
    const inputElements = Array.from(formElement.querySelectorAll(configObj.inputSelector));
    // Находим кнопку сабмита в форме
    const buttonElement = formElement.querySelector(configObj.submitButtonSelector);
    // Проверяем состояние кнопки при первой загрузке страницы
    this._toggleButtonState(inputElements, buttonElement, configObj);
    // Обойдем все элементы полученной коллекции
    inputElements.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем
        // передав ей форму и проверяемый элемент
        this._checkInputValidity(formElement, inputElement, configObj);
        this._toggleButtonState(inputElements, buttonElement, configObj);
      })
    })
  }
  // Публичный метод, который включает валидацию формы
  enableValidation() {
      this._setEventListeners(this._formElement, this._configObj);
    }
}
