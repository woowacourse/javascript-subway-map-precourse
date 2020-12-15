import { Line } from '../../models';

export default class SubwayMapModel {
  constructor() {
    this._lines = {};
    this._stations = {};

    this.loadFromLocalStorageData();
  }

  loadFromLocalStorageData() {
    if ('stations' in localStorage) {
      this.setStations(JSON.parse(localStorage.getItem('stations')));
    }

    if ('lines' in localStorage) {
      this.setLines(JSON.parse(localStorage.getItem('lines')));
    }
  }

  saveDataInLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getStations() {
    return { ...this._stations };
  }

  setStations(stations) {
    this._stations = stations;
  }

  addStation(stationId) {
    this._stations[stationId] = stationId;
    this.saveDataInLocalStorage('stations', this._stations);
  }

  deleteStation(stationId) {
    delete this._stations[stationId];
    this.saveDataInLocalStorage('stations', this._stations);
  }

  getLines() {
    return { ...this._lines };
  }

  setLines(lines) {
    const linesInstances = {};

    Object.entries(lines).forEach(line => {
      const [lineId, lineObject] = line;
      linesInstances[`${lineId}`] = new Line({
        lineId: lineObject._lineId,
        sections: lineObject._sections.map(section => {
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
    this.saveDataInLocalStorage('lines', this._lines);
  }

  deleteLine(lineId) {
    delete this._lines[lineId];
    this.saveDataInLocalStorage('lines', this._lines);
  }

  addSectionToLine(sectionId, lineId, order) {
    this._lines[lineId].addSection(sectionId, order);
    this.saveDataInLocalStorage('lines', this._lines);
  }

  getSectionsFromLine(lineId) {
    return this._lines[lineId].getSections();
  }

  deleteSectionFromLine(lineId, order) {
    this._lines[lineId].deleteSection(order);
    this.saveDataInLocalStorage('lines', this._lines);
  }
}
