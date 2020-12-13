import Station from "./Station.js";

const initialState = {
  stations: [],
};

class SubwayStore {
  constructor({ stations }) {
    this.stations = stations;
  }

  getStations() {
    return [...this.stations];
  }

  getStationNames() {
    return this.getStations().map(station => station.name);
  }

  addStation(name) {
    const newStation = new Station(name);
    this.stations = [...this.getStations(), newStation];
  }

  removeStation(name) {
    const stations = this.getStations();
    this.stations = stations.filter(station => station.name !== name);
  }
}

export default new SubwayStore(initialState);
