export default class SubwayMap {
  #allStations = [];
  #allLines = [];

  addStation(station) {
    this.#allStations.push(station);
  }

  checkIsDuplicatedStationName(station) {
    const isDuplicatedStationName = this.#allStations.some(
      (registerdStation) => registerdStation.name === station.name
    );

    return isDuplicatedStationName;
  }

  addLine(line) {
    this.#allLines.push(line);
  }

  deleteStation(stationName) {
    const deletingStationIndex = this.#allStations.findIndex(
      (registeredStation) => registeredStation.name === stationName
    );
    if (deletingStationIndex !== -1) {
      this.#allStations.splice(deletingStationIndex, 1);
    }
  }
}
