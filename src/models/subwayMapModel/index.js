import { Line } from '../../models';

export default class SubwayMapModel {
  constructor() {
    this._lines = {};
    this._stations = {};
  }

  getStations() {
    return { ...this._stations };
  }

  addStation(stationId) {
    const stations = { ...this._stations };
    stations[stationId] = stationId;

    this._stations = stations;
  }

  deleteStation(stationId) {
    const stations = { ...this._stations };
    delete stations[stationId];

    this._stations = stations;
  }

  getLines() {
    return { ...this._lines };
  }

  addLine(lineObject) {
    const lines = { ...this._lines };
    lines[lineObject.lineId] = new Line(lineObject);

    this._lines = lines;
  }

  removeLine(lineId) {
    const lines = { ...this._lines };
    delete lines[lineId];

    this._lines = lines;
  }

  selectline(lineId) {
    return this._lines[lineId].getStations();
  }

  addStationToline(stationObject, lineId, order) {
    this._lines[lineId].addStation(stationObject, order);
  }

  removeStationFromline(lineId, order) {
    this._lines[lineId].removeStation(order);
  }
}
