import { CONSTANT } from "../util/constant.js";

export const element = {
  stationManagerButton: document.querySelector(CONSTANT.STATION_MANAGER_BTN_ID),
  lineManagerButton: document.querySelector(CONSTANT.LINE_MANAGER_BTN_ID),
  sectionManagerButton: document.querySelector(CONSTANT.SECTION_MANAGER_BTN_ID),
  mapPrintManagerButton: document.querySelector(
    CONSTANT.MAP_PRINT_MANAGER_BTN_ID
  ),

  stationContainer: document.querySelector(CONSTANT.STATION_CONTAINER_CLASS),
  lineContainer: document.querySelector(CONSTANT.LINE_CONTAINER_CLASS),
  sectionContainer: document.querySelector(CONSTANT.SECTION_CONTAINER_CLASS),
  mapPrintContainer: document.querySelector(CONSTANT.MAP_PRINT_CONTAINER_CLASS),
};

export const elementControl = {
  hideAllManagers() {
    element.stationContainer.style.display = CONSTANT.NONE;
    element.lineContainer.style.display = CONSTANT.NONE;
    element.sectionContainer.style.display = CONSTANT.NONE;
    element.mapPrintContainer.style.display = CONSTANT.NONE;
  },

  showStataionManger() {
    this.hideAllManagers();
    element.stationContainer.style.display = CONSTANT.BLOCK;
  },

  showLineManager() {
    this.hideAllManagers();
    element.lineContainer.style.display = CONSTANT.BLOCK;
  },

  showSectionManager() {
    this.hideAllManagers();
    element.sectionContainer.style.display = CONSTANT.BLOCK;
  },

  showMapPrintManager() {
    this.hideAllManagers();
    element.mapPrintContainer.style.display = CONSTANT.BLOCK;
  },
};
