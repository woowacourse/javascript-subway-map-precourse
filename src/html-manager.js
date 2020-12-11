import MenubarUI from "./ui/menubar-ui.js";
import StationManagerUI from "./ui/contents-ui/station-manager-ui.js";
import SectionManagerUI from "./ui/contents-ui/section-manager-ui.js";
import LineManagerUI from "./ui/contents-ui/line-manager-ui.js";
import MapPrintManagerUI from "./ui/contents-ui/map-print-manager-ui.js";

export default class HTMLManager {
  constructor({ htmlOfBody }) {
    this.htmlOfBody = htmlOfBody;

    this.menubarUI_ = new MenubarUI({
      htmlManager: this,
      menubarContainer: htmlOfBody.querySelector("#" + MENUBAR_ID),
    });
    this.setContentsUIOnStationUI();
  }

  setContentsUIOnStationUI() {
    this.contentsUI_ = new StationManagerUI({
      contentsContainer: this.htmlOfBody.querySelector("#" + CONTENTS_ID),
    });
  }
  setContentsUIOnSectionUI() {
    this.contentsUI_ = new SectionManagerUI({
      contentsContainer: this.htmlOfBody.querySelector("#" + CONTENTS_ID),
    });
  }
  setContentsUIOnLineUI() {
    this.contentsUI_ = new LineManagerUI({
      contentsContainer: this.htmlOfBody.querySelector("#" + CONTENTS_ID),
    });
  }
  setContentsUIOnMapPrintUI() {
    this.contentsUI_ = new MapPrintManagerUI({
      contentsContainer: this.htmlOfBody.querySelector("#" + CONTENTS_ID),
    });
  }
}

const MENUBAR_ID = "menubar";
const CONTENTS_ID = "contents";
