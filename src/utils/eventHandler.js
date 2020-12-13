import { STATION_DIV, LINE_DIV, SELECTION_DIV } from "../constant.js";
import { controlDisplay, cleanPreView, cleanView } from "./controlView.js";
import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";

export function stationEventHandler(e) {
  getDataFromLocalStorage(this);
  cleanPreView(STATION_DIV);
  controlDisplay(document.getElementById("app").children[STATION_DIV]);
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
