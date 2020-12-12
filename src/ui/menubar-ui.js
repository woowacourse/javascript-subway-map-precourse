export default class MenubarUI {
  constructor({ htmlManager, menubarID }) {
    this.htmlManager_ = htmlManager;
    this.menubarID_ = menubarID;
    this.setMenubar();
  }

  setMenubar() {
    document.getElementById(this.menubarID_).innerHTML = MENU_TEMPLATE;
    this.addEventToStationButton_();
    this.addEventToLineButton_();
    this.addEventToSectionButton_();
    this.addEventToMapPrintButton_();
  }

  addEventToStationButton_() {
    const button = document.getElementById(STATION_ID);
    button.addEventListener("click", () => {
      this.htmlManager_.setContentsUIOnStationUI();
    });
  }
  addEventToLineButton_() {
    const button = document.getElementById(LINE_ID);
    button.addEventListener("click", () => {
      this.htmlManager_.setContentsUIOnSectionUI();
    });
  }
  addEventToSectionButton_() {
    const button = document.getElementById(SECTION_ID);
    button.addEventListener("click", () => {
      this.htmlManager_.setContentsUIOnLineUI();
    });
  }
  addEventToMapPrintButton_() {
    const button_ = document.getElementById(MAP_PRINT_ID);
    button_.addEventListener("click", () => {
      this.htmlManager_.setContentsUIOnMapPrintUI();
    });
  }
}

const STATION_ID = "station-manager-button";
const LINE_ID = "line-manager-button";
const SECTION_ID = "section-manager-button";
const MAP_PRINT_ID = "map-print-manager-button";

const MENU_TEMPLATE = `
<button id=${STATION_ID}>1. 역 관리</button>
<button id=${LINE_ID}>2. 노선 관리</button>
<button id=${SECTION_ID}>3. 구간 관리</button>
<button id=${MAP_PRINT_ID}>4. 지하철 노선도 출력</button>
`;
