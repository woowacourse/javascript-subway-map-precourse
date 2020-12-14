import { STATION_DIV, LINE_DIV, SELECTION_DIV } from "../constant.js";
import {
  controlDisplay,
  cleanPreView,
  cleanView,
  printStation,
} from "./controlView.js";
import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { ERR_MESSAGE_STATION } from "../constant.js";

export function stationAddHandler() {
  const stationNameInput = document.getElementById("station-name-input");
  if (this.isValidStation(stationNameInput.value)) {
    this.station.push({
      id: Math.random().toString(36).substr(2, 16),
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
  let tr = e.target.parentNode.parentNode;
  const clearStation = this.station.filter((v) => v.id !== tr.dataset.id);
  this.station = clearStation;
  console.log(clearStation);
  printStation.call(this);
}
