const formEdit = document.forms.edit;
const editSave = formEdit.elements.save;

const formAdd = document.forms.add;
const addCreate = formAdd.elements.create;

const configObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input_error_active',
};


// Функция отображения ошибок валидации
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};


// Функция скрытия ошибок валидации
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  // Очистка ошибки
  errorElement.textContent = '';
};


// Функция проверки валидности заполняемого поля
const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};


// Функция, обходящая массив полей для проверки их валидности
const hasInvalidInput = (inputsList) => {
  // проходим по массиву методом some
  return inputsList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};


// Функция принимает массив полей ввода
// элемент формы - кнопку "Submit", состояние которой меняется
const toggleButtonState = (inputsList, buttonElement, obj) => {
// Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputsList)) {
// сделает кнопку неактивной
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
    } else {
// иначе сделакт кнопку активной
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
    }
};


// Функция добавления слушателей событий всем полям ввода формы
const setEventListeners = (formElement, obj) => {
  // Находим все поля внутри формы, делаем из них массив
  const inputsList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  // Проверяем состояние кнопки при первой загрузке страницы
  toggleButtonState(inputsList, buttonElement, obj);
  // Обойдем все элементы полученной коллекции
  inputsList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, obj);
      // Проверка состояния кнопки при каждом изменении символа в любом из полей
      toggleButtonState(inputsList, buttonElement, obj);
    });
  });
};


// Функция запуска процесса валидации полей ввода всех форм
const enableValidation = (obj) => {
  // НАЙДЕМ ВСЕ ПОЛЯ ФОРМЫ С УКАЗАННЫХ КЛАСОМ В DOM И СОЗДАДИМ ИЗ НИХ МАССИВ
  const formsList = Array.from(document.querySelectorAll(obj.formSelector));
  // ПЕРЕБЕРЕМ ПОЛУЧЕННУЮ КОЛЛЕКЦИЮ
  formsList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, obj);
  });
};
// Вызываем функцию валидации всех форм
enableValidation(configObj);
