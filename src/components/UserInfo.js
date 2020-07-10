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
    return {
      userName: this._name.textContent,
      userDescription: this._profession.textContent,
    };
  }

  // Публичный метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userName, userDescription) {
    if(userName) {
      this._name.textContent = userName;
    }
    if(userDescription) {
      this._profession.textContent = userDescription;
    }
  }
}