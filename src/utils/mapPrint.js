import { getDataFromLocalStorage } from "./data.js";
import { cleanPreView } from "./controlView.js";
export function mapPrintHandler() {
  getDataFromLocalStorage(this);
  cleanView();
}

export function printMapInit() {
  const mapPrintManageButton = document.getElementById(
    "map-print-manage-button"
  );
  mapPrintManageButton.addEventListener("click", mapPrintHandler.bind(this));
}
