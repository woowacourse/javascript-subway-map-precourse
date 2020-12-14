export default class SubwayLine {
  #allStationsInLine = [];

  static checkIsTerminatingStationsSame(
    upTerminatingStationName,
    downTerminatingStationName
  ) {
    return downTerminatingStationName === upTerminatingStationName;
  }

  constructor(upTerminatingStationName, downTerminatingStationName) {
    this.upTerminatingStationName = upTerminatingStationName;
    this.downTerminatingStationName = downTerminatingStationName;
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
}
