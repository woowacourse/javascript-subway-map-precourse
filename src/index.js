import StationManager from "./controller/station-manager.controller.js";
import LineManager from "./controller/line-manager.controller.js";
import SectionManager from "./controller/section-manager.controller.js";

import StationManagerView from "./view/station-manager.view.js";
import LineManagerView from "./view/line-manager.view.js";
import SectionManagerView from "./view/section-manager.view.js";
import MapPrintView from "./view/map-print-manager.view.js";
import { camelize } from "./common/util.js";

export default class App {
  constructor() {
    this.contentView = document.getElementById("content");
    this.stationManagerView = new StationManagerView(this.contentView);
    this.lineManagerView = new LineManagerView(this.contentView);
    this.sectionManagerView = new SectionManagerView(this.contentView);
    this.mapPrintManagerView = new MapPrintView(this.contentView);

    this.stationManager = new StationManager(this.stationManagerView);
    this.lineManager = new LineManager(this.lineManagerView);
    this.sectionManager = new SectionManager(this.sectionManagerView);
  }

  manageStation() {
    this.stationManagerView.renderStationManagerView();
  }

  manageLine() {
    this.lineManagerView.renderLineManagerView();
  }

  manageSection() {
    this.sectionManagerView.renderSectionManagerView();
  }

  manageMapPrint() {
    this.mapPrintManagerView.renderLineMapView();
  }

  onClickMenuButton = (event) => {
    const action = event.target.dataset.action;
    if (action) {
      const menuAction = camelize(action);
      this[menuAction]();
    }
  };
}

const app = new App();
document.addEventListener("click", (event) => {
  app.onClickMenuButton(event);
  app.stationManager.onClickButton(event);
  app.lineManager.onClickButton(event);
  app.sectionManager.onClickButton(event);
});
