import { initHTML } from "./uiManager.js";
import render from "./components/render.js";
import app from "./components/app.js";

export default function init() {
  initHTML();
  render(app());

  document.getElementById("station-manager-button").addEventListener("click", onStationHandler);
  document.getElementById("line-manager-button").addEventListener("click", onLineHandler);
  document.getElementById("section-manager-button").addEventListener("click", onSectionHandler);
  document.getElementById("map-print-manager-button").addEventListener("click", onMapPrintHandler);
}

init();

function onStationHandler() {
  render(app(`station`));
}

function onLineHandler() {
  render(app(`line`));
}

function onSectionHandler() {
  render(app(`section`));
}

function onMapPrintHandler() {
  render(app(`map`));
}
