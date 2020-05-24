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


// Функция проверки валидности заполняемого поля
const checkInputValidity = (formElement, inputElement, obj) => {
	const show = !inputElement.validity.valid;
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.toggle(obj.inputErrorClass, show);
	errorElement.classList.toggle(obj.errorClass, show);
	errorElement.textContent = inputElement.validationMessage;
};


// Функция, обходящая массив полей для проверки их валидности
const hasInvalidInput = (inputElements) => {
  // проходим по массиву методом some
  return inputElements.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};


// Функция принимает массив полей ввода
// элемент формы - кнопку "Submit", состояние которой меняется
const toggleButtonState = (inputElements, buttonElement, obj) => {
// Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputElements)) {
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
  const inputElements = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  // Проверяем состояние кнопки при первой загрузке страницы
  toggleButtonState(inputElements, buttonElement, obj);
  // Обойдем все элементы полученной коллекции
  inputElements.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, configObj);
      toggleButtonState(inputElements, buttonElement, obj);
    });
  });
};


// Функция запуска процесса валидации полей ввода всех форм
const enableValidation = (obj) => {
  // НАЙДЕМ ВСЕ ПОЛЯ ФОРМЫ С УКАЗАННЫХ КЛАСОМ В DOM И СОЗДАДИМ ИЗ НИХ МАССИВ
  const formElements = Array.from(document.querySelectorAll(obj.formSelector));
  // ПЕРЕБЕРЕМ ПОЛУЧЕННУЮ КОЛЛЕКЦИЮ
  formElements.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, obj);
  });
};
// Вызываем функцию валидации всех форм
enableValidation(configObj);
