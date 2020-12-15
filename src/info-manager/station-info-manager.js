import { hasNotOverlapName } from "../utility/input-check-utility.js";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utility/storage-utility.js";

export default class StationINFOManager {
  constructor(subwayINFOManager) {
    this._stations = loadFromLocalStorage(ITEM_NAME_OF_STATIONS);
    if (this._stations === null) {
      this._stations = [];
    }
    this._subwayINFOManager = subwayINFOManager;
  }
  addNewStation({ name }) {
    const newStation = this._makeNewStationByTemplate(name);
    this._stations.push(newStation);
    saveToLocalStorage(ITEM_NAME_OF_STATIONS, this._stations);
  }
  deleteStation(nameToDelete, lines) {
    const stationIndexToDelete = this._stations.findIndex(({ name }) => {
      return nameToDelete === name;
    });
    const isRegistedStationInLine = this._hasRegistedStationInLine(
      nameToDelete,
      lines
    );
    if (isRegistedStationInLine) {
      alert(STATION_INCLUDE_IN_LINE_ERROR_MESSAGE);
      return;
    }
    this._stations.splice(stationIndexToDelete, 1);
    saveToLocalStorage(ITEM_NAME_OF_STATIONS, this._stations);
  }
  getOneStationByName(name) {
    for (let station of this._stations) {
      if (station.name === name) {
        return station;
      }
    }
    return -1;
  }
  getAllStationNames() {
    const stationNames = [];
    this._stations.forEach(({ name }) => {
      stationNames.push(name);
    });
    return stationNames;
  }
  getAllStations() {
    return [...this._stations];
  }
  hasNotOverlapNameAmongStations(inputName) {
    const isNotOverlapName = hasNotOverlapName(this._stations, inputName);
    if (!isNotOverlapName) {
      alert(OVERLAP_STATION_ERROR_MESSAGE);
    }
    return isNotOverlapName;
  }

  _makeNewStationByTemplate(stationName) {
    return {
      name: stationName,
    };
  }
  _hasRegistedStationInLine(stationName, lines) {
    const isRegistedStationInLine = lines.some((line) => {
      const indexToEqualStationName = line.stationsOfLine.findIndex((name) => {
        return name === stationName;
      });
      return indexToEqualStationName !== -1;
    });
    return isRegistedStationInLine;
  }
}

const OVERLAP_STATION_ERROR_MESSAGE = "기존 역 이름과 중복되는 이름입니다.";
const STATION_INCLUDE_IN_LINE_ERROR_MESSAGE = `1개 이상의 노선에 포함되어 있는 역은 삭제할 수 없습니다.`;

const ITEM_NAME_OF_STATIONS = "stations";
