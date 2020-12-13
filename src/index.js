import SubwayLine from './line.js';
import { DOMs, DOMCtrl, DOMStrings } from './doms.js';
import {
  VALID_ADDITION,
  VALID_DELETION,
  isValidStationName,
  isInvalidStationName,
  isValidLineName,
  isInvalidStationOrder,
  isInvalidSectionDeletion,
  isInvalidStationDeletion,
  isEndSection,
  isStartSection,
} from './valid.js';

const CONFIRM_DELETION = '정말로 삭제하시겠습니까?';
const CONFIRM_DELETE_FROM_LINE = '정말로 노선에서 제거하시겠습니까?';

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
      const station = document.getElementById(DOMStrings.STATION_NAME_INPUT).value.trim();
      if (isValidStationName(this.stations, station)) {
        this.stations.push(station);
        localStorage.setItem(dataStrings.DATA_STATIONS, JSON.stringify(this.stations));
        DOMCtrl.openStationManager.bind(this)();
      }
    }
  }

  deleteStation(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.STATION_DELETE_BUTTON) {
      if (!confirm(CONFIRM_DELETION)) {
        return;
      }
      const targetStationName = event.target.dataset[dataStrings.DATA_STATION];
      if (isInvalidStationDeletion(this.lines, targetStationName)) {
        return;
      }
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
      const lineName = document.getElementById(DOMStrings.LINE_NAME_INPUT).value.trim();
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
      if (!confirm(CONFIRM_DELETION)) {
        return;
      }
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
      const stationOrder = +document.getElementById(DOMStrings.SECTION_ORDER_INPUT).value.trim();
      const stationName = document.getElementById(DOMStrings.SECTION_STATION_SELECTOR).value;
      if (isInvalidStationName(this.lines[targetLineIndex].stations, stationName)) {
        return;
      }
      if (isInvalidStationOrder(this.lines[targetLineIndex].stations, stationOrder)) {
        return;
      }
      if (isEndSection(this.lines[targetLineIndex].stations, stationOrder, VALID_ADDITION)) {
        this.lines[targetLineIndex].end = stationName;
      } else if (isStartSection(stationOrder)) {
        this.lines[targetLineIndex].start = stationName;
      }
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
      if (!confirm(CONFIRM_DELETE_FROM_LINE)) {
        return;
      }
      const targetLine = document.getElementById(DOMStrings.SECTION_MANAGER).querySelector('h2')
        .dataset[dataStrings.DATA_TARGET];
      const targetLineIndex = this.lines.findIndex(line => line.lineName === targetLine);
      if (isInvalidSectionDeletion(this.lines[targetLineIndex].stations)) {
        return;
      }
      const targetSectionIndex = +event.target.dataset[dataStrings.DATA_INDEX];
      if (isEndSection(this.lines[targetLineIndex].stations, targetSectionIndex, VALID_DELETION)) {
        this.lines[targetLineIndex].end = this.lines[targetLineIndex].stations[
          targetSectionIndex - 1
        ];
      } else if (isStartSection(targetSectionIndex)) {
        this.lines[targetLineIndex].start = this.lines[targetLineIndex].stations[
          targetSectionIndex + 1
        ];
      }
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
