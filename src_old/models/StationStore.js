import { loadStations, saveStations } from "../utils/storage.js";
import Station from "./Station.js";

class StationStore {
  constructor(key) {
    this.key = key;
    this.stations = loadStations(key);
  }

  getStations() {
    return [...this.stations];
  }

  getStation(name) {
    return this.getStations().find(station => station.name === name);
  }

  getStationNames() {
    return this.getStations().map(station => station.name);
  }

  addStation(name) {
    const newStation = new Station(name);
    this.stations = [...this.getStations(), newStation];

    this.setStations();
  }

  removeStation(name) {
    const stations = this.getStations();
    this.stations = stations.filter(station => station.name !== name);

    this.setStations();
  }

  setStations() {
    saveStations(this.key, this.stations);
  }
}

export default StationStore;
