// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ - ПОИСК И ДОБАВЛЕНИЕ В DOM
const nameInput = document.querySelector(".popup__text_name");
const jobInput = document.querySelector(".popup__text_profession");
const profileTitle = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__profession");

const popupEdit = document.querySelector("#popup_edit");
const editBtn = document.querySelector(".profile__edit-btn");
const editCloseBtn = document.querySelector(".popup__close-icon");
const editPopupContainer = document.querySelector("#edit_container");

const popupAdd = document.querySelector("#popup_add");
const addBtn = document.querySelector(".profile__add-btn");
const addCloseBtn = document.querySelector("#addPopupClose");
const addPopupContainer = document.querySelector("#add_container");
const addTitleInput = document.querySelector("#title");
const addPlaceInput = document.querySelector("#placeUrl");

const popupImg = document.querySelector(".popup__big-img");
const popupCaption = document.querySelector(".popup__caption");
const popupBigImg = document.querySelector("#popup_img");
const imgCloseBtn = document.querySelector('#imgPopupClose')

const places = document.querySelector(".places");
const place = places.querySelector("#place_template").content;

const inputElementsFormEdit = Array.from(popupEdit.querySelectorAll('.popup__text'));
const inputElementsFormAdd = Array.from(popupAdd.querySelectorAll('.popup__text'));


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


// Функция отображения информация из профиля в форме редактирования профиля
function editPopupInfo() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileProfession.textContent;
};


// Функция проверки валидности перед открытием попапа
function hidePrevErrors(formElement, inputElements, obj) {
  inputElements.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, obj);
  });
}


function popupPreInit(formElement, inputElements, buttonElement, obj) {
	hidePrevErrors(formElement, inputElements, obj);
  toggleButtonState(inputElements, buttonElement, obj);
}


// Функция отображения попапов
function popupVisibility(popup) {
  if (!popup.classList.contains("popup_opened")) {
	if(popup === popupEdit) {
		editPopupInfo();
		popupPreInit(formEdit, inputElementsFormEdit, editSave, configObj);
  }
  else if (popup === popupAdd) {
		formAdd.reset();
		popupPreInit(formAdd, inputElementsFormAdd, addCreate, configObj);
  }
  //Слушатель на закрытие модальных окон при нажатии ESCAPE
  window.addEventListener('keydown', togglePopup);
  //Слушатель на закрытие модальных окон по клику на оверлай
  window.addEventListener('click', togglePopup);
  } else {
	window.removeEventListener('keydown', togglePopup);
	window.removeEventListener('click', togglePopup);
  }
  popup.classList.toggle("popup_opened");
};


//Функция смены отображения модальных окон по клику на оверлай
function togglePopup(evt) {
	const openedPopup = document.querySelector(".popup_opened");
	if (openedPopup !== null && (evt.target === openedPopup || (evt.key === "Escape"))) {
	popupVisibility(openedPopup);
	}
}


// Функция открытия модального окна большого изображения
function bigImagePopupOpened(evt) {
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  popupVisibility(popupBigImg);
}


// Функция удаления карточки из секции
function delCard(evt) {
  evt.target.parentElement.remove();
}


// Функция проставления лайка
function like(evt) {
  evt.target.classList.toggle("place__like-icon_filled");
}


// Функция, которая будет клонировать переменную place со всем содержимым, и записываем клон в переменную placeElement
// далее находим и добавляем в DOM содержимое placeElement и присваем ему соответствующие элементы массива initialCards
function createCard(item, addToEnd) {
  const placeElement = place.cloneNode(true);

  const placeImage = placeElement.querySelector(".place__image");
  placeImage.src = item.link;
  placeImage.alt = item.name;

  const placeName = placeElement.querySelector(".place__name");
  placeName.textContent = item.name;

  const delBtn = placeElement.querySelector(".place__trash");
  delBtn.addEventListener("click", delCard);

  const likeBtn = placeElement.querySelector(".place__like-icon");
  likeBtn.addEventListener("click", like);

  placeImage.addEventListener("click", bigImagePopupOpened);

  if (addToEnd) {
    places.append(placeElement);
  } else {
    places.prepend(placeElement);
  }
}


// Создаем функцию, которая будет пробегать по каждому элементу массива
function render() {
  places.innerHTML = "";
  initialCards.forEach(function (item) {
    createCard(item, true);
  });
}
// Вызываем функцию обработки элементов массива
render();


// Функция добавления карточки в начало массива
function addCard(card) {
  initialCards.unshift(card);
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
  const newCard = { name: addTitleInput.value, link: addPlaceInput.value };
  // Вызываем функцию добавления карточки в начало массива
  addCard(newCard);
  // Передаем сформированную карточку для отображения на странице
  createCard(newCard, false);
  // Вызываем функцию закрытия модального окна
  popupVisibility(popupAdd);
  //Очищаем форму
  formAdd.reset();
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
