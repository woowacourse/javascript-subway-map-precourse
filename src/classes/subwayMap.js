export default class SubwayMap {
  #allStations = [];

  addStation(station) {
    this.#allStations.push(station);
  }
}
