export default class MapPrintManager {
  constructor({ target }) {
    this._target = target;

    const _wrapper = this.createContainerElement(target, 'map');
    this.render(_wrapper);
  }

  createContainerElement(target, classNames = '') {
    const _container = document.createElement('div');
    target.appendChild(_container);
    if (classNames !== '') {
      _container.className = classNames;
    }
    return _container;
  }

  render(wrapper) {
    wrapper.innerHTML = `Map print`;
  }
}
