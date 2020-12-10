import { Route } from '../../models';

export default class SubwayMapModel {
  constructor() {
    this._routes = [];
  }

  getRoutes() {
    return [...this._routes];
  }

  addRoute(routeObj) {
    const routes = [...this._routes];
    routes.push(new Route(routeObj));

    this._routes = routes;
  }
}
