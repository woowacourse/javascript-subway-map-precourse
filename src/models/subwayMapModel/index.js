export default class SubwayMapModel {
  constructor() {
    this._routes = [];
  }

  getRoutes() {
    return [...this._routes];
  }

  // addRoute(route) {
  //   const routes = [...this._routes]
  //   routes.push(route)
  // }
}
