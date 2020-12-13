import MenubarUI from "./ui/menubar-ui.js";
import StationManagerUI from "./ui/contents-ui/station-manager-ui.js";
import LineManagerUI from "./ui/contents-ui/line-manager-ui.js";
import SectionManagerUI from "./ui/contents-ui/section-manager-ui.js";
import MapPrintManagerUI from "./ui/contents-ui/map-print-manager-ui.js";

export default class HTMLManager {
  constructor(stationINFOManager) {
    this._stationINFOManager = stationINFOManager;
    this._menubarUI = new MenubarUI({
      htmlManager: this,
      menubarID: MENUBAR_ID,
    });
    this._contentsUI = null;
    this.setContentsUIOnStationUI();
  }
  setContentsUIOnStationUI() {
    this._contentsUI = new StationManagerUI(
      CONTENTS_ID,
      this._stationINFOManager
    );
  }
  setContentsUIOnSectionUI() {
    this._contentsUI = new LineManagerUI(
      CONTENTS_ID,
      this._stationINFOManager
    );
  }
  setContentsUIOnLineUI() {
    this._contentsUI = new SectionManagerUI(
      CONTENTS_ID,
      this._stationINFOManager
      );
  }
  setContentsUIOnMapPrintUI() {
    this._contentsUI = new MapPrintManagerUI(
      CONTENTS_ID,
      this._stationINFOManager
    );
  }
}

const MENUBAR_ID = "menubar";
const CONTENTS_ID = "contents";
