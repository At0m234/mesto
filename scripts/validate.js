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
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);// НАХОДИМ ЭЛЕМЕНТ ОШИБКИ ВНУТРИ САМОЙ ФУНКЦИИ
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_error_active');// ПОКАЗЫВАЕМ СООБЩЕНИЕ ОБ ОШИБКЕ
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__input_error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  // Обойдем все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement)
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__container'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
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