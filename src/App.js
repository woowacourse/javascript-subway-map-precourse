import StationManager from './StationManager.js';
import LineManager from './LineManager.js';
import SectionManager from './SectionManager.js';
import MapPrintManager from './MapPrintManager.js';

export default class App {
  constructor(target) {
    this._target = target;
    this.createButtons(target);

    this._container = document.createElement('div');
    target.appendChild(this._container);
  }

  addClickButtonEvent(buttons) {
    const components = {
      'station-manager-button': () => this.renderStationManager(),
      'line-manager-button': () => this.renderLineManager(),
      'section-manager-button': () => this.renderSectionManager(),
      'map-print-manager-button': () => this.renderMapPrintManager(),
    };

    buttons.forEach(({ id }) => {
      const button = document.getElementById(id);
      button.addEventListener('click', components[id]);
    });
  }

  createButtons(target) {
    const _ul = document.createElement('ul');
    _ul.className = 'navigation';
    const _buttons = [
      { id: 'station-manager-button', label: '1. 역 관리' },
      { id: 'line-manager-button', label: '2. 노선 관리' },
      { id: 'section-manager-button', label: '3. 구간 관리' },
      { id: 'map-print-manager-button', label: '4. 지하철 노선도 출력' },
    ];
    _ul.innerHTML = `
      ${_buttons.map(({ id, label }) => `
        <li><button id=${id}>${label}</button></li>
      `).join('')}
    `;
    target.appendChild(_ul);

    this.addClickButtonEvent(_buttons);
  }

  renderStationManager() {
    this._container.innerHTML = '';
    new StationManager({ target: this._container });
  }

  renderLineManager() {
    this._container.innerHTML = '';
    new LineManager({ target: this._container });
  }

  renderSectionManager() {
    this._container.innerHTML = '';
    new SectionManager({ target: this._container });
  }

  renderMapPrintManager() {
    this._container.innerHTML = '';
    new MapPrintManager({ target: this._container });
  }
}
