export default class SubwayMap {
  #allStations = [];

  addStation(station) {
    this.#allStations.push(station);
  }

  deleteStation(stationName) {
    const deletingStationIndex = this.#allStations.findIndex(
      (registeredStation) => registeredStation.name === stationName
    );
    if(deletingStationIndex !== -1) {
      this.#allStations.splice(deletingStationIndex, 1);
    }
  }
}
