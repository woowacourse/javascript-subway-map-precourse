import StationManager from "./managers/StationManager.js";
import LineManager from "./managers/LineManager.js";
import SectionManager from "./managers/SectionManager.js";

export default class SubwayManager {
  constructor() {
    this.stationManger = new StationManager();
    this.lineManager = new LineManager();
    this.sectionManager = new SectionManager();
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
    document
      .getElementById("section-manager-button")
      .addEventListener("click", () => {
        this.sectionManager.render();
      });
  }
}

//window.localStorage.clear();
new SubwayManager();
