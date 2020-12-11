import {
  onStationButtonClick,
  onLineButtonClick,
  onSectionButtonClick,
  onPrintButtonClick,
} from "./handler.js";

document
  .getElementById("station-manager-button")
  .addEventListener("click", onStationButtonClick);
document
  .getElementById("line-manager-button")
  .addEventListener("click", onLineButtonClick);
document
  .getElementById("section-manager-button")
  .addEventListener("click", onSectionButtonClick);
document
  .getElementById("map-print-manager-button")
  .addEventListener("click", onPrintButtonClick);
