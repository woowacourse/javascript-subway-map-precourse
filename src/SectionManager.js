export default class SectionManager {
  constructor({ target }) {
    this._target = target;

    this.createHeader(target);
  }

  createContainerElement(target, classNames = '') {
    const _container = document.createElement('div');
    target.appendChild(_container);
    if (classNames !== '') {
      _container.className = classNames;
    }
    return _container;
  }

  createHeader(target) {
    const h3 = document.createElement('h3');
    h3.innerHTML = `구간을 수정할 노선을 선택해주세요.`;

    target.appendChild(h3);
  }
}
