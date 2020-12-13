import StationManager from "./controller/station-manager.controller.js";
import LineManager from "./controller/line-manager.controller.js";
import SectionManager from "./controller/section-manager.controller.js";

import { stationManagerViewHTML } from "./common/template.js";

export default class App {
  constructor() {
    this.contentView = document.getElementById("content");
    this.stationManager = new StationManager();
    this.lineManager = new LineManager();
    this.sectionManger = new SectionManager();
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
      this.sectionManger.renderSectionManagerView();
    }

    if (target.id === "map-print-manager-button") {
    }
  }
}

const app = new App();
document.addEventListener("click", (event) => {
  app.onClickMenuButton(event);
  app.stationManager.onClickButton(event);
  app.lineManager.onClickButton(event);
});
