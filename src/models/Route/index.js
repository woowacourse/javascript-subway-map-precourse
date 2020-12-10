import { Station } from '../../models';

export default class Route {
  constructor(routeObject) {
    this.routeId = routeObject.routeId;
    this._stations = [];
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
