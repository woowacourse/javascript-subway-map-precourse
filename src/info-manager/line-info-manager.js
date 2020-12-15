import { hasNotOverlapName } from "../utility/input-check-utility.js";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utility/storage-utility.js";

export default class LineINFOManager {
  constructor(subwayINFOManager) {
    this._lines = loadFromLocalStorage(ITEM_NAME_OF_LINES);
    if (this._lines === null) {
      this._lines = [];
    }
    this._subwayINFOManager = subwayINFOManager;
  }
  addNewLine({ lineName, startStationName, endStationName }) {
    const newLine = this._makeNewLineByTemplate(
      lineName,
      startStationName,
      endStationName
    );
    this._lines.push(newLine);
    saveToLocalStorage(ITEM_NAME_OF_LINES, this._lines);
  }
  deleteLine(nameToDelete) {
    const lineIndexToDelete = this._lines.findIndex(({ name }) => {
      return nameToDelete === name;
    });
    if (lineIndexToDelete === -1) {
      return;
    }
    this._lines.splice(lineIndexToDelete, 1);
    saveToLocalStorage(ITEM_NAME_OF_LINES, this._lines);
  }
  deleteSection(targetStationName, targetLineName) {
    const targetLine = this.getOneLineByName(targetLineName);
    if (targetLine.stationsOfLine.length <= MINIMUM_NUMBER_STATIONS_OF_LINE) {
      alert(NOT_MINIMUM_NUMBER_STATIONS_OF_LINE_ERROR_MESSAGE);
      return;
    }
    this._deleteStationInLine(targetStationName, targetLineName);
    saveToLocalStorage(ITEM_NAME_OF_LINES, this._lines);
  }
  getOneLineByName(name) {
    for (let line of this._lines) {
      if (line.name === name) {
        return line;
      }
    }
    return -1;
  }
  getAllLinesByCondition(condition) {
    const returnlines = [];
    this._lines.forEach((line) => {
      if (condition(line)) {
        returnlines.push(line);
      }
    });
    return returnlines;
  }
  getAllLines() {
    return [...this._lines];
  }
  hasNotOverlapNameAmongLines(inputName) {
    const isValid = hasNotOverlapName(this._lines, inputName);
    if (!isValid) {
      alert(OVERLAP_LINE_ERROR_MESSAGE);
    }
    return isValid;
  }
  registerStationToLine(lineName, orderToRegister, stationName) {
    const targetLine = this.getOneLineByName(lineName);
    targetLine.stationsOfLine.splice(orderToRegister, 0, stationName);
    saveToLocalStorage(ITEM_NAME_OF_LINES, this._lines);
  }

  _deleteStationInLine(targetStationName, targetLineName) {
    const targetLine = this.getOneLineByName(targetLineName);
    const targetStationIndex = targetLine.stationsOfLine.findIndex(
      (stationName) => {
        return stationName === targetStationName;
      }
    );
    targetLine.stationsOfLine.splice(targetStationIndex, 1);
  }
  _makeNewLineByTemplate(lineName, startStationName, endStationName) {
    return {
      name: lineName,
      stationsOfLine: [startStationName, endStationName],
    };
  }
}

const MINIMUM_NUMBER_STATIONS_OF_LINE = 2;
const NOT_MINIMUM_NUMBER_STATIONS_OF_LINE_ERROR_MESSAGE = `노선에는 최소 ${MINIMUM_NUMBER_STATIONS_OF_LINE}개의 역이 포함되어 있어야합니다.`;
const OVERLAP_LINE_ERROR_MESSAGE = "기존 노선 이름과 중복되는 이름입니다.";

const ITEM_NAME_OF_LINES = "lines";
