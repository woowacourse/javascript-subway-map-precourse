import StationManager from './StationManager.js';
import LineManager from './LineManager.js';
import SectionManager from './SectionManager.js';
import MapPrintManager from './MapPrintManager.js';

import Subway from './Subway.js';

import { saveItem, loadItem } from './utils/storage.js';

export default class App {
  _initialState = {
    stations: new Set([]),
    lines: new Map([]),
  };

  constructor(target) {
    this._target = target;
    this.createButtons(target);

    this._container = document.createElement('div');
    target.appendChild(this._container);

    this._subway = new Subway({ state: this.loadSubway() });
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

  saveSubway() {
    const stations = this._subway.getStationName();
    const lines = this._subway.getLines();
    const subwayState = { stations, lines };
    saveItem('subway', subwayState);
  }

  loadSubway() {
    const subway = loadItem('subway');
    if (!subway) {
      return this._initialState;
    }
    const stations = new Set([...subway.stations]);
    const lines = new Map(
      subway.lines.map(({ lineName, section }) => [lineName, section]),
    );
    return { stations, lines };
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
      addSection: this.onClickAddSection.bind(this),
      deleteSection: this.onClickDeleteSection.bind(this),
    });
  }

  renderMapPrintManager() {
    this._container.innerHTML = '';
    this._mapPrintManager = new MapPrintManager({
      target: this._container,
      subway: this._subway,
    });
  }

  onClickAddStation() {
    const _station = document.querySelector('#station-name-input').value;
    this._subway.addStation({ station: _station });
    this._stationManager.setSubway(this._subway);
    this.saveSubway();
  }

  onClickDeleteStation(station) {
    const isOk = window.confirm('정말로 삭제하시겠습니까?');
    if (isOk) {
      this._subway.deleteStation({ station });
      this._stationManager.setSubway(this._subway);
      this.saveSubway();
    }
  }

  getSelectorValue(id) {
    const selector = document.querySelector(id);
    return selector.options[selector.selectedIndex].text;
  }

  onClickAddLine() {
    const lineName = document.querySelector('#line-name-input').value;
    const start = this.getSelectorValue('#line-start-station-selector');
    const end = this.getSelectorValue('#line-end-station-selector');
    this._subway.addLine({ lineName, start, end });
    this._lineManager.setSubway(this._subway);
    this.saveSubway();
  }

  onClickDeleteLine({ lineName }) {
    const isOk = window.confirm('정말로 삭제하시겠습니까?');
    if (isOk) {
      this._subway.deleteLine({ lineName });
      this._lineManager.setSubway(this._subway);
      this.saveSubway();
    }
  }

  onClickAddSection(line) {
    const { lineName } = line;
    const station = this.getSelectorValue('#section-station-selector');
    const order = document.querySelector('#seletion-order-input').value;
    this._subway.addSection({ lineName, order, station });
    this._sectionManager.setSubway(this._subway, line);
    this.saveSubway();
  }

  onClickDeleteSection(station, line) {
    const { lineName } = line;
    const isOk = window.confirm('정말로 삭제하시겠습니까?');
    if (isOk) {
      this._subway.deleteSection({ lineName, station });
      this._sectionManager.setSubway(this._subway, line);
      this.saveSubway();
    }
  }
}
