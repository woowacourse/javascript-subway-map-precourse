import { initHTML } from "./uiManager.js";
import render from "./components/render.js";
import app from "./components/app.js";

let stations = JSON.parse(localStorage.getItem("stations"));

export default function init() {
  initHTML();
  render(app());

  stations && mount();

  document.getElementById("station-manager-button").addEventListener("click", onStationHandler);
  document.getElementById("line-manager-button").addEventListener("click", onLineHandler);
  document.getElementById("section-manager-button").addEventListener("click", onSectionHandler);
  document.getElementById("map-print-manager-button").addEventListener("click", onMapPrintHandler);
}

init();

function onStationHandler() {
  render(app("station"));
  stations && mount();
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);
}

function onAddStationHandler() {
  let stationName = document.getElementById("station-add-input").value;
  stations.push(stationName);

  localStorage.setItem("stations", JSON.stringify(stations));

  console.log("arr", localStorage);
  stations && mount();
}

function mount() {
  render(app("station", stations));
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);

  let deleteBtns = document.getElementsByClassName("station-delete-button");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onDeleteStationHandler);
  }
}

function onDeleteStationHandler() {
  let tr = event.target.parentNode.parentNode;

  let deleteIdx = stations.indexOf(tr.childNodes[1].outerText);
  if (deleteIdx > -1) stations.splice(deleteIdx, 1);
  localStorage.clear();
  localStorage.setItem("stations", JSON.stringify(stations));
  tr.parentNode.removeChild(tr);

  mount();
}

function onLineHandler() {
  render(app("line"));
}

function onSectionHandler() {
  render(app("section"));
}

function onMapPrintHandler() {
  render(app("map"));
}
