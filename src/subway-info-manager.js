import StationINFOManager from "./info-manager/station-info-manager.js";
import LineINFOManager from "./info-manager/line-info-manager.js";

export default class SubwayINFOManager {
  constructor() {
    this._stationINFOManager = new StationINFOManager(this);
    this._lineINFOManager = new LineINFOManager(this);
  }

  getStationINFOManager() {
    return this._stationINFOManager;
  }
  getLineINFOManager() {
    return this._lineINFOManager;
  }
}
