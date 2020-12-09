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
  render(app("station"));
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);

  let stations = [];

  function onAddStationHandler() {
    let stationName = document.getElementById("station-add-input").value;
    stations.push(stationName);
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
    tr.parentNode.removeChild(tr);

    render(app("station", stations));
    document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);

    let deleteBtns = document.getElementsByClassName("station-delete-button");
    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener("click", onDeleteStationHandler);
    }
  }
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
