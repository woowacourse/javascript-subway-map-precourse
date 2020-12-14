import { StationManager } from "../controller/station-manager.js";
import { StationView } from "./station-view.js";
import { Constant } from "../util/constant.js";
import { LineManager } from "../controller/line-manager.js";
import { LineView } from "./line-view.js";

export const Element = {
  // 초기 화면 버튼
  stationManagerButton: document.querySelector(Constant.STATION_MANAGER_BTN_ID),
  lineManagerButton: document.querySelector(Constant.LINE_MANAGER_BTN_ID),
  sectionManagerButton: document.querySelector(Constant.SECTION_MANAGER_BTN_ID),
  mapPrintManagerButton: document.querySelector(
    Constant.MAP_PRINT_MANAGER_BTN_ID
  ),

  // 역 관리
  stationContainer: document.querySelector(Constant.STATION_CONTAINER_CLASS),
  stationAddButton: document.querySelector(Constant.STATION_ADD_BUTTON_ID),
  stationNameInput: document.querySelector(Constant.STATION_NAME_INPUT_ID),
  stationDeleteButton: document.querySelector(
    Constant.STATION_DELELE_BUTTON_CLASS
  ),

  // 노선 관리
  lineContainer: document.querySelector(Constant.LINE_CONTAINER_CLASS),
  lineStartStationSelector: document.querySelector(
    Constant.LINE_START_STATION_SELECTOR_ID
  ),
  lineEndStationSelector: document.querySelector(
    Constant.LINE_END_STATION_SELECTOR_ID
  ),
  lineAddButton: document.querySelector(Constant.LINE_ADD_BUTTON_ID),
  lineNameInput: document.querySelector(Constant.LINE_NAME_INPUT_ID),

  // 구간 관리
  sectionContainer: document.querySelector(Constant.SECTION_CONTAINER_CLASS),

  // 지하철 노선도 관리
  mapPrintContainer: document.querySelector(Constant.MAP_PRINT_CONTAINER_CLASS),

  // html tag 관련
  querySelectorTbody: document.querySelector(Constant.TBODY),
};

export const ElementControl = {
  hideAllManagers() {
    Element.stationContainer.style.display = Constant.NONE;
    Element.lineContainer.style.display = Constant.NONE;
    Element.sectionContainer.style.display = Constant.NONE;
    Element.mapPrintContainer.style.display = Constant.NONE;
  },

  showStataionManger() {
    this.hideAllManagers();
    Element.stationContainer.style.display = Constant.BLOCK;

    StationManager.isVisited ? StationView.render() : StationManager.init();
  },

  showLineManager() {
    this.hideAllManagers();
    Element.lineContainer.style.display = Constant.BLOCK;

    LineManager.isVisited ? LineView.render() : LineManager.init();
  },

  showSectionManager() {
    this.hideAllManagers();
    Element.sectionContainer.style.display = Constant.BLOCK;
  },

  showMapPrintManager() {
    this.hideAllManagers();
    Element.mapPrintContainer.style.display = Constant.BLOCK;
  },

  clearInput(element) {
    element.value = "";
  },
};
