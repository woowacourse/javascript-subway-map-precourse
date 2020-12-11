import StationManager from "./station/actions.js";
import LineManager from "./line/actions.js";
import SectionManager from "./section/actions.js";
import MapPrintManager from "./mapprint/actions.js";

const stationManagerBtn = document.getElementById("station-manager-button");
const lineManagerBtn = document.getElementById("line-manager-button");
const sectionManagerBtn = document.getElementById("section-manager-button");
const mapPrintManagerBtn = document.getElementById("map-print-manager-button");

export default function SubwayManager() {
  stationManagerBtn.addEventListener("click", StationManager);
  lineManagerBtn.addEventListener("click", LineManager);
  sectionManagerBtn.addEventListener("click", SectionManager);
  mapPrintManagerBtn.addEventListener("click", MapPrintManager);
}

new SubwayManager();
