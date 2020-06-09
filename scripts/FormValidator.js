export class FormValidator {
  constructor(configObj, formElement) {
    this._configObj = configObj;
    this._formElement = formElement;
  }

  _showInputError(formElement, inputElement, errorMessage, configObj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(configObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configObj.errorClass);
  }

  _hideInputError(formElement, inputElement, configObj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(configObj.inputErrorClass);
    errorElement.classList.remove(configObj.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement, configObj) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, configObj);
    } else {
      this._hideInputError(formElement ,inputElement, configObj);
    }
  }

  _hasInvalidInput(inputElements) {
    // проходим по массиву методом some
    return inputElements.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
    })
  }

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

  _setEventListeners(formElement, configObj) {
    // Находим все поля внутри формы, делаем из них массив
    const inputElements = Array.from(formElement.querySelectorAll(configObj.inputSelector));
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

  enableValidation() {
      this._setEventListeners(this._formElement, this._configObj);
    }
}
