export default class SubwayMap {
  #allStations = [];
  #allLines = [];

  addStation(station) {
    this.#allStations.push(station);
  }

  checkIsDuplicatedStationName(stationName) {
    const isDuplicatedStationName = this.#allStations.some(
      (registerdStation) => registerdStation.name === stationName
    );

    return isDuplicatedStationName;
  }

  deleteStation(stationName) {
    const deletingStationIndex = this.#allStations.findIndex(
      (registeredStation) => registeredStation.name === stationName
    );
    if (deletingStationIndex !== -1) {
      this.#allStations.splice(deletingStationIndex, 1);
    }
  }

  addLine(line) {
    this.#allLines.push(line);
  }

  deleteLine(lineName) {
    const deletingLineIndex = this.#allLines.findIndex(
      (registerdLine) => registerdLine.name === lineName
    );
    if (deletingLineIndex !== -1) {
      this.#allLines.splice(deletingLineIndex, 1);
    }
  }
}
