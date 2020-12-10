import { Route } from '../../models';

export default class SubwayMapModel {
  constructor() {
    this._routes = {};
  }

  getRoutes() {
    return { ...this._routes };
  }

  addRoute(routeObject) {
    const routes = { ...this._routes };
    routes.routeObj.name = new Route(routeObject);

    this._routes = routes;
  }

  removeRoute(routeId) {
    const routes = this._routes.splice(routeId, 1);

    this._routes = routes;
  }

  selectRoute(routeId) {
    return this._routes[routeId]._stations;
  }
}
