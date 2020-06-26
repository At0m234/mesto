import {
  nameInput,
  jobInput,
  profileTitle,
  profileProfession,
} from '../utils/constants.js';

// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({nameSelector, professionSelector}) {
    // Селектор элемента имени пользователя
    this._name = document.querySelector(nameSelector);
    // Селектор элемента информации о себе
    this._profession = document.querySelector(professionSelector);
  }

  // Публичный метод, который возвращает объект с данными пользователя
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    this._formValues = {};
    this._formValues[nameInput.name] = profileTitle.textContent;
    this._formValues[jobInput.profession] = profileProfession.textContent;

    return this._formValues;
  }

// Публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._profession.textContent = formData.profession;
  }
}