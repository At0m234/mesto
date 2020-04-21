const editBtn = document.querySelector('.profile__edit-btn');  
const closeIcon = document.querySelector('.popup__close-icon');
const saveBtn = document.querySelector('.popup__save');
const popup = document.querySelector('.popup');
// Находим форму в DOM
let popupContainer = document.querySelector('.popup__container');

// Функция открытия модального окна
function popupOpened() {
    popup.classList.add('popup_opened');
    document.querySelector('.popup__text_name').value = document.querySelector('.profile__title').textContent;
    document.querySelector('.popup__text_profession').value = document.querySelector('.profile__profession').textContent;
}

// Функция закрытия модального окна
function popupClosed() {
    popup.classList.remove('popup_opened'); 
}



    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler (evt) {
        // Находим поля формы в DOM
        let nameInput = document.querySelector('.popup__text_name');
        let jobInput = document.querySelector('.popup__text_profession');
        // Выберите элементы, куда должны быть вставлены значения полей
        let profileTitle = document.querySelector('.profile__title');
        let profileProfession = document.querySelector('.profile__profession');

        evt.preventDefault()        // Эта строчка отменяет стандартную отправку формы.
                                    // Так мы можем определить свою логику отправки.
                                    // О том, как это делать, расскажем позже.


        // Получите значение полей из свойства value
        nameInput = nameInput.value;
        jobInput = jobInput.value;

        // Вставьте новые значения с помощью textContent
        profileTitle.textContent = nameInput;
        profileProfession.textContent = jobInput;
        
        // Вызываем функцию закрытия модального окна
        popupClosed();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', formSubmitHandler);

// Слушатель на открытие модального окна по клику на кнопку
editBtn.addEventListener('click', popupOpened);
// Слушатель на закрытие модального окна по клику на кнопку
closeIcon.addEventListener('click', popupClosed);