import stationManager from "./Station/index.js";
import lineManager from "./Line/index.js";

const app = document.getElementById("app");

const init = () => {
  const stationMenuButton = document.getElementById("station-manager-button");
  const lineMenuButton = document.getElementById("line-manager-button");
  const sectionMenuButton = document.getElementById("section-manager-button");
  const mapPrintMenuButton = document.getElementById(
    "map-print-manager-button"
  );

  stationMenuButton.addEventListener("click", stationManager);
  lineMenuButton.addEventListener("click", lineManager);
  // sectionMenuButton.addEventListener('click')
  // mapPrintMenuButton.addEventListener('click')
};

if (app) {
  init();
}
