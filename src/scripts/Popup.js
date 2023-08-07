export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners(); // Получается если я вызову super конструктор из попапа с формой, то сработает seteventlistener не этот, а того самого наследника "попапа с формой"?.. И такой метод сработает если в seteventlistener у попапа с формой не будет элементов его конструктора? Просто пытаюсь понять правильно ли я понял... А как тогда безопасно можно вызвать seteventlistener после создания экзкмпляра класса? Через бинд как то это сделать?
  }

  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _closePopupByClick(evt) {
    if (evt.target.classList.contains('popup__close-button') || evt.target == evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupByClick.bind(this));
  }
}
