import StationManager from "./managers/StationManager.js";
import LineManager from "./managers/LineManager.js";

export default class SubwayManager {
  constructor() {
    this.stationManger = new StationManager();
    this.lineManager = new LineManager();

    this.initEvent();
  }

  initEvent() {
    document
      .getElementById("station-manager-button")
      .addEventListener("click", () => {
        this.stationManger.render();
      });
    document
      .getElementById("line-manager-button")
      .addEventListener("click", () => {
        this.lineManager.render();
      });
  }
}

//window.localStorage.clear();
new SubwayManager();
