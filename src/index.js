import { initHTML } from "./uiManager.js";
import render from "./components/render.js";
import app from "./components/app.js";

let output = "";
let stations = [];
let savedStations = localStorage.getItem("stations");
let arr = JSON.parse(savedStations);

export default function init() {
  initHTML();
  render(app());

  arr & mount();
  stations = arr;

  document.getElementById("station-manager-button").addEventListener("click", onStationHandler);
  document.getElementById("line-manager-button").addEventListener("click", onLineHandler);
  document.getElementById("section-manager-button").addEventListener("click", onSectionHandler);
  document.getElementById("map-print-manager-button").addEventListener("click", onMapPrintHandler);
}

init();

function onStationHandler() {
  render(app("station"));
  arr & mount();
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);
}

// let stations = [];
function onAddStationHandler() {
  let stationName = document.getElementById("station-add-input").value;
  stations.push(stationName);

  localStorage.setItem("stations", JSON.stringify(stations));
  output = localStorage.getItem("stations");
  // let arr = JSON.parse(output);
  arr = JSON.parse(output);

  console.log("arr", localStorage);
  mount();
}

function mount() {
  render(app("station", arr));
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);

  let deleteBtns = document.getElementsByClassName("station-delete-button");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onDeleteStationHandler);
  }
}

function onDeleteStationHandler() {
  let tr = event.target.parentNode.parentNode;

  output = localStorage.getItem("stations");
  arr = JSON.parse(output);

  let deleteIdx = arr.indexOf(tr.childNodes[1].outerText);
  if (deleteIdx > -1) arr.splice(deleteIdx, 1);
  stations = arr;
  localStorage.clear();
  localStorage.setItem("stations", JSON.stringify(arr));
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
