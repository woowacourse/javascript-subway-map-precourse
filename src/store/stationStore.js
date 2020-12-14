import Observer from "./observer.js";

class StationStore extends Observer {
  constructor(stations) {
    super();
    this.stations = stations;
  }

  getStations() {
    return this.stations;
  }

  setStations(stations) {
    this.stations = stations;
    this.notify();
  }
}

export default StationStore;
