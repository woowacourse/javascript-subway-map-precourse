import render from "../render.js";
import app from "../../components/app.js";
import { validateInput, validateStationDelete } from "../validation/validation.js";

function onStationHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  render(app("station", subwayDatas));
  subwayDatas && updateEvent();
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);
}

function onAddStationHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let stationName = validateInput(document.getElementById("station-add-input").value, "station-add-input");

  if (stationName !== "") {
    let subwayStations = {
      name: name,
      line: [],
    };
    subwayStations.name = stationName;
    subwayDatas.subwayStations.push(subwayStations);
    localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
    render(app("station", subwayDatas));
    subwayDatas && updateEvent();
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

  deleteTarget &&
    subwayDatas.subwayStations.forEach((station, idx) => {
      if (station.name === deleteTarget) {
        subwayDatas.subwayStations.splice(idx, 1);
        localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
        render(app("station", subwayDatas));
        updateEvent();
      }
    });
}

export { onStationHandler };
