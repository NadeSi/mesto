export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element, defaultDirection = true) {
        if (!defaultDirection) {
            this._container.prepend(element);
        } else {
            this._container.append(element);
        }
    }

    renderItems(items) {
        items && items.forEach(item => {
            this._renderer(item);
        });
    }
}
