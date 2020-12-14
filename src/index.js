import StationManager from "./managers/StationManager.js";

export default class SubwayManager {
  constructor() {
    this.stationManger = new StationManager();
    this.initEvent();
  }

  initEvent() {
    document
      .getElementById("station-manager-button")
      .addEventListener("click", () => {
        this.stationManger.render();
      });
  }
}

//window.localStorage.clear();
new SubwayManager();
