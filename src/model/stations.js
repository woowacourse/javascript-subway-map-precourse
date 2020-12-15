import { loadStorage, saveStorage } from '../util/handleStorage.js';
import { NAME, ALERT } from '../constants/index.js';

export default class Stations {
  constructor() {
    this.stations = [];
  }

  getStations() {
    return this.stations;
  }

  loadStations() {
    this.stations = loadStorage(NAME.LOCALSTORAGE_STATION_KEY);
  }

  addStation(name) {
    const station = { name: name, line: 0 };

    this.stations.push(station);
  }

  saveStations() {
    saveStorage(NAME.LOCALSTORAGE_STATION_KEY, this.stations);
  }

  deleteStation(index) {
    if (this.stations[index].line > 0) {
      alert(ALERT.DELETE_ERROR);
    } else {
      this.stations.splice(index, 1);
    }
  }

  addLine(stationName) {
    this.stations.forEach((station) => {
      if (station.name === stationName) {
        station.line += 1;
      }
    });
  }

  deleteLine(lineSection) {
    this.stations.forEach((station) => {
      if (lineSection.indexOf(station.name) > -1) {
        station.line -= 1;
      }
    });
  }
}
