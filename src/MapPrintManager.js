export default class MapPrintManager {
  constructor({ target, subway }) {
    this.target = target;
    target.className = 'map';
    this.subway = subway;

    this.render(target);
  }

  createContainerElement(target, classNames = '') {
    const container = document.createElement('div');
    target.appendChild(container);
    if (classNames !== '') {
      container.className = classNames;
    }
    return container;
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

  render() {
    const lines = this.subway.getLines();
    this.target.innerHTML = `
      ${lines.map(({ lineName, section }) => `
        <h3>${lineName}</h3>
        ${this.renderSection(section)}
      `).join('')}
    `;
  }
}
