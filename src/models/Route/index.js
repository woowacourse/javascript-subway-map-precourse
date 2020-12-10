export default class Route {
  constructor(routeObj) {
    this.name = routeObj.name;
    this._stations = [];
  }

  getStations() {
    return [...this._stations];
  }
}
