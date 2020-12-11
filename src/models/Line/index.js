import { Station } from '..';

export default class Line {
  constructor(lineObject) {
    this.lineId = lineObject.lineId;
    this.stations = [];
    this.startStation = lineObject.startStation;
    this.endStation = lineObject.endStation;
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
