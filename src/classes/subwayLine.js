import { SUBWAY_STATION_IN_LINE_DELETE_LENGTH_LIMIT } from '../constants/configuration.js';

export default class SubwayLine {
  #allStationsInLine = [];

  static checkIsStartAndEndStationNamesSame(startStationName, endStationName) {
    return startStationName === endStationName;
  }

  constructor({ startStationName, endStationName }) {
    this.#allStationsInLine.push(startStationName);
    this.#allStationsInLine.push(endStationName);
  }

  get allStationsInLine() {
    return this.#allStationsInLine;
  }

  addStationToLineByName(stationName) {
    if (stationName in this.#allStationsInLine === false) {
      this.#allStationsInLine.push(stationName);
    }
  }

  insertStationToLineByNameAndIndex(stationName, positionIndex) {
    if (stationName in this.#allStationsInLine === false) {
      this.#allStationsInLine.splice(positionIndex, 0, stationName);
    }
  }

  pullOutStationFromLineByName(stationName) {
    this.#allStationsInLine.forEach((registeredStationName, index) => {
      if (registeredStationName === stationName) {
        this.#allStationsInLine.splice(index, 1);
      }
    });
  }

  isAllStationsInLineLessThanLimit() {
    return (
      this.#allStationsInLine.length <
      SUBWAY_STATION_IN_LINE_DELETE_LENGTH_LIMIT
    );
  }
}
