// Класс Section отвечает за отрисовку элементов на странице
// У класса Section нет своей разметки

export class Section {
  constructor({ data, renderer }, сontainerSelector) {
    // Массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderedItems = data;
    // Функция, которая отвечает за создание и отрисовку данных на странице
    this._renderer = renderer;
    // Селектор контейнера, в который нужно добавлять созданные элементы
    this._container = сontainerSelector;
  }

  // Публичный метод, отвечающий за отрисовку всех элементов.
  // Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
  renderItems(data, userId) {
    data.forEach(item => this._renderer(item, userId));
  }

  // Публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(element, newCard) {
    if(newCard) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
  
}