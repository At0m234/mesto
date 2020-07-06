// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ - ПОИСК И ДОБАВЛЕНИЕ В DOM
export const nameInput = document.querySelector(".popup__text_name");
export const jobInput = document.querySelector(".popup__text_profession");
export const profileTitle = document.querySelector(".profile__title");
export const profileProfession = document.querySelector(".profile__profession");
export const profileImage = document.querySelector(".profile__image");

export const formEdit = document.forms.edit;
export const editBtn = document.querySelector(".profile__edit-btn");

export const formAdd = document.forms.add;
export const addBtn = document.querySelector(".profile__add-btn");

export const formAvatar = document.forms.avatar;
export const editAvatar = document.querySelector(".profile__img-btn");

export const inputsListFormEdit = Array.from(formEdit.querySelectorAll('.popup__text'));
export const inputsListFormAdd = Array.from(formAdd.querySelectorAll('.popup__text'));
export const inputsListFormAvatar = Array.from(formAvatar.querySelectorAll('.popup__text'));

export const places = document.querySelector(".places");


// Объект с селекторами и классами формы
export const configObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input_error_active',
};