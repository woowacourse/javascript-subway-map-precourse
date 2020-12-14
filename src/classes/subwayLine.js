import { SUBWAY_STATION_IN_LINE_DELETE_LENGTH_LIMIT } from '../constants/configuration.js';

export default class SubwayLine {
  #allStationsInLine = [];
  #upTerminatingStationName;
  #downTerminatingStationName;

  static checkIsTerminatingStationsSame(
    upTerminatingStationName,
    downTerminatingStationName
  ) {
    return downTerminatingStationName === upTerminatingStationName;
  }

  constructor({ upTerminatingStationName, downTerminatingStationName }) {
    this.#allStationsInLine.push(upTerminatingStationName);
    this.#allStationsInLine.push(downTerminatingStationName);
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
