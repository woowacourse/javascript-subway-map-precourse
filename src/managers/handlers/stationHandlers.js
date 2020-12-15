import render from "../render.js";
import app from "../../components/app.js";
import { validateInput, validateStationDelete } from "../validation/validation.js";
import { Station } from "../../objects/objects.js";
import { STATION_NAME_INPUT, STATION_ADD_BUTTON, STATION_DELETE_BUTTON } from "../../constants/tag.js";

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
  let stationName = validateInput(document.getElementById(STATION_NAME_INPUT).value, STATION_NAME_INPUT);

  if (stationName !== "") {
    let subwayStations = new Station(stationName);
    subwayDatas.subwayStations.push(subwayStations);
    localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
    renderAndUpdateEvent(subwayDatas);
  }
}

function updateEvent() {
  document.getElementById(STATION_ADD_BUTTON).addEventListener("click", onAddStationHandler);

  let deleteBtns = document.getElementsByClassName(STATION_DELETE_BUTTON);
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
