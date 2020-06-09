import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ - ПОИСК И ДОБАВЛЕНИЕ В DOM
const nameInput = document.querySelector(".popup__text_name");
const jobInput = document.querySelector(".popup__text_profession");
const profileTitle = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__profession");

export const formEdit = document.forms.edit;
export const popupEdit = document.querySelector("#popup_edit");
const editBtn = document.querySelector(".profile__edit-btn");
const editCloseBtn = document.querySelector(".popup__close-icon");
const editPopupContainer = document.querySelector("#edit_container");

export const formAdd = document.forms.add;
export const popupAdd = document.querySelector("#popup_add");
const addBtn = document.querySelector(".profile__add-btn");
const addCloseBtn = document.querySelector("#addPopupClose");
const addPopupContainer = document.querySelector("#add_container");
const addTitleInput = document.querySelector("#title");
const addPlaceInput = document.querySelector("#placeUrl");

export const popupImg = document.querySelector(".popup__big-img");
export const popupCaption = document.querySelector(".popup__caption");
export const popupBigImg = document.querySelector("#popup_img");
const imgCloseBtn = document.querySelector('#imgPopupClose')

export const places = document.querySelector(".places");


// Массив с объектами ключ-значение
const initialCards = [
  {
    name: "архыз",
    link: "images/arkhyz.jpg",
  },
  {
    name: "байкал",
    link: "images/baikal.jpg",
  },
  {
    name: "камчатка",
    link: "images/kamchatka.jpg",
  },
  {
    name: "сьерра невада",
    link: "images/Yosemite Valley.jpg",
  },
  {
    name: "лаго ди брайес",
    link: "images/Lago Di Braies.jpg",
  },
  {
    name: "ко чанг",
    link: "images/Ko Hong.jpg",
  },
];


const configObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input_error_active',
};

// Создаем функцию, которая будет пробегать по каждому элементу массива
function render() {
  places.innerHTML = "";
  initialCards.forEach(function (item) {
    const card = new Card(item, '#place');
    const placeElement = card.generateCard();
    places.append(placeElement);
  });
}
// Вызываем функцию обработки элементов массива
render();

const editValid = new FormValidator(configObj, formEdit);
editValid.enableValidation();

const addValid = new FormValidator(configObj, formAdd);
addValid.enableValidation();


// Функция отображения информация из профиля в форме редактирования профиля
function editPopupInfo() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileProfession.textContent;
};


// Функция проверки валидности перед открытием попапа
function hidePrevErrors(formElement, inputElements, obj, isValid) {
  inputElements.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if(isValid){
      errorElement.classList.remove(obj.errorClass);
      errorElement.textContent = "";
      inputElement.classList.remove(configObj.inputErrorClass)
    } else {
      errorElement.classList.add(obj.errorClass);
      errorElement.textContent = "";
      inputElement.classList.add(configObj.inputErrorClass)
    }
  });
}


function editPopupPreInit(formElement, obj) {
  editPopupInfo();

  const saveBtn = document.querySelector('#saveBtn')
  saveBtn.classList.remove(obj.inactiveButtonClass)
  saveBtn.removeAttribute('disabled', 'false');

  const formInputs = formElement.querySelectorAll(configObj.inputSelector)
  hidePrevErrors(formElement, formInputs, obj, true);
}


function addPopupPreInit(formElement, obj) {
  const formInputs = formElement.querySelectorAll(configObj.inputSelector)
  hidePrevErrors(formElement, formInputs, obj, false);

  const createBtn = document.querySelector('#createBtn')
  createBtn.classList.add(obj.inactiveButtonClass)
  createBtn.setAttribute('disabled', 'true');

  formAdd.reset();
}


// Функция отображения попапов
function popupVisibility(popup) {
  addPopupPreInit(popupAdd, configObj);
  editPopupPreInit(popupEdit, configObj);
  toggleEventListeners(popup);
  popup.classList.toggle("popup_opened");
};


//Функция смены отображения модальных окон по клику на оверлай
function togglePopup(evt) {
	const openedPopup = document.querySelector(".popup_opened");
	if (openedPopup !== null && (evt.target === openedPopup || (evt.key === "Escape"))) {
	popupVisibility(openedPopup);
	}
}


// Функция устанавки / снятия слушатели Esc и Overlay
function toggleEventListeners (popup) {
  if (!popup.classList.contains('popup_opened')) {
    // Устанавливаем слушатель закрытия формы кликом на оверлей
    window.addEventListener('click', togglePopup);
    // Устанавливаем слушатель клавиатуры
    window.addEventListener('keydown', togglePopup);
  } else {
    // Снятие слушателя закрытия формы кликом на оверлей
    window.removeEventListener('click', togglePopup);
    // Снятие слушателя клавиатуры
    window.removeEventListener('keydown', togglePopup);
  }
}


// Функция обработчика для отправки формы (РЕДАКТИРОВАНИЕ ПРОФИЛЯ)
function formSubmitHandlerEdit(evt) {
  // Отменяем стандартную отправку формы
  evt.preventDefault();
  // Вставляем новые значения с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  // Вызываем функцию закрытия модального окна
  popupVisibility(popupEdit)
}


// Функция обработчика для отправки формы (ДОБАВЛЕНИЕ КАРТОЧКИ)
function formSubmitHandlerAdd(evt) {
  // Отменяем стандартную отправку формы
  evt.preventDefault();
  // Формируем шаблон объекта
  const newCardData = new Card({ name: addTitleInput.value, link: addPlaceInput.value }, '#place');
  // Передаем сформированную карточку для отображения на странице
  const newCard = newCardData.generateCard();

  places.prepend(newCard);
  // Вызываем функцию закрытия модального окна
  popupVisibility(popupAdd);
}


// СЛУШАТЕЛИ СОБЫТИЙ
// Слушатель отправки формы редактирования профиля
editPopupContainer.addEventListener("submit", formSubmitHandlerEdit);
// Слушатель на открытие модального окна редактирования профиля
editBtn.addEventListener("click", () => popupVisibility(popupEdit));
// Слушатель на закрытие модального окна редактирования профиля
editCloseBtn.addEventListener("click",() => popupVisibility(popupEdit));

// Слушатель отправки формы добавления карточки
addPopupContainer.addEventListener("submit", formSubmitHandlerAdd);
// Слушатель на открытие модального окна добавления карточки
addBtn.addEventListener("click", () => popupVisibility(popupAdd));
// Слушатель на закрытие модального окна добавления карточки
addCloseBtn.addEventListener("click", () => popupVisibility(popupAdd));

// Слушатель на закрытие модального окна большого изображения
imgCloseBtn.addEventListener('click', () => popupVisibility(popupBigImg));
