import { STATION_DIV, LINE_DIV, SELECTION_DIV } from "../constant.js";
import { controlDisplay, cleanPreView, cleanView } from "./controlView.js";
import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { ERR_MESSAGE_STATION } from "../constant.js";

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

export function stationAddHandler() {
  const stationNameInput = document.getElementById("station-name-input");
  if (this.isValidStation(stationNameInput.value)) {
    this.station.push({ id: 1, name: stationNameInput.value });
    console.log(this.station);
  } else {
    alert(ERR_MESSAGE_STATION);
  }
}
