import { initHTML } from "./uiManager.js";
import render from "./components/render.js";
import app from "./components/app.js";
import { onStationHandler } from "./library/handlers/stationHandlers.js";
import { onLineHandler } from "./library/handlers/lineHandlers.js";

export default function main() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  if (!subwayDatas) {
    let subwayDatas = {
      subwayStations: [],
      lines: [],
    };
    localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  }

  initHTML();
  render(app());
  addEventToMainBtns();
}

function addEventToMainBtns() {
  document.getElementById("station-manager-button").addEventListener("click", onStationHandler);
  document.getElementById("line-manager-button").addEventListener("click", onLineHandler);
  document.getElementById("section-manager-button").addEventListener("click", onSectionHandler);
  document.getElementById("map-print-manager-button").addEventListener("click", onMapPrintHandler);
}

function onSectionHandler() {
  render(app("section"));
}

function onMapPrintHandler() {
  render(app("map"));
}
