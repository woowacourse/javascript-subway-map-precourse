import LineManager from "./managers/LineManager.js";
import StationManager from "./managers/StationManager.js";
import SectionManager from "./managers/SectionManager.js";
import MapPrintManager from "./managers/MapPrintManager.js";

export default class SubwayManager {
  constructor() {
    this.stationManger = new StationManager();
    this.lineManager = new LineManager();
    this.sectionManager = new SectionManager();
    this.mapPrintManager = new MapPrintManager();
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
    document
      .getElementById("map-print-manager-button")
      .addEventListener("click", () => {
        this.mapPrintManager.render();
      });
  }
}

//window.localStorage.clear();
new SubwayManager();
