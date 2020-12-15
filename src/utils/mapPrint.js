import { getDataFromLocalStorage } from "./data.js";
import { cleanPreView, controlDisplay, printMapList } from "./controlView.js";
import { MAP_DIV } from "../constant.js";
export function mapPrintHandler() {
  getDataFromLocalStorage(this);
  cleanPreView(MAP_DIV);
  controlDisplay(document.getElementById("app").children[MAP_DIV]);
  printMapList.call(this);
}

export function printMapInit() {
  const mapPrintManageButton = document.getElementById(
    "map-print-manage-button"
  );
  mapPrintManageButton.addEventListener("click", mapPrintHandler.bind(this));
}
