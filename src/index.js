import SubwayLine from './line.js';
import { DOMs, DOMCtrl, DOMStrings } from './doms.js';
import {
  VALID_ADDITION,
  VALID_DELETION,
  isValidStationName,
  isValidLineName,
  isValidSection,
  isValidSectionDeletion,
  isValidStationDeletion,
  isEndSection,
  isStartSection,
  isStartDiffersWithEnd,
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
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.addStationByClick.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('keydown', this.addStationByEnterKey.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.deleteStationButtonClick.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.addLineByClick.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('keydown', this.addLineByEnterKey.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.deleteLineButtonClick.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', DOMCtrl.selectLine.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.addSectionByClick.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('keydown', this.addSectionByEnterKey.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.deleteSectionButtonClick.bind(this));
  }

  addStationByClick(event) {
    const {
      target: { id },
    } = event;
    if (id === DOMStrings.STATION_ADD_BUTTON) {
      this.addStation();
    }
  }

  addStationByEnterKey(event) {
    const {
      key,
      target: { id },
    } = event;
    if (key === 'Enter') {
      if (id === DOMStrings.STATION_NAME_INPUT) {
        this.addStation();
      }
    }
  }

  addStation() {
    const station = document.getElementById(DOMStrings.STATION_NAME_INPUT).value.trim();
    if (isValidStationName(this.stations, station)) {
      this.stations.push(station);
      this.saveData(dataStrings.DATA_STATIONS, JSON.stringify(this.stations));
      DOMCtrl.openStationManager.bind(this)();
    }
  }

  deleteStationButtonClick(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.STATION_DELETE_BUTTON) {
      if (confirm(CONFIRM_DELETION)) {
        const targetStationName = event.target.dataset[dataStrings.DATA_STATION];
        this.deleteStation(targetStationName);
      }
    }
  }

  deleteStation(targetStationName) {
    if (isValidStationDeletion(this.lines, targetStationName)) {
      const index = this.stations.indexOf(targetStationName);
      this.stations.splice(index, 1);
      this.saveData(dataStrings.DATA_STATIONS, JSON.stringify(this.stations));
      DOMCtrl.openStationManager.bind(this)();
    }
  }

  addLineByClick(event) {
    const {
      target: { id },
    } = event;
    if (id === DOMStrings.LINE_ADD_BUTTON) {
      this.addLine();
    }
  }

  addLineByEnterKey(event) {
    const {
      key,
      target: { id },
    } = event;
    if (key === 'Enter') {
      if (id === DOMStrings.LINE_NAME_INPUT) {
        this.addLine();
      }
    }
  }

  addLine() {
    const lineName = document.getElementById(DOMStrings.LINE_NAME_INPUT).value.trim();
    if (isValidLineName(this.lines, lineName)) {
      const startStation = document.getElementById(DOMStrings.LINE_START_STATION_SELECTOR).value;
      const endStation = document.getElementById(DOMStrings.LINE_END_STATION_SELECTOR).value;
      if (isStartDiffersWithEnd(startStation, endStation)) {
        this.lines.push(new SubwayLine(lineName, startStation, endStation));
        this.saveData(dataStrings.DATA_LINES, JSON.stringify(this.lines));
        DOMCtrl.openLineManager.bind(this)();
      }
    }
  }

  deleteLineButtonClick(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.LINE_DELETE_BUTTON) {
      if (confirm(CONFIRM_DELETION)) {
        const targetLine = event.target.dataset[dataStrings.DATA_LINE];
        this.deleteLine(targetLine);
      }
    }
  }

  deleteLine(targetLine) {
    const index = this.lines.findIndex(line => line.lineName === targetLine);
    this.lines.splice(index, 1);
    this.saveData(dataStrings.DATA_LINES, JSON.stringify(this.lines));
    DOMCtrl.openLineManager.bind(this)();
  }

  addSectionByClick(event) {
    const {
      target: { id },
    } = event;
    if (id === DOMStrings.SECTION_ADD_BUTTON) {
      this.addSection();
    }
  }

  addSectionByEnterKey(event) {
    const {
      key,
      target: { id },
    } = event;
    if (key === 'Enter') {
      if (id === DOMStrings.SECTION_ORDER_INPUT) {
        this.addSection();
      }
    }
  }

  addSection() {
    const targetLineName = document.getElementById(DOMStrings.SECTION_HEADER).dataset[dataStrings.DATA_TARGET];
    const targetLineIndex = this.lines.findIndex(line => line.lineName === targetLineName);
    const stationOrder = +document.getElementById(DOMStrings.SECTION_ORDER_INPUT).value.trim();
    const stationName = document.getElementById(DOMStrings.SECTION_STATION_SELECTOR).value;
    const targetLine = this.lines[targetLineIndex];
    if (isValidSection(targetLine.stations, stationName, stationOrder)) {
      this.changeLineListAfterAddition(targetLine, stationOrder, stationName);
      targetLine.stations = targetLine.stations
        .slice(0, stationOrder)
        .concat(stationName, targetLine.stations.slice(stationOrder));
      this.saveData(dataStrings.DATA_LINES, JSON.stringify(this.lines));
      DOMCtrl.openSectionManager.bind(this)();
      DOMCtrl.openSection.bind(this)(targetLineName, targetLineIndex);
    }
  }

  changeLineListAfterAddition(targetLine, stationOrder, stationName) {
    if (isEndSection(targetLine.stations, stationOrder, VALID_ADDITION)) {
      targetLine.end = stationName;
    } else if (isStartSection(stationOrder)) {
      targetLine.start = stationName;
    }
  }

  deleteSectionButtonClick(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.SECTION_DELETE_BUTTON) {
      if (confirm(CONFIRM_DELETE_FROM_LINE)) {
        const targetSectionIndex = +event.target.dataset[dataStrings.DATA_INDEX];
        this.deleteSection(targetSectionIndex);
      }
    }
  }

  deleteSection(targetSectionIndex) {
    const targetLineName = document.getElementById(DOMStrings.SECTION_HEADER).dataset[dataStrings.DATA_TARGET];
    const targetLineIndex = this.lines.findIndex(line => line.lineName === targetLineName);
    const targetLine = this.lines[targetLineIndex];
    if (isValidSectionDeletion(targetLine.stations)) {
      this.changeLineListAfterDeletion(targetLine, targetSectionIndex);
      targetLine.stations.splice(targetSectionIndex, 1);
      this.saveData(dataStrings.DATA_LINES, JSON.stringify(this.lines));
      DOMCtrl.openSectionManager.bind(this)();
      DOMCtrl.openSection.bind(this)(targetLineName, targetLineIndex);
    }
  }

  changeLineListAfterDeletion(targetLine, targetSectionIndex) {
    if (isEndSection(targetLine.stations, targetSectionIndex, VALID_DELETION)) {
      targetLine.end = targetLine.stations[targetSectionIndex - 1];
    } else if (isStartSection(targetSectionIndex)) {
      targetLine.start = targetLine.stations[targetSectionIndex + 1];
    }
  }

  saveData(key, data) {
    localStorage.setItem(key, data);
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
