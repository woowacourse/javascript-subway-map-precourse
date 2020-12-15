import StationManager from './StationManager.js';
import LineManager from './LineManager.js';
import SectionManager from './SectionManager.js';
import MapPrintManager from './MapPrintManager.js';

import Subway from './Subway.js';

import { saveItem, loadItem } from './utils/storage.js';

import {
  STATION_INPUT_ID,
  LINE_INPUT_ID,
  SECTION_ORDER_INPUT_ID,
  LINE_START_SELECTOR_ID,
  LINE_END_SELECTOR_ID,
  SECTION_STATION_SELECTOR_ID,
  STATION_MANAGER_BUTTON_ID,
  LINE_MANAGER_BUTTON_ID,
  SECTION_MANAGER_BUTTON_ID,
  MAP_PRINT_MANAGER_BUTTON_ID,
  DELETE_CONFIRM,
} from './constants/CommonConstants.js';

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

  addClickButtonEvent(controls) {
    controls.forEach(({ id, renderer }) => {
      const managerButton = document.getElementById(id);
      managerButton.addEventListener('click', renderer);
    });
  }

  createButtons(target) {
    const controls = [
      {
        id: STATION_MANAGER_BUTTON_ID,
        label: '1. 역 관리',
        renderer: () => this.renderStationManager(),
      },
      {
        id: LINE_MANAGER_BUTTON_ID,
        label: '2. 노선 관리',
        renderer: () => this.renderLineManager(),
      },
      {
        id: SECTION_MANAGER_BUTTON_ID,
        label: '3. 구간 관리',
        renderer: () => this.renderSectionManager(),
      },
      {
        id: MAP_PRINT_MANAGER_BUTTON_ID,
        label: '4. 지하철 노선도 출력',
        renderer: () => this.renderMapPrintManager(),
      },
    ];
    const ul = document.createElement('ul');
    ul.className = 'navigation';
    ul.innerHTML = `
      ${controls.map(({ id, label }) => `
        <li>
          <button id=${id}>${label}</button>
        </li>
      `).join('')}
    `;
    target.appendChild(ul);
    this.addClickButtonEvent(controls);
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
    this.stationManager = new StationManager({
      target: this.container,
      subway: this.subway,
      addStation: this.onClickAddStation.bind(this),
      deleteStation: this.onClickDeleteStation.bind(this),
    });
  }

  renderLineManager() {
    this.lineManager = new LineManager({
      target: this.container,
      subway: this.subway,
      addLine: this.onClickAddLine.bind(this),
      deleteLine: this.onClickDeleteLine.bind(this),
    });
  }

  renderSectionManager() {
    this.sectionManager = new SectionManager({
      target: this.container,
      subway: this.subway,
      addSection: this.onClickAddSection.bind(this),
      deleteSection: this.onClickDeleteSection.bind(this),
    });
  }

  renderMapPrintManager() {
    this.mapPrintManager = new MapPrintManager({
      target: this.container,
      subway: this.subway,
    });
  }

  clearElement(element) {
    element.value = '';
  }

  onClickAddStation() {
    const stationInput = document.getElementById(STATION_INPUT_ID);
    const station = stationInput.value;

    this.subway.addStation({ station });
    this.stationManager.setSubway(this.subway);
    this.saveSubway();
    this.clearElement(stationInput);
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
    const selector = document.getElementById(id);
    return selector.options[selector.selectedIndex].text;
  }

  onClickAddLine() {
    const lineInput = document.getElementById(LINE_INPUT_ID);
    const start = this.getSelectorValue(LINE_START_SELECTOR_ID);
    const end = this.getSelectorValue(LINE_END_SELECTOR_ID);
    const lineName = lineInput.value;

    this.subway.addLine({ lineName, start, end });
    this.lineManager.setSubway(this.subway);
    this.saveSubway();
    this.clearElement(lineInput);
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
    const station = this.getSelectorValue(SECTION_STATION_SELECTOR_ID);
    const orderInput = document.getElementById(SECTION_ORDER_INPUT_ID);
    const order = orderInput.value;

    this.subway.addSection({ lineName, order, station });
    this.sectionManager.setSubway(this.subway);
    this.saveSubway();
    this.clearElement(orderInput);
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
