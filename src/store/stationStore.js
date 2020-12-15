import Observer from "./observer.js";

class StationStore extends Observer {
  constructor(stations) {
    super();
    this.stations = stations;
  }

  addStation(name) {
    const stations = [...this.stations, name];
    this.setStations(stations);
  }

  removeStation(name) {
    const stations = this.stations.filter(_name => _name !== name);
    this.setStations(stations);
  }

  setStations(stations) {
    this.stations = stations;
    this.notify();
  }
}

export default StationStore;
