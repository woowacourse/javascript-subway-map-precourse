import { Line } from '../../models';

export default class SubwayMapModel {
  constructor() {
    this.lines = {};
    this.stations = {};

    this.setLocalStorage();
  }

  setLocalStorage() {
    if ('stations' in localStorage) {
      this.setStations(JSON.parse(localStorage.getItem('stations')));
    }

    if ('lines' in localStorage) {
      this.setLines(JSON.parse(localStorage.getItem('lines')));
    }
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

  setLines(lines) {
    const linesInstances = {};

    Object.entries(lines).forEach(line => {
      console.log(line[1]);
      linesInstances[`${line[0]}`] = new Line({
        lineId: line[1].lineId,
        sections: line[1].sections.map(section => {
          return section.stationId;
        }),
      });
    });
    console.log(linesInstances, 'call');

    this.lines = linesInstances;
  }

  getLine(lineId) {
    return this.lines[lineId];
  }

  addLine(lineObject) {
    const lines = { ...this.lines };
    lines[lineObject.lineId] = new Line(lineObject);
    this.lines = lines;

    localStorage.setItem('lines', JSON.stringify(this.lines));
  }

  deleteLine(lineId) {
    const lines = { ...this.lines };
    delete lines[lineId];

    this.lines = lines;

    localStorage.setItem('lines', JSON.stringify(this.lines));
  }

  selectline(lineId) {
    return this.lines[lineId].getSections();
  }

  addSectionToLine(sectionId, lineId, order) {
    this.lines[lineId].addSection(sectionId, order);

    localStorage.setItem('lines', JSON.stringify(this.lines));
  }

  getSectionsFromLine(lineId) {
    return this.lines[lineId].getSections();
  }

  deleteSectionFromLine(lineId, order) {
    this.lines[lineId].deleteSection(order);

    localStorage.setItem('lines', JSON.stringify(this.lines));
  }
}
