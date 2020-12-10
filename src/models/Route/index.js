import { Station } from '../../models';

export default class Route {
  constructor(routeObject) {
    this._routeId = routeObject.routeId;
    this._stations = [];
    this._upboundTerminalStation = routeObject.upboundTerminalStation;
    this._downingTerminalStation = routeObject.downingTerminalStation;
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
