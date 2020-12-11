import { Station } from '..';

export default class Line {
  constructor(lineObject) {
    this.lineId = lineObject.lineId;
    this.stations = [lineObject.startStation, lineObject.endStation];
    this.startStation = lineObject.startStation;
    this.endStation = lineObject.endStation;
  }

  getStations() {
    return [...this.stations];
  }

  addStation(stationObject, order) {
    const stations = [...this.stations].splice(
      order,
      0,
      new Station(stationObject),
    );

    this.stations = stations;
  }

  removeStation(order) {
    const stations = [...this.stations].splice(order, 1);

    this.stations = stations;
  }
}
