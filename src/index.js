import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import './pages/index.css';

import {
  nameInput,
  jobInput,
  profileTitle,
  profileProfession,
  formEdit,
  editBtn,
  formAdd,
  addBtn,
  places,
  initialCards,
  configObj
} from './utils/constants.js';


// Создаем экземляр класса для формы ректирования профиля включаем валидацию полей
const editValid = new FormValidator(configObj, formEdit);
editValid.enableValidation();
// Создаем экземляр класса для формы добавления карточки включаем валидацию полей
const addValid = new FormValidator(configObj, formAdd);
addValid.enableValidation();

// Создаем экземляр класса для попапа с изображением
const popupImage = new PopupWithImage({
  popupSelector: '#popup_img'
});

popupImage.setEventListeners();


// Создаем экземляр класса Section для отрисовки карточек из массива
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    // Создаем экземляр класса Card со своей разметкой
    const card = new Card({
      data: item,
      cardSelector: '#place',
      handleCardClick: (cardImg) => {
        popupImage.open(cardImg)
      }});
    const placeElement = card.generateCard();
    cardsList.addItem(placeElement);
    },
  },
  places
);

cardsList._renderItems();



// Создаем экземляр класса PopupWithForm для формы добавления карточки
const popupAdd = new PopupWithForm ({
  popupSelector: '.popup_add',
  handleFormSubmit: (formData) => {
    cardsList._renderItems([{ name: formData.title, link: formData.place }])
}
})

popupAdd.setEventListeners();

// Создаем экземляр класса UserInfo для отображения информации о пользователе на странице
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  professionSelector: '.profile__profession'
})

// Создаем экземляр класса PopupWithForm для формы редактирования профиля
const popupEdit = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData)
}
})

popupEdit.setEventListeners();



// Функция отображения и скрытия невалидности полей форм
function hidePrevErrors(formElement, inputElements, isValid) {
  inputElements.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    if(isValid) {
      errorElement.textContent = "";
      inputElement.classList.remove(configObj.inputErrorClass)
    } else {
      errorElement.textContent = "";
      inputElement.classList.add(configObj.inputErrorClass)
    }
  });

}

// Функция предварительной подготовки и проверки
// попапа редактирования профиля перед открытием
function editPopupPreInit() {

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileProfession.textContent;


  const saveBtn = document.querySelector('#saveBtn');
  saveBtn.classList.remove(configObj.inactiveButtonClass);
  saveBtn.removeAttribute('disabled', 'false');

  const formInputs = formEdit.querySelectorAll(configObj.inputSelector);
  hidePrevErrors(formEdit, formInputs, true);

  popupEdit.open();
}

// Функция предварительной подготовки и проверки
// попапа добавления карточки перед открытием
function addPopupPreInit() {
  formAdd.reset();

  const createBtn = document.querySelector('#createBtn');
  createBtn.classList.add(configObj.inactiveButtonClass);
  createBtn.setAttribute('disabled', 'true');

  const formInputs = formAdd.querySelectorAll(configObj.inputSelector);
  hidePrevErrors(formAdd, formInputs, false);

  popupAdd.open();
}


// СЛУШАТЕЛИ СОБЫТИЙ
// Слушатель на открытие модального окна редактирования профиля
editBtn.addEventListener("click", editPopupPreInit);
// Слушатель на открытие модального окна добавления карточки
addBtn.addEventListener("click", addPopupPreInit);
