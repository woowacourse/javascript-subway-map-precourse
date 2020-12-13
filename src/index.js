import SubwayLine from './line.js';
import { DOMs, DOMCtrl, DOMStrings } from './doms.js';
import { isValidStationName, isValidLineName, isInvalidSectionDeletion } from './valid.js';

export default class SubwayManager {
  constructor() {
    this.stations = JSON.parse(localStorage.getItem(dataStrings.DATA_STATIONS)) || [];
    this.lines = JSON.parse(localStorage.getItem(dataStrings.DATA_LINES)) || [];

    this.setEventListeners();
  }

  setEventListeners() {
    DOMs.STATION_MANAGER_BUTTON.addEventListener('click', DOMCtrl.openStationManager.bind(this));
    DOMs.LINE_MANAGER_BUTTON.addEventListener('click', DOMCtrl.openLineManager.bind(this));
    DOMs.SECTION_MANAGER_BUTTON.addEventListener('click', DOMCtrl.openSectionManager.bind(this));
    DOMs.MAP_PRINT_MANAGER_BUTTON.addEventListener('click', DOMCtrl.openMapPrintManager.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.addStation.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.deleteStation.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.addLine.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.deleteLine.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', DOMCtrl.selectLine.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.addSection.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.deleteSection.bind(this));
  }

  addStation(event) {
    const {
      target: { id },
    } = event;
    if (id === DOMStrings.STATION_ADD_BUTTON) {
      const station = document.getElementById(DOMStrings.STATION_NAME_INPUT).value;
      if (isValidStationName(this.stations, station)) {
        this.stations.push(station);
        localStorage.setItem(dataStrings.DATA_STATIONS, JSON.stringify(this.stations));
        DOMCtrl.openStationManager.bind(this)();
      }
    }
  }

  deleteStation(event) {
    // 노선에 등록된 역은 삭제할 수 없음(구현 예정)
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.STATION_DELETE_BUTTON) {
      const targetStationName = event.target.dataset[dataStrings.DATA_STATION];
      const index = this.stations.indexOf(targetStationName);
      this.stations.splice(index, 1);
      localStorage.setItem(dataStrings.DATA_STATIONS, JSON.stringify(this.stations));
      DOMCtrl.openStationManager.bind(this)();
    }
  }

  addLine(event) {
    const {
      target: { id },
    } = event;
    if (id === DOMStrings.LINE_ADD_BUTTON) {
      const lineName = document.getElementById(DOMStrings.LINE_NAME_INPUT).value;
      if (isValidLineName(this.lines, lineName)) {
        const startStation = document.getElementById(DOMStrings.LINE_START_STATION_SELECTOR).value;
        const endStation = document.getElementById(DOMStrings.LINE_END_STATION_SELECTOR).value;
        this.lines.push(new SubwayLine(lineName, startStation, endStation));
        localStorage.setItem(dataStrings.DATA_LINES, JSON.stringify(this.lines));
        DOMCtrl.openLineManager.bind(this)();
      }
    }
  }

  deleteLine(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.LINE_DELETE_BUTTON) {
      const targetLine = event.target.dataset[dataStrings.DATA_LINE];
      const index = this.lines.findIndex(line => line.lineName === targetLine);
      this.lines.splice(index, 1);
      localStorage.setItem(dataStrings.DATA_LINES, JSON.stringify(this.lines));
      DOMCtrl.openLineManager.bind(this)();
    }
  }

  addSection(event) {
    const {
      target: { id },
    } = event;
    if (id === DOMStrings.SECTION_ADD_BUTTON) {
      const targetLine = document.getElementById(DOMStrings.SECTION_MANAGER).querySelector('h2')
        .dataset[dataStrings.DATA_TARGET];
      const targetLineIndex = this.lines.findIndex(line => line.lineName === targetLine);
      const stationOrder = document.getElementById(DOMStrings.SECTION_ORDER_INPUT).value;
      const stationName = document.getElementById(DOMStrings.SECTION_STATION_SELECTOR).value;
      this.lines[targetLineIndex].stations = this.lines[targetLineIndex].stations
        .slice(0, stationOrder)
        .concat(stationName, this.lines[targetLineIndex].stations.slice(stationOrder));
      localStorage.setItem(dataStrings.DATA_LINES, JSON.stringify(this.lines));
      DOMCtrl.openSectionManager.bind(this)();
      DOMCtrl.openSection.bind(this)(targetLine, targetLineIndex);
    }
  }

  deleteSection(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.SECTION_DELETE_BUTTON) {
      const targetLine = document.getElementById(DOMStrings.SECTION_MANAGER).querySelector('h2')
        .dataset[dataStrings.DATA_TARGET];
      const targetLineIndex = this.lines.findIndex(line => line.lineName === targetLine);
      if (isInvalidSectionDeletion(this.lines, targetLineIndex)) {
        return;
      }
      const targetSectionIndex = event.target.dataset[dataStrings.DATA_INDEX];
      this.lines[targetLineIndex].stations.splice(targetSectionIndex, 1);
      localStorage.setItem(dataStrings.DATA_LINES, JSON.stringify(this.lines));
      DOMCtrl.openSectionManager.bind(this)();
      DOMCtrl.openSection.bind(this)(targetLine, targetLineIndex);
    }
  }
}

export const dataStrings = {
  DATA_STATIONS: 'stations',
  DATA_STATION: 'station',
  DATA_LINES: 'lines',
  DATA_LINE: 'line',
  DATA_TARGET: 'target',
  DATA_INDEX: 'index',
};

new SubwayManager();
