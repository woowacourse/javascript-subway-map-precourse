export default class SubwayMap {
  #allStations = {};
  #allLines = {};

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

  checkIsDuplicatedStationName(stationName) {
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

  checkIsDuplicatedLineName(lineName) {
    return lineName in this.#allLines;
  }

  deleteLineByName(lineName) {
    if (lineName in this.#allLines) {
      delete this.#allLines[lineName];
    }
  }
}
