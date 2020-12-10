import { Route } from '../../models';

export default class SubwayMapModel {
  constructor() {
    this._routes = {};
    this.stations = {};
  }

  getStation() {
    return { ...this._routes };
  }

  getRoutes() {
    return { ...this._routes };
  }

  addRoute(routeObject) {
    const routes = { ...this._routes };
    routes.routeObj.routeId = new Route(routeObject);

    this._routes = routes;
  }

  removeRoute(routeId) {
    const routes = { ...this._routes };
    delete routes[routeId];

    this._routes = routes;
  }

  selectRoute(routeId) {
    return this._routes[routeId].getStations();
  }

  addStationToRoute(stationObject, routeId, order) {
    this._routes[routeId].addStation(stationObject, order);
  }

  removeStationFromRoute(routeId, order) {
    this._routes[routeId].removeStation(order);
  }
}
