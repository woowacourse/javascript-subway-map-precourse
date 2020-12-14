import StationManager from "./controller/station-manager.controller.js";
import LineManager from "./controller/line-manager.controller.js";
import SectionManager from "./controller/section-manager.controller.js";

import StationManagerView from "./view/station-manager.view.js";
import LineManagerView from "./view/line-manager.view.js";
import SectionManagerView from "./view/section-manager.view.js";

export default class App {
  constructor() {
    this.contentView = document.getElementById("content");
    this.stationManagerView = new StationManagerView(this.contentView);
    this.lineManagerView = new LineManagerView(this.contentView);
    this.sectionManagerView = new SectionManagerView(this.contentView);

    this.stationManager = new StationManager(this.stationManagerView);
    this.lineManager = new LineManager(this.lineManagerView);
    this.sectionManager = new SectionManager(this.sectionManagerView);
  }

  onClickMenuButton(event) {
    const target = event.target;
    if (target.id === "station-manager-button") {
      this.stationManagerView.renderStationManagerView();
    }

    if (target.id === "line-manager-button") {
      this.lineManagerView.renderLineManagerView();
    }

    if (target.id === "section-manager-button") {
      this.sectionManagerView.renderSectionManagerView();
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
  app.sectionManager.onClickButton(event);
});
