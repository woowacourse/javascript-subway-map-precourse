import StationManager from "./station/actions.js";
import LineManager from "./line/actions.js";
import SectionManager from "./section/actions.js";
import MapPrintManager from "./mapprint/actions.js";

const stationManagerBtn = document.getElementById("station-manager-button");
const lineManagerBtn = document.getElementById("line-manager-button");
const sectionManagerBtn = document.getElementById("section-manager-button");
const mapPrintManagerBtn = document.getElementById("map-print-manager-button");

const loadLocalStorage = () => {
  stationManagerBtn.dataset.stations = localStorage.getItem("station")
    ? localStorage.getItem("station")
    : "[]";
  lineManagerBtn.dataset.lines = localStorage.getItem("lines")
    ? localStorage.getItem("lines")
    : "[]";
};

const saveLocalStorage = () => {
  localStorage.setItem("station", stationManagerBtn.dataset.stations);
  localStorage.setItem("lines", lineManagerBtn.dataset.lines);
};

export default function SubwayManager() {
  window.addEventListener("load", loadLocalStorage);
  stationManagerBtn.addEventListener("click", StationManager);
  lineManagerBtn.addEventListener("click", LineManager);
  sectionManagerBtn.addEventListener("click", SectionManager);
  mapPrintManagerBtn.addEventListener("click", MapPrintManager);
  window.addEventListener("beforeunload", saveLocalStorage);
}

new SubwayManager();
