const formEdit = document.forms.edit;
const editName = formEdit.elements.name;
const editProfession = formEdit.elements.profession;
const editSave = formEdit.elements.save;

const formAdd = document.forms.add;
const addTitle = formAdd.elements.title;
const addPlace = formAdd.elements.place;
const addCreate = formAdd.elements.create;

const formElement = document.querySelectorAll('.popup__container');
const inputElement = document.querySelectorAll('.popup__text');

// ФУНКЦИЯ, ОТВЕЧАЮЩАЯ ЗА СОСТОЯНИЕ КНОПОК "СОХРАНИТЬ" И "СОЗДАТЬ"
function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    editSave.removeAttribute('disabled');
    editSave.classList.remove('popup__save_disabled');
    addCreate.removeAttribute('disabled');
    addCreate.classList.remove('popup__save_disabled');
    } else {
    editSave.setAttribute('disabled', true);
    editSave.classList.add('popup__save_disabled');
    addCreate.setAttribute('disabled', true);
    addCreate.classList.add('popup__save_disabled');
  }
};


// ФУНКЦИЯ ОТОБРАЖЕНИЯ СООБЩЕНИЯ С ОШИБКОЙ
const showInputError = (formElement, inputElement, errorMessage) => {
  // НАХОДИМ ЭЛЕМЕНТ ОШИБКИ ВНУТРИ САМОЙ ФУНКЦИИ
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  // ПОКАЗЫВАЕМ СООБЩЕНИЕ ОБ ОШИБКЕ
  errorElement.classList.add('popup__input_error_active');
};


// ФУНКЦИЯ СКРЫТИЯ СООБЩЕНИЯ ОБ ОШИБКЕ
const hideInputError = (formElement, inputElement) => {
  // НАХОДИМ ЭЛЕМЕНТ ОШИБКИ ВНУТРИ САМОЙ ФУНКЦИИ
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_type_error');
   // СКРЫВАЕМ СООБЩЕНИЕ ОБ ОШИБКЕ
  errorElement.classList.remove('popup__input_error_active');
  errorElement.textContent = '';
};


// ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ ЗАПОЛНЯЕМОГО ПОЛЯ
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};


const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__save_disabled');
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save_disabled');
  }
};


// ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ КАЖДОГО ВВЕДЕННОГО СИМВОЛА
const setEventListeners = (formElement) => {
// НАХОДИМ ВСЕ ПОЛЯ ВНУТРИ ФОРМ И СОЗДАЕМ ИЗ НИХ МАССИВ
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__save');
  // ЧТОБЫ ПРОВЕРЯТЬ СОСТОЯНИЕ КНОПКИ В САМОМ НАЧАЛЕ
  toggleButtonState(inputList, buttonElement);
// ОБОЙДЕМ ВСЕ ЭЛЕМЕНТЫ ПОЛУЧЕННОГО МАССИВА
  inputList.forEach((inputElement) => {
// КАЖДОМУ ПОЛЮ ДОБАВИМ ОБРАБОТЧИК СОБЫТИЯ input
    inputElement.addEventListener('input', () => {
// ВНУТРИ КОЛБЭКА ВЫЗЫВАЕМ checkInputValidity, ПЕРЕДАВ ЕЙ ФОРМУ И ПРОВЕРЯЕМЫЙ ЭЛЕМЕНТ
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


// ФУНКЦИЯ ВАЛИДАЦИИ ВСЕХ ФОРМ
const enableValidation = () => {
// НАЙДЕМ ВСЕ ПОЛЯ ФОРМЫ С УКАЗАННЫХ КЛАСОМ В DOM И СОЗДАДИМ ИЗ НИХ МАССИВ
  const formList = Array.from(document.querySelectorAll('.popup__container'));
// ПЕРЕБЕРЕМ ПОЛУЧЕННУЮ КОЛЛЕКЦИЮ
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
// У КАЖДОЙ ФОРМЫ ОТМЕНИМ СТАНДАРТНОЕ ПОВЕДЕНИЕ
      evt.preventDefault();
      const fieldsetList = Array.from(formElement.querySelectorAll('.popup__container'));

      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet);
      });
    });
// ДЛЯ КАЖДОЙ ФОРМЫ ВЫЗОВЕМ ФУНКЦИЮ setEventListeners, ПЕРЕДАВ ЕЙ ЭЛЕМЕНТ ФОРМЫ
    setEventListeners(formElement);
  });
};


// ВЫЗЫВАЕМ ФУНКЦИЮ ВАЛИДАЦИИ ВСЕХ ФОРМ
enableValidation();


formEdit.addEventListener('input', function(e) {
  const isValid = editName.value.length > 0 && editProfession.value.length > 0
  setSubmitButtonState(isValid)
});
formAdd.addEventListener('input', function(e) {
  const isValid = addTitle.value.length > 0 && addPlace.value.length > 0
  setSubmitButtonState(isValid)
});
































































// const editError = formEdit.querySelector(`#${editName.id}-error`);

// // Функция, которая добавляет класс с ошибкой
// const showInputError = (input, errorMessage) => {
//   //input.classList.add('popup__text_type_error');
//   editError.textContent = errorMessage;
//   // Показываем сообщение об ошибке
//   editError.classList.add('popup__input_error_active');
// };

// // Функция, которая удаляет класс с ошибкой
// const hideInputError = (input) => {
//   //input.classList.remove('popup__text_type_error');
//   // Скрываем сообщение об ошибке
//   editError.classList.remove('popup__input_error_active');
//   editError.textContent = '';
// };

// // Функция, которая проверяет валидность поля
// const isValid = () => {
//   if (!editName.validity.valid) {
//     // Если поле не проходит валидацию, покажем ошибку
//     showInputError(editName, editName.validationMessage);
//   } else {
//     // Если проходит, скроем
//     hideInputError(editName);
//   }
// };

// formEdit.addEventListener('submit', function (evt) {
//   // Отменим стандартное поведение по сабмиту
//   evt.preventDefault();
// });

// // Вызовем функцию isValid на каждый ввод символа
// editName.addEventListener('input', isValid);