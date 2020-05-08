// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ - ПОИСК И ДОБАВЛЕНИЕ В DOM
const popupEdit = document.querySelector('#popup_edit');
const editBtn = document.querySelector('.profile__edit-btn');  
const editCloseBtn = document.querySelector('.popup__close-icon');
const editPopupContainer = document.querySelector('#edit_container');

const popupAdd = document.querySelector('#popup_add');
const addBtn = document.querySelector('.profile__add-btn');
const addCloseBtn = document.querySelector('#addPopupClose');
const addPopupContainer = document.querySelector('#add_container');
const addTitleInput = document.querySelector('#title');
const addPlaceInput = document.querySelector('#placeUrl');

const popupImg = document.querySelector('.popup__big-img');
const popupCaption = document.querySelector('.popup__caption');
const popupBigImg = document.querySelector('#popup_img');


// ДОБАВЛЕНИЕ КАРТОЧЕК НА СТРАНИЦУ 
// СОЗДАЕМ МАССИВ С ОБЪЕКТАМИ КЛЮЧ-ЗНАЧЕНИЕ
const initialCards = [
    {
        name: 'архыз',
        link: 'images/arkhyz.jpg'
    },
    {
        name: 'байкал',
        link: 'images/baikal.jpg'
    },
    {
        name: 'камчатка',
        link: 'images/kamchatka.jpg'
    },
    {
        name: 'сьерра невада',
        link: 'images/yosemite_valley.jpg'
    },
    {
        name: 'лаго ди брайес',
        link: 'images/lago_di_braies.jpg'
    },
    {
        name: 'ко чанг',
        link: 'images/ko_hong.jpg'
    }
];

// Находим в DOM и записываем в переменные секцию places и контент внутри блока template
const places = document.querySelector('.places');
const place = places.querySelector('#place_template').content;

// Создаем функцию, которая будет пробегать по каждому элементу массива
function render() {
    places.innerHTML = '';
    initialCards.forEach(function(item){createCard(item, true);});
};

// Вызываем функцию обработки элементов массива
render();



// Создаем функцию, которая будет клонировать переменную place со всем содержимым и записываем клон в переменную placeElement
// далее находим и добавляем в DOM содержимое placeElement и присваем ему соответствующие элементы массива initialCards 
function createCard(item, addToEnd) {
    const placeElement = place.cloneNode(true);

    const placeImage = placeElement.querySelector('.place__image');
    placeImage.src = item.link;
    placeImage.alt = item.name;

    const placeName = placeElement.querySelector('.place__name');
    placeName.textContent = item.name;
    
    const delBtn = placeElement.querySelector('.place__trash');
    delBtn.addEventListener('click', delCard);

    const likeBtn = placeElement.querySelector('.place__like-icon');
    likeBtn.addEventListener('click', like);

    placeImage.addEventListener('click', bigImagePopupOpened);

    const bigImgCloseBtn = document.querySelector('#imgPopupClose');
    bigImgCloseBtn.addEventListener('click', bigImagePopupClosed);

    if (addToEnd) {
    places.append(placeElement);
    } else {
    places.prepend(placeElement);
}
}


// ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function editPopupOpened() {
    popupEdit.classList.add('popup_opened');
    document.querySelector('.popup__text_name').value = document.querySelector('.profile__title').textContent;
    document.querySelector('.popup__text_profession').value = document.querySelector('.profile__profession').textContent;
}
// ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function editPopupClosed() {
    popupEdit.classList.remove('popup_opened'); 
}


// ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
function addPopupOpened() {
    popupAdd.classList.add('popup_opened');
}
// ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
function addPopupClosed() {
    popupAdd.classList.remove('popup_opened'); 
    addTitleInput.value = '';
    addPlaceInput.value = '';
}


// ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА БОЛЬШОГО ИЗОБРАЖЕНИЯ
function bigImagePopupOpened(evt) {
    popupBigImg.classList.add('popup_opened');
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
}
// ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА БОЛЬШОГО ИЗОБРАЖЕНИЯ
function bigImagePopupClosed(evt) {
    popupBigImg.classList.remove('popup_opened');
}

// ФУНКЦИЯ УДАЛЕНИЯ КАРТИНКИ ИЗ СЕКЦИИ
function delCard(evt) {
    evt.target.parentElement.remove(); 
}

// ФУНКЦИЯ ЛАЙКА КАРТОЧКИ 
function like(evt) {
    evt.target.classList.toggle('place__like-icon_filled');
}

// ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ В НАЧАЛО МАССИВА
function addCard(card) {
    initialCards.unshift(card);
}


// ФУНКЦИЯ ОБРАБОТЧИКА ДЛЯ ОТПРАВКИ ФОРМЫ (РЕДАКТИРОВАНИЕ ПРОФИЛЯ)
function formSubmitHandlerEdit (evt) {
    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__text_name');
    let jobInput = document.querySelector('.popup__text_profession');
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileProfession = document.querySelector('.profile__profession');
    // Отменяем стандартную отправку формы
    evt.preventDefault();       
    // Получите значение полей из свойства value
    nameInput = nameInput.value;
    jobInput = jobInput.value;
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput;
    profileProfession.textContent = jobInput;
    // Вызываем функцию закрытия модального окна
    editPopupClosed(); 
}

// ФУНКЦИЯ ОБРАБОТЧИКА ДЛЯ ОТПРАВКИ ФОРМЫ (ДОБАВЛЕНИЕ КАРТОЧКИ)
function formSubmitHandlerAdd (evt) {
    const titleInput = document.querySelector('#title');               // НАХОДИМ В ФОРМЕ ДОБАВЛЕНИЯ КАРТОЧКИ ПОЛЕ ВВОДА "НАЗВАНИЕ"
    const placeInput = document.querySelector('#placeUrl');            // НАХОДИМ В ФОРМЕ ДОБАВЛЕНИЯ КАРТОЧКИ ПОЛЕ ВВОДА "ССЫЛКА НА КАРТИНКУ"
    evt.preventDefault()                                               // ОТМЕНЯЕМ СТАНДАРТНУЮ ОТПРАВКУ ФОРМЫ
    const newCard = {name: titleInput.value, link: placeInput.value};  // ФОРМИНУЕМ ШАБЛОН ОБЪЕКТА 
    addCard(newCard);                                                  // ВЫЗЫВАЕМ ФУНКЦИЮ ДОБАВЛЕНИЯ ЭЛЕМЕНТА В НАЧАЛО МАССИВА
    createCard(newCard, false);                                        // ПЕРЕДАЕМ СФОРМИРОВАННЫЙ ЭЛЕМЕНТ МАССИВА ДЛЯ ОТОБРАЖЕНИЯ НА СТРАНИЦЕ
    addPopupClosed();                                                  // ВЫЗЫВАЕМ ФУНКЦИЮ ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА
}


// СЛУШАТЕЛИ СОБЫТИЙ
editPopupContainer.addEventListener('submit', formSubmitHandlerEdit);   // СЛУШАТЕЛЬ ФОРМЫ РЕДАКТИРОВАНИЯ
addPopupContainer.addEventListener('submit', formSubmitHandlerAdd);     // СЛУШАТЕЛЬ ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ
editBtn.addEventListener('click', editPopupOpened);                     // СЛУШАТЕЛЬ НА ОТКРЫТИЕ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
editCloseBtn.addEventListener('click', editPopupClosed);                // СЛУШАТЕЛЬ НА ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
addBtn.addEventListener('click', addPopupOpened);                       // СЛУШАТЕЛЬ НА ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
addCloseBtn.addEventListener('click', addPopupClosed);                  // СЛУШАТЕЛЬ НА ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ