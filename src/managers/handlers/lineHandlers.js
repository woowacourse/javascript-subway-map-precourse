import render from "../render.js";
import app from "../../components/app.js";
import { Line } from "../../objects/objests.js";
import { validateInput, validateStartAndEndStations } from "../validation/validation.js";

function onLineHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  render(app("line", subwayDatas));
  subwayDatas && updateEvent();
}

function updateEvent() {
  document.getElementById("line-add-button").addEventListener("click", onAddLineHandler);

  let deleteBtns = document.getElementsByClassName("line-delete-button");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onDeleteLineHandler);
  }
}

function onAddLineHandler() {
  let lineName = validateInput(document.getElementById("line-name-input").value, "line-name-input");

  if (lineName !== "") {
    let startAndEndStations = [document.getElementById("line-start-station-selector").value, document.getElementById("line-end-station-selector").value];
    let validatedStartAndEndStations = validateStartAndEndStations(startAndEndStations);
    addLine(lineName, validatedStartAndEndStations);
  }
}

function addLine(lineName, validatedStartAndEndStations) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let line = new Line(lineName, validatedStartAndEndStations);
  let endStops = [line.stops[0], line.stops[line.stops.length - 1]];
  let startStopIdx = subwayDatas.subwayStations.findIndex((station) => station.name === endStops[0]);
  let endStopIdx = subwayDatas.subwayStations.findIndex((station) => station.name === endStops[1]);

  subwayDatas.subwayStations[startStopIdx].line.push(lineName);
  subwayDatas.subwayStations[endStopIdx].line.push(lineName);
  subwayDatas.lines.push(line);

  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  render(app("line", subwayDatas));
  subwayDatas && updateEvent();
}

function onDeleteLineHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let deleteTarget = event.target.parentNode.parentNode.childNodes[1].outerText;
  let deleteTargetIdx = subwayDatas.lines.findIndex((line) => line.name === deleteTarget);

  subwayDatas.subwayStations.forEach((station) => {
    station.line.splice(station.line.indexOf(deleteTarget), 1);
  });
  subwayDatas.lines.splice(deleteTargetIdx, 1);

  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  render(app("line", subwayDatas));
  updateEvent();
}

export { onLineHandler };
