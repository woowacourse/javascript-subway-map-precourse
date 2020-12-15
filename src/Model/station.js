export default class Station {
  constructor() {
    this.stations = [];
  }

  loadStation(stations) {
    if (stations) {
      return (this.stations = stations);
    }
  }

  addStation(stationName) {
    return this.stations.push(stationName);
  }

  removeStation(stationName) {
    const removedStationIndex = this.stations.indexOf(stationName);

    return this.stations.splice(removedStationIndex, 1);
  }
}
