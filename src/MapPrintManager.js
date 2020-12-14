export default class MapPrintManager {
  constructor({ target, subway }) {
    this._target = target;
    this._subway = subway;

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

  renderSection(section) {
    return `
      <ul>
        ${section.map((stationName) => `
          <li>${stationName}</li>
        `).join('')}
      </ul>
    `;
  }

  render(wrapper) {
    const lines = this._subway.getLines();
    wrapper.innerHTML = `
      ${lines.map(({ lineName, section }) => `
        <h3>${lineName}</h3>
        ${this.renderSection(section)}
      `).join('')}
    `;
  }
}
