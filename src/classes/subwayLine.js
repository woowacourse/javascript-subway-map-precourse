import { SUBWAY_STATION_IN_LINE_DELETE_LENGTH_LIMIT } from '../constants/configuration.js';

export default class SubwayLine {
  #allStationsInLine = [];

  static checkIsStationsSame(startStationName, endStationName) {
    return startStationName === endStationName;
  }

  static checkIsIndexNumberCorrect(index) {
    console.log(typeof index, Number.isNaN(index));
    return typeof index === 'number' && Number.isNaN(index) === false;
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

  insertStationToLineByNameAndIndex({ stationName, index }) {
    if (stationName in this.#allStationsInLine === false) {
      this.#allStationsInLine.splice(index, 0, stationName);
    }
  }

  pullOutStationFromLineByIndex(stationIndex) {
    this.#allStationsInLine.splice(stationIndex, 1);
  }

  checkIsStationNameExistInLine(stationName) {
    return this.#allStationsInLine.includes(stationName);
  }

  checkIsAllStationsInLineLengthSameAsLimit() {
    return (
      this.#allStationsInLine.length <=
      SUBWAY_STATION_IN_LINE_DELETE_LENGTH_LIMIT
    );
  }
}
