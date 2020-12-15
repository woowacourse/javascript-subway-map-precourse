import StationManager from './StationManager.js';
import LineManager from './LineManager.js';
import SectionManager from './SectionManager.js';
import MapPrintManager from './MapPrintManager.js';

import Subway from './Subway.js';

import { saveItem, loadItem } from './utils/storage.js';

import {
  DELETE_CONFIRM,
} from './constants/Constants.js';

export default class App {
  initialState = {
    stations: new Set([]),
    lines: new Map([]),
  };

  constructor(target) {
    this.target = target;
    this.createButtons(target);

    this.container = document.createElement('div');
    target.appendChild(this.container);

    this.subway = new Subway({ state: this.loadSubway() });
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
    const ul = document.createElement('ul');
    ul.className = 'navigation';
    const buttons = [
      { id: 'station-manager-button', label: '1. 역 관리' },
      { id: 'line-manager-button', label: '2. 노선 관리' },
      { id: 'section-manager-button', label: '3. 구간 관리' },
      { id: 'map-print-manager-button', label: '4. 지하철 노선도 출력' },
    ];
    ul.innerHTML = `
      ${buttons.map(({ id, label }) => `
        <li>
          <button id=${id}>${label}</button>
        </li>
      `).join('')}
    `;
    target.appendChild(ul);

    this.addClickButtonEvent(buttons);
  }

  saveSubway() {
    const stations = this.subway.getStationName();
    const lines = this.subway.getLines();
    const subwayState = { stations, lines };
    saveItem('subway', subwayState);
  }

  loadSubway() {
    const subway = loadItem('subway');
    if (!subway) {
      return this.initialState;
    }
    const stations = new Set([...subway.stations]);
    const lines = new Map(
      subway.lines.map(({ lineName, section }) => [lineName, section]),
    );
    return { stations, lines };
  }

  renderStationManager() {
    this.container.innerHTML = '';
    this.stationManager = new StationManager({
      target: this.container,
      subway: this.subway,
      addStation: this.onClickAddStation.bind(this),
      deleteStation: this.onClickDeleteStation.bind(this),
    });
  }

  renderLineManager() {
    this.container.innerHTML = '';
    this.lineManager = new LineManager({
      target: this.container,
      subway: this.subway,
      addLine: this.onClickAddLine.bind(this),
      deleteLine: this.onClickDeleteLine.bind(this),
    });
  }

  renderSectionManager() {
    this.container.innerHTML = '';
    this.sectionManager = new SectionManager({
      target: this.container,
      subway: this.subway,
      addSection: this.onClickAddSection.bind(this),
      deleteSection: this.onClickDeleteSection.bind(this),
    });
  }

  renderMapPrintManager() {
    this.container.innerHTML = '';
    this.mapPrintManager = new MapPrintManager({
      target: this.container,
      subway: this.subway,
    });
  }

  onClickAddStation() {
    const station = document.querySelector('#station-name-input').value;
    this.subway.addStation({ station });
    this.stationManager.setSubway(this.subway);
    this.saveSubway();
  }

  onClickDeleteStation(station) {
    const isOk = window.confirm(DELETE_CONFIRM);
    if (isOk) {
      this.subway.deleteStation({ station });
      this.stationManager.setSubway(this.subway);
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
    this.subway.addLine({ lineName, start, end });
    this.lineManager.setSubway(this.subway);
    this.saveSubway();
  }

  onClickDeleteLine({ lineName }) {
    const isOk = window.confirm(DELETE_CONFIRM);
    if (isOk) {
      this.subway.deleteLine({ lineName });
      this.lineManager.setSubway(this.subway);
      this.saveSubway();
    }
  }

  onClickAddSection() {
    const { lineName } = this.sectionManager.currentLine;
    const station = this.getSelectorValue('#section-station-selector');
    const order = document.querySelector('#seletion-order-input').value;
    this.subway.addSection({ lineName, order, station });
    this.sectionManager.setSubway(this.subway);
    this.saveSubway();
  }

  onClickDeleteSection(station) {
    const { lineName } = this.sectionManager.currentLine;
    const isOk = window.confirm(DELETE_CONFIRM);
    if (isOk) {
      this.subway.deleteSection({ lineName, station });
      this.sectionManager.setSubway(this.subway);
      this.saveSubway();
    }
  }
}
