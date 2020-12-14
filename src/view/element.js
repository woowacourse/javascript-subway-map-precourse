import { StationManager } from "../controller/station-manager.js";
import { StationView } from "./station-view.js";
import { Constant } from "../util/constant.js";
import { LineManager } from "../controller/line-manager.js";
import { LineView } from "./line-view.js";
import { SectionManager } from "../controller/section-manager.js";
import { SectionView } from "./section-view.js";

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
  sectionLineMenu: document.querySelector(Constant.SECTION_LINE_MENU_CLASS),
  sectionManager: document.querySelector(Constant.SECTION_MANAGER_CLASS),
  sectionManagerTitle: document.querySelector(
    Constant.SECTION_MANAGER_TITLE_CLASS
  ),
  sectionStationSelector: document.querySelector(
    Constant.SECTION_STATION_SELECTOR_ID
  ),

  // 지하철 노선도 관리
  mapPrintContainer: document.querySelector(Constant.MAP_PRINT_CONTAINER_CLASS),
};

export const ElementControl = {
  hideAllContainers() {
    Element.stationContainer.style.display = Constant.NONE;
    Element.lineContainer.style.display = Constant.NONE;
    Element.sectionContainer.style.display = Constant.NONE;
    Element.mapPrintContainer.style.display = Constant.NONE;
  },

  showStationContainer() {
    this.hideAllContainers();
    Element.stationContainer.style.display = Constant.BLOCK;

    StationManager.isVisited ? StationView.render() : StationManager.init();
  },

  showLineContainer() {
    this.hideAllContainers();
    Element.lineContainer.style.display = Constant.BLOCK;

    LineManager.isVisited ? LineView.render() : LineManager.init();
  },

  showSectionContainer() {
    this.hideAllContainers();
    Element.sectionContainer.style.display = Constant.BLOCK;

    SectionManager.isVisited ? SectionView.render() : SectionManager.init();
  },

  showSectionManager() {
    Element.sectionManager.style.display = Constant.BLOCK;
  },

  hideSectionManager() {
    Element.sectionManager.style.display = Constant.NONE;
  },

  showMapPrintContainer() {
    this.hideAllContainers();
    Element.mapPrintContainer.style.display = Constant.BLOCK;
  },

  clearInput(element) {
    element.value = "";
  },
};
