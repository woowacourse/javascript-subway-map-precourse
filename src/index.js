import StationManager from "./controller/station-manager.controller.js";
import LineManagerController from "./controller/line-manager.controller.js";
import { stationManagerViewHTML } from "./common/template.js";

export default class App {
  constructor() {
    this.contentView = document.getElementById("content");
    this.stationManager = new StationManager();
    this.lineManager = new LineManagerController();
  }

  onClickMenuButton(event) {
    const target = event.target;
    if (target.id === "station-manager-button") {
      this.contentView.innerHTML = stationManagerViewHTML;
      this.stationManager.renderStationTable();
    }

    if (target.id === "line-manager-button") {
      this.lineManager.renderLineManagerView();
    }

    if (target.id === "section-manager-button") {
      //
    }

    if (target.id === "map-print-manager-button") {
    }
  }
}

const app = new App();
document.addEventListener("click", (event) => {
  app.onClickMenuButton(event);
  app.stationManager.onClickButton(event);
});
