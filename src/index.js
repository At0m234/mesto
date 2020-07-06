import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { Api } from './components/Api.js';
import { PopupRemoveCard } from './components/PopupRemoveCard.js';
import './pages/index.css';

import {
  profileTitle,
  profileProfession,
  profileImage,
  nameInput,
  jobInput,
  formEdit,
  editBtn,
  inputsListFormEdit,
  formAdd,
  addBtn,
  inputsListFormAdd,
  formAvatar,
  editAvatar,
  inputsListFormAvatar,
  places,
  configObj
} from './utils/constants.js';


// Создаем экземляр класса Section для отрисовки карточек из массива
export const cardsList = new Section({
  items: null,
  renderer: (item, userId) => {
    // Создаем экземляр класса Card со своей разметкой
    const card = new Card({
      data: item,
      cardSelector: '#place',
      handleCardClick: (cardImg) => {
        popupImage.open(cardImg)
      }});
    const placeElement = card.generateCard(userId);
    cardsList.addItem(placeElement, false);
  },
  },
  places
);


export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-12',
  token: 'e2aad872-788b-4e3d-9505-fb12ef3eab6d',
});


// Создаем экземляр класса UserInfo для отображения информации о пользователе на странице
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  professionSelector: '.profile__profession'
})


// Когда промисы на загрузку данных пользователя
// и загрузку массива карточек с сервера
// приходят со статусом "исполнен"
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    // выполнить отрисовку карточек
    cardsList.renderItems(cards, userInfo._id);
    // загрузить информацию о пользователе с сервера
    profileTitle.textContent = userInfo.name;
    profileProfession.textContent = userInfo.about;
    profileImage.src = userInfo.avatar;
  })
  .catch((err) => {
    console.log(err);
  });


// Создаем экземляр класса PopupWithForm для формы редактирования профиля
const popupEdit = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: (formData, closePopup) => {
    // меняем название кнопки сабмита перед началом загрузки
    popupEdit.saving(true)
    api.editUserInfo(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
      closePopup;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // меняем название кнопки сабмита при завершении загрузки
      popupEdit.saving(false)
    });
  }
});
popupEdit.setEventListeners();


// Создаем экземляр класса PopupWithForm для формы добавления карточки
const popupAdd = new PopupWithForm ({
  popupSelector: '.popup_add',
  handleFormSubmit: (formData, closePopup) => {
    // меняем название кнопки сабмита перед началом загрузки
    popupAdd.saving(true)
    api.addNewCard(formData)
      .then((data) => {
        cardsList.renderItems([data], data.owner._id)
        closePopup;
      })
      .catch(err => console.log(err))
      .finally(() => {
        // меняем название кнопки сабмита при завершении загрузки
        popupAdd.saving(false)
      });
  },

})
popupAdd.setEventListeners();


// Создаем экземляр класса PopupWithForm для формы обновления аватара пользователя
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleFormSubmit: (formData, closePopup) => {
    // меняем название кнопки сабмита при загрузке данных на сервис
    popupAvatar.saving(true)
    // обновляем аватар пользователя на сервере
    api.changeUserAvatar(formData.url)
      .then((data) => {
        // обновляем аватар пользователя на странице
        // после удачного ответа сервера
        profileImage.src = data.avatar;
        // закрываем попап после успешного ответа сервера
        closePopup;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // вызываем renderLoading
        popupAvatar.saving(false)
      });
  }
});
popupAvatar.setEventListeners();


// Создаем экземляр класса для попапа с изображением
const popupImage = new PopupWithImage({
  popupSelector: '#popup_img'
});
popupImage.setEventListeners();


// Создаем экземляр класса PopupWithForm для формы удаления карточки
export const popupRemove = new PopupRemoveCard ({
  popupSelector: '.popup_remove',
});
popupRemove.setEventListeners();


// Функция очистки полей от старых ошибок
function clearOldErrors(formElement, inputElements, formValid) {
  inputElements.forEach((inputElement) => {
    formValid.hideInputError(formElement, inputElement, configObj)
  })
}


// Функция предварительной подготовки и проверки
// попапа редактирования профиля перед открытием
function editPopupPreInit() {
  // очищаем форму от старых ошибок
  clearOldErrors(formEdit, inputsListFormEdit, editValid);

  const editInputValues = userInfo.getUserInfo();

  nameInput.value = editInputValues.name;
  jobInput.value = editInputValues.profession;
  // делаем кнопку неактивной при открытии
  const EditSaveBtn = formEdit.elements.save;
  EditSaveBtn.classList.remove(configObj.inactiveButtonClass);
  EditSaveBtn.removeAttribute('disabled');

  popupEdit.open();
}


// Функция предварительной подготовки и проверки
// попапа добавления карточки перед открытием
function addPopupPreInit() {
  // очищаем форму от старых ошибок
  clearOldErrors(formAdd, inputsListFormAdd, addValid);
  // сбрасываем все поля формы
  formAdd.reset();
  // делаем кнопку неактивной при открытии
  const addCreateBtn = formAdd.elements.create;
  addCreateBtn.classList.add(configObj.inactiveButtonClass);
  addCreateBtn.setAttribute('disabled', 'true');

  popupAdd.open();
}


// Функция подготовки формы смены аватара к открытию
function avatarPopupPreInit() {
  // очищаем форму от старых ошибок
  clearOldErrors(formAvatar, inputsListFormAvatar, avatarValid);
  // сбрасываем все поля формы
  formAvatar.reset();
  // делаем кнопку неактивной при открытии
  const editAvatarBtn = formAvatar.elements.avatar;
  editAvatarBtn.classList.add(configObj.inactiveButtonClass);
  editAvatarBtn.setAttribute('disabled', 'true');

  popupAvatar.open();
}


// Создаем экземляр класса для формы ректирования профиля (включаем валидацию полей)
const editValid = new FormValidator(configObj, formEdit);
editValid.enableValidation();
// Создаем экземляр класса для формы добавления карточки (включаем валидацию полей)
const addValid = new FormValidator(configObj, formAdd);
addValid.enableValidation();
// Создаем экземляр класса для формы обновления аватара (включаем валидацию полей)
const avatarValid = new FormValidator(configObj, formAvatar);
avatarValid.enableValidation();


// СЛУШАТЕЛИ СОБЫТИЙ
// Слушатель на открытие модального окна редактирования профиля
editBtn.addEventListener("click", editPopupPreInit);
// Слушатель на открытие модального окна добавления карточки
addBtn.addEventListener("click", addPopupPreInit);
// Слушатель открытия формы обновления аватара пользователя
editAvatar.addEventListener('click', avatarPopupPreInit);
