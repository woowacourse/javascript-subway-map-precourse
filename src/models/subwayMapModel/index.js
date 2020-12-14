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
    this.stations[stationId] = stationId;
    localStorage.setItem('stations', JSON.stringify(this.stations));
  }

  deleteStation(stationId) {
    delete this.stations[stationId];
    localStorage.setItem('stations', JSON.stringify(this.stations));
  }

  getLines() {
    return { ...this.lines };
  }

  setLines(lines) {
    const linesInstances = {};

    Object.entries(lines).forEach(line => {
      linesInstances[`${line[0]}`] = new Line({
        lineId: line[1].lineId,
        sections: line[1].sections.map(section => {
          return section.stationId;
        }),
      });
    });

    this.lines = linesInstances;
  }

  getLine(lineId) {
    return this.lines[lineId];
  }

  addLine(lineObject) {
    this.lines[lineObject.lineId] = new Line(lineObject);
    localStorage.setItem('lines', JSON.stringify(this.lines));
  }

  deleteLine(lineId) {
    delete this.lines[lineId];
    localStorage.setItem('lines', JSON.stringify(this.lines));
  }

  // selectLine(lineId) {
  //   return this.lines[lineId].getSections();
  // }

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
