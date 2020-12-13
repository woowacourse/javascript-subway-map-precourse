export default class SubwayMap {
  #allStations = [];

  addStation(station) {
    this.#allStations.push(station);
  }

  checkIsDuplicatedStationName(station) {
    const isDuplicatedStationName = this.#allStations.some(
      (registerdStation) => registerdStation.name === station.name
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
}
