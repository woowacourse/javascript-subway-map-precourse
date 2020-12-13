import Station from "./Station.js";
import Line from "./Line.js";

const initialState = {
  stations: [],
  lines: [],
};

class SubwayStore {
  constructor({ stations, lines }) {
    this.stations = stations;
    this.lines = lines;
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
  }

  removeStation(name) {
    const stations = this.getStations();
    this.stations = stations.filter(station => station.name !== name);
  }

  getLines() {
    return [...this.lines];
  }

  getLine(name) {
    return this.getLines().find(line => line.name === name);
  }

  getLineNames() {
    return this.getLines().map(line => line.name);
  }

  addLine(name, startStation, EndStation) {
    const newLine = new Line(name, startStation, EndStation);
    this.lines = [...this.getLines(), newLine];
  }

  removeLine(name) {
    const lines = this.getLines();
    this.lines = lines.filter(line => line.name !== name);
  }
}

export default new SubwayStore(initialState);
