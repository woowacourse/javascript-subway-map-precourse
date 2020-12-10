export default class Route {
  constructor(routeObject) {
    this.routeId = routeObject.routeId;
    this._stations = [];
  }

  getStations() {
    return [...this._stations];
  }
}
