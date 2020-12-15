export default class MapPrintManager {
  constructor({ target, subway }) {
    this.target = target;
    this.subway = subway;

    const wrapper = this.createContainerElement(target, 'map');
    this.render(wrapper);
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

  render(wrapper) {
    const lines = this.subway.getLines();
    wrapper.innerHTML = `
      ${lines.map(({ lineName, section }) => `
        <h3>${lineName}</h3>
        ${this.renderSection(section)}
      `).join('')}
    `;
  }
}
