import { Line } from '../../models';

export default class SubwayMapModel {
  constructor() {
    this.lines = {};
    this.stations = {};
  }

  getStations() {
    return { ...this.stations };
  }

  setStations(stations) {
    this.stations = stations;
  }

  addStation(stationId) {
    const stations = { ...this.stations };
    stations[stationId] = stationId;

    this.stations = stations;

    localStorage.setItem('stations', JSON.stringify(this.stations));
  }

  deleteStation(stationId) {
    const stations = { ...this.stations };
    delete stations[stationId];
    this.stations = stations;

    localStorage.setItem('stations', JSON.stringify(this.stations));
  }

  getLines() {
    return { ...this.lines };
  }

  getLine(lineId) {
    return this.lines[lineId];
  }

  addLine(lineObject) {
    const lines = { ...this.lines };
    lines[lineObject.lineId] = new Line(lineObject);

    this.lines = lines;
  }

  deleteLine(lineId) {
    const lines = { ...this.lines };
    delete lines[lineId];

    this.lines = lines;
  }

  selectline(lineId) {
    return this.lines[lineId].getSections();
  }

  addSectionToLine(sectionId, lineId, order) {
    this.lines[lineId].addSection(sectionId, order);
  }

  getSectionsFromLine(lineId) {
    return this.lines[lineId].getSections();
  }

  deleteSectionFromLine(lineId, order) {
    this.lines[lineId].deleteSection(order);
  }
}
