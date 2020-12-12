import MenubarUI from "./ui/menubar-ui.js";
import StationManagerUI from "./ui/contents-ui/station-manager-ui.js";
import SectionManagerUI from "./ui/contents-ui/section-manager-ui.js";
import LineManagerUI from "./ui/contents-ui/line-manager-ui.js";
import MapPrintManagerUI from "./ui/contents-ui/map-print-manager-ui.js";

export default class HTMLManager {
  constructor(stationINFOManager) {
    this.stationINFOManager = stationINFOManager;
    this.menubarUI_ = new MenubarUI({
      htmlManager: this,
      menubarID: MENUBAR_ID,
    });
    this.setContentsUIOnStationUI();
  }

  setContentsUIOnStationUI() {
    this.contentsUI_ = new StationManagerUI(
      CONTENTS_ID,
      this.stationINFOManager
    );
  }
  setContentsUIOnSectionUI() {
    this.contentsUI_ = new SectionManagerUI(
      CONTENTS_ID,
      this.stationINFOManager
    );
  }
  setContentsUIOnLineUI() {
    this.contentsUI_ = new LineManagerUI(
      CONTENTS_ID, 
      this.stationINFOManager
      );
  }
  setContentsUIOnMapPrintUI() {
    this.contentsUI_ = new MapPrintManagerUI(
      CONTENTS_ID,
      this.stationINFOManager
    );
  }
}

const MENUBAR_ID = "menubar";
const CONTENTS_ID = "contents";
