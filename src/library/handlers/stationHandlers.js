import render from "../../components/render.js";
import app from "../../components/app.js";
import { validateInput, validStationDelete } from "../validation/validation.js";

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
  // let deleteTarget = event.target.parentNode.parentNode.childNodes[1].outerText;

  //삭제 전 검증 후 alert하거나,
  //alert가 없으면 deleteTarget을 return하는 함수
  let deleteTarget = validStationDelete(event.target.parentNode.parentNode.childNodes[1].outerText);

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
