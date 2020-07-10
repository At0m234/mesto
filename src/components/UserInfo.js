// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({nameSelector, professionSelector, profileTitle, profileProfession, profileImage}) {
    // Селектор элемента имени пользователя
    this._name = document.querySelector(nameSelector);
    // Селектор элемента информации о себе
    this._profession = document.querySelector(professionSelector);
    this._profileTitle = profileTitle;
    this._profileProfession = profileProfession;
    this._profileImage = profileImage;
  }

  // Публичный метод, который возвращает объект с данными пользователя
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo(nameInput, jobInput) {
    this._formValues = {};
    this._formValues[nameInput.name] = this._profileTitle.textContent;
    this._formValues[jobInput.name] = this._profileProfession.textContent;

    return this._formValues;
  }

  // Публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(formData) {
    if(formData.name) {
      this._name.textContent = formData.name;
      this._profileImage.setAttribute('alt', formData.name);
    }
    if(formData.about) {
      this._profession.textContent = formData.about;
    }
  }
}