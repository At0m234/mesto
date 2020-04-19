const editBtn = document.querySelector('.profile__edit-btn');
const closeIcon = document.querySelector('.popup__close-icon');
const saveBtn = document.querySelector('.popup__save');
const popup = document.querySelector('.popup');

editBtn.addEventListener('click', function popupOpened() {
    popup.classList.add('popup_opened');
})

closeIcon.addEventListener('click', function popupClosed() {
    popup.classList.remove('popup_opened');
})

document.getElementById('name').value = document.querySelector('.profile__title').textContent;
document.getElementById('profession').value = document.querySelector('.profile__profession').textContent;

    // Находим форму в DOM
let popupContainer = document.querySelector('.popup__container');

    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault()        // Эта строчка отменяет стандартную отправку формы.
                                    // Так мы можем определить свою логику отправки.
                                    // О том, как это делать, расскажем позже.

        // Находим поля формы в DOM
        let nameInput = document.querySelector('.popup__name');
        let jobInput = document.querySelector('.popup__profession');
        // Получите значение полей из свойства value
        nameInput = nameInput.value;
        jobInput = jobInput.value;
        // Выберите элементы, куда должны быть вставлены значения полей
        let profileTitle = document.querySelector('.profile__title');
        let profileProfession = document.querySelector('.profile__profession');
        // Вставьте новые значения с помощью textContent
        profileTitle.textContent = nameInput;
        profileProfession.textContent = jobInput;
        
        popup.classList.remove('popup_opened');
}

    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', formSubmitHandler);