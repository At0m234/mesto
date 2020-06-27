import koChang from '../images/Ko Hong.jpg';
import lagoDiBraies from '../images/Lago Di Braies.jpg';
import yosemiteValley from '../images/Yosemite Valley.jpg';
import kamchatka from '../images/kamchatka.jpg';
import baikal from '../images/baikal.jpg';
import arkhyz from '../images/arkhyz.jpg';


// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ - ПОИСК И ДОБАВЛЕНИЕ В DOM
export const nameInput = document.querySelector(".popup__text_name");
export const jobInput = document.querySelector(".popup__text_profession");
export const profileTitle = document.querySelector(".profile__title");
export const profileProfession = document.querySelector(".profile__profession");

export const formEdit = document.forms.edit;
export const editBtn = document.querySelector(".profile__edit-btn");

export const formAdd = document.forms.add;
export const addBtn = document.querySelector(".profile__add-btn");

export const inputsListFormEdit = Array.from(formEdit.querySelectorAll('.popup__text'));
export const inputsListFormAdd = Array.from(formAdd.querySelectorAll('.popup__text'));

export const places = document.querySelector(".places");

// Массив с объектами ключ-значение
export const initialCards = [
  {
    name: "архыз",
    link: arkhyz,
  },
  {
    name: "байкал",
    link: baikal,
  },
  {
    name: "камчатка",
    link: kamchatka,
  },
  {
    name: "сьерра невада",
    link: yosemiteValley,
  },
  {
    name: "лаго ди брайес",
    link: lagoDiBraies,
  },
  {
    name: "ко чанг",
    link: koChang,
  }
];

// Объект с селекторами и классами формы
export const configObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input_error_active',
};