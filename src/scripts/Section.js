export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._items.forEach(item => {
      const element = this._renderer(item.name, item.link);
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
