import StationManager from './StationManager.js';
import LineManager from './LineManager.js';
import SectionManager from './SectionManager.js';
import MapPrintManager from './MapPrintManager.js';

import Subway from './Subway.js';

export default class App {
  _state = {
    stations: new Set(['인천', '동인천', '도원', '소요산', '사당', '오이도', '당고개']),
    lines: new Map([
      ['1호선', ['인천', '소요산']],
      ['4호선', ['오이도', '당고개']],
    ]),
  };

  constructor(target) {
    this._target = target;
    this.createButtons(target);

    this._container = document.createElement('div');
    target.appendChild(this._container);

    this._subway = new Subway({ state: this._state });
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
    this._stationManager = new StationManager({
      target: this._container,
      subway: this._subway,
      addStation: this.onClickAddStation.bind(this),
      deleteStation: this.onClickDeleteStation.bind(this),
    });
  }

  renderLineManager() {
    this._container.innerHTML = '';
    this._lineManager = new LineManager({
      target: this._container,
      subway: this._subway,
      addLine: this.onClickAddLine.bind(this),
      deleteLine: this.onClickDeleteLine.bind(this),
    });
  }

  renderSectionManager() {
    this._container.innerHTML = '';
    this._sectionManager = new SectionManager({
      target: this._container,
      subway: this._subway,
    });
  }

  renderMapPrintManager() {
    this._container.innerHTML = '';
    this._mapPrintManager = new MapPrintManager({ target: this._container });
  }

  onClickAddStation() {
    const _station = document.querySelector('#station-name-input').value;
    this._subway.addStation({ station: _station });
    this._stationManager.setSubway(this._subway);
  }

  onClickDeleteStation(station) {
    const isOk = window.confirm('정말로 삭제하시겠습니까?');
    if (isOk) {
      this._subway.deleteStation({ station });
      this._stationManager.setSubway(this._subway);
    }
  }

  getSelectorValue(id) {
    const selector = document.querySelector(id);
    const value = selector.options[selector.selectedIndex].value;
    return value;
  }

  onClickAddLine() {
    const lineName = document.querySelector('#line-name-input').value;
    const start = this.getSelectorValue('#line-start-station-selector');
    const end = this.getSelectorValue('#line-end-station-selector');
    this._subway.addLine({ lineName, start, end });
    this._lineManager.setSubway(this._subway);
  }

  onClickDeleteLine({ lineName }) {
    const isOk = window.confirm('정말로 삭제하시겠습니까?');
    if (isOk) {
      this._subway.deleteLine({ lineName });
      this._lineManager.setSubway(this._subway);
    }
  }
}
