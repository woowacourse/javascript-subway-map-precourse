import render from "../render.js";
import app from "../../components/app.js";
import { validateInput, validateStationDelete } from "../validation/validation.js";
import { Station } from "../../objects/objests.js";

function renderAndUpdateEvent(subwayDatas) {
  render(app("station", subwayDatas));
  updateEvent();
}
function onStationHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  renderAndUpdateEvent(subwayDatas);
}

function onAddStationHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let stationName = validateInput(document.getElementById("station-add-input").value, "station-add-input");

  if (stationName !== "") {
    let subwayStations = new Station(stationName);
    subwayDatas.subwayStations.push(subwayStations);
    localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
    renderAndUpdateEvent(subwayDatas);
  }
}

function updateEvent() {
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);

  let deleteBtns = document.getElementsByClassName("station-delete-button");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onDeleteStationHandler);
  }
}

function onDeleteStationHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let deleteTarget = validateStationDelete(event.target.parentNode.parentNode.childNodes[1].outerText);

  if (deleteTarget !== "") {
    let deleteTargetIdx = subwayDatas.subwayStations.findIndex((station) => station.name === deleteTarget);
    subwayDatas.subwayStations.splice(deleteTargetIdx, 1);
    localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
    renderAndUpdateEvent(subwayDatas);
  }
}

export { onStationHandler };
