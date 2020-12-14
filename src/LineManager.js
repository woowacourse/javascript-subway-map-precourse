export default class LineManager {
  constructor({ target }) {
    this._target = target;
    this.createLineInput(target);
  }

  createContainerElement(target, classNames = '') {
    const _container = document.createElement('div');
    target.appendChild(_container);
    if (classNames !== '') {
      _container.className = classNames;
    }

    return _container;
  }

  createLineInput(target) {
    const _container = this.createContainerElement(
      target, 'line-station line-input',
    );

    _container.innerHTML = `  
      <p>노선 이름</p>
      <input
        type="text"
        placeholder="노선 이름을 입력해주세요"
        id="line-name-input"
      />
    `;
  }
}
