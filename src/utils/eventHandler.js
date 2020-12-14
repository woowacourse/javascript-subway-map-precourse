import { getNewId } from "./getNewId.js";
import {
  STATION_DIV,
  LINE_DIV,
  SELECTION_DIV,
  ERR_MESSAGE_STATION,
  DELETE_MESSAGE_STATION,
} from "../constant.js";
import {
  controlDisplay,
  cleanPreView,
  cleanView,
  printStation,
} from "./controlView.js";
import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";

export function stationAddHandler() {
  const stationNameInput = document.getElementById("station-name-input");
  if (this.isValidStation(stationNameInput.value)) {
    this.station.push({
      id: getNewId(),
      name: stationNameInput.value,
    });
    printStation.call(this);
    stationNameInput.value = "";
  } else {
    alert(ERR_MESSAGE_STATION);
    stationNameInput.value = "";
  }
}

export function stationEventHandler(e) {
  getDataFromLocalStorage(this);
  cleanPreView(STATION_DIV);
  controlDisplay(document.getElementById("app").children[STATION_DIV]);
  const stationAddButton = document.getElementById("station-add-button");
  stationAddButton.addEventListener("click", stationAddHandler.bind(this));
}
export function lineEventHandler(e) {
  getDataFromLocalStorage(this);
  cleanPreView(LINE_DIV);
  controlDisplay(document.getElementById("app").children[LINE_DIV]);
}
export function sectionEventHandler(e) {
  getDataFromLocalStorage(this);
  cleanPreView(SELECTION_DIV);
  controlDisplay(document.getElementById("app").children[SELECTION_DIV]);
}
export function mapPrintHandler() {
  getDataFromLocalStorage(this);
  cleanView();
}

export function removeStationHandler(e) {
  if (confirm(DELETE_MESSAGE_STATION)) {
    const tr = e.target.parentNode.parentNode;
    const clearStation = this.station.filter((v) => v.id !== tr.dataset.id);
    this.station = clearStation;
    console.log(clearStation);
    printStation.call(this);
  }
}
