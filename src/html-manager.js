import MenubarUI from "./ui/menubar-ui.js";
import StationManagerUI from "./ui/contents-ui/station-manager-ui.js";
import LineManagerUI from "./ui/contents-ui/line-manager-ui.js";
import SectionManagerUI from "./ui/contents-ui/section-manager-ui.js";
import MapPrintManagerUI from "./ui/contents-ui/map-print-manager-ui.js";

export default class HTMLManager {
  constructor(subwayINFOManager) {
    this._subwayINFOManager = subwayINFOManager;
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
      this._subwayINFOManager
    );
  }
  setContentsUIOnSectionUI() {
    this._contentsUI = new LineManagerUI(
      CONTENTS_ID,
      this._subwayINFOManager
    );
  }
  setContentsUIOnLineUI() {
    this._contentsUI = new SectionManagerUI(
      CONTENTS_ID,
      this._subwayINFOManager
    );
  }
  setContentsUIOnMapPrintUI() {
    this._contentsUI = new MapPrintManagerUI(
      CONTENTS_ID,
      this._subwayINFOManager
    );
  }
}

const MENUBAR_ID = "menubar";
const CONTENTS_ID = "contents";
