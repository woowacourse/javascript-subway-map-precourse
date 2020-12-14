export default class MenubarUI {
  constructor({ htmlManager, menubarID }) {
    this._htmlManager = htmlManager;
    this._menubarID = menubarID;
    this.setMenubar();
  }
  setMenubar() {
    document.getElementById(this._menubarID).innerHTML = MENU_TEMPLATE;
    this._addEventToStationButton();
    this._addEventToLineButton();
    this._addEventToSectionButton();
    this._addEventToMapPrintButton();
  }

  _addEventToStationButton() {
    const button = document.getElementById(STATION_ID);
    button.addEventListener("click", () => {
      this._htmlManager.setContentsUIOnStationUI();
    });
  }
  _addEventToLineButton() {
    const button = document.getElementById(LINE_ID);
    button.addEventListener("click", () => {
      this._htmlManager.setContentsUIOnSectionUI();
    });
  }
  _addEventToSectionButton() {
    const button = document.getElementById(SECTION_ID);
    button.addEventListener("click", () => {
      this._htmlManager.setContentsUIOnLineUI();
    });
  }
  _addEventToMapPrintButton() {
    const button = document.getElementById(MAP_PRINT_ID);
    button.addEventListener("click", () => {
      this._htmlManager.setContentsUIOnMapPrintUI();
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
