import { SUBWAY_MAP_ITEM_NAME } from '../constants/configuration.js';
import { setItemWithKey, getItemByKey } from '../utils/localStorage.js';

export default class SubwayMap {
  #allStations = {};
  #allLines = {};

  static loadMapFromLocalStorage() {
    return getItemByKey(SUBWAY_MAP_ITEM_NAME);
  }

  get allStations() {
    return this.#allStations;
  }

  get allLines() {
    return this.#allLines;
  }

  addStation(station, stationName) {
    if (stationName in this.#allStations === false) {
      this.#allStations[stationName] = station;
    }
  }

  checkIsStationNameExist(stationName) {
    return stationName in this.#allStations;
  }

  deleteStationByName(stationName) {
    if (stationName in this.#allStations) {
      delete this.#allStations[stationName];
    }
  }

  addLine(line, lineName) {
    if (lineName in this.#allLines === false) {
      this.#allLines[lineName] = line;
    }
  }

  checkIsLineNameExist(lineName) {
    return lineName in this.#allLines;
  }

  deleteLineByName(lineName) {
    if (lineName in this.#allLines) {
      delete this.#allLines[lineName];
    }
  }

  saveMapToLocalStorage() {
    const subwayMapItem = {
      stations: this.#allStations,
      lines: this.#allLines,
    };
    setItemWithKey(subwayMapItem, SUBWAY_MAP_ITEM_NAME);
  }
}
