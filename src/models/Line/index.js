import { Station } from '..';

export default class Line {
  constructor(lineObject) {
    this._lineId = lineObject.lineId;
    this._stations = [];
    this._startStation = lineObject.startStation;
    this._endStation = lineObject.endStation;
  }

  getStations() {
    return [...this._stations];
  }

  addStation(stationObject, order) {
    const stations = [...this._stations].splice(
      order,
      0,
      new Station(stationObject),
    );

    this._stations = stations;
  }

  removeStation(order) {
    const stations = [...this._stations].splice(order, 1);

    this._stations = stations;
  }
}
