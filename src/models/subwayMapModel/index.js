import { Line } from '../../models';

export default class SubwayMapModel {
  constructor() {
    this._lines = {};
    this._stations = {};

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
    return { ...this._stations };
  }

  setStations(stations) {
    this._stations = stations;
  }

  addStation(stationId) {
    this._stations[stationId] = stationId;
    localStorage.setItem('stations', JSON.stringify(this._stations));
  }

  deleteStation(stationId) {
    delete this._stations[stationId];
    localStorage.setItem('stations', JSON.stringify(this._stations));
  }

  getLines() {
    return { ...this._lines };
  }

  setLines(lines) {
    const linesInstances = {};

    Object.entries(lines).forEach(line => {
      linesInstances[`${line[0]}`] = new Line({
        lineId: line[1]._lineId,
        sections: line[1]._sections.map(section => {
          return section._stationId;
        }),
      });
    });

    this._lines = linesInstances;
  }

  getLine(lineId) {
    return this._lines[lineId];
  }

  addLine(lineObject) {
    this._lines[lineObject.lineId] = new Line(lineObject);
    localStorage.setItem('lines', JSON.stringify(this._lines));
  }

  deleteLine(lineId) {
    delete this._lines[lineId];
    localStorage.setItem('lines', JSON.stringify(this._lines));
  }

  // selectLine(lineId) {
  //   return this._lines[lineId].getSections();
  // }

  addSectionToLine(sectionId, lineId, order) {
    this._lines[lineId].addSection(sectionId, order);
    localStorage.setItem('lines', JSON.stringify(this._lines));
  }

  getSectionsFromLine(lineId) {
    return this._lines[lineId].getSections();
  }

  deleteSectionFromLine(lineId, order) {
    this._lines[lineId].deleteSection(order);
    localStorage.setItem('lines', JSON.stringify(this._lines));
  }
}
