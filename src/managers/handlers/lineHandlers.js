import render from "../render.js";
import app from "../../components/app.js";
import { Line } from "../../objects/objects.js";
import { validateInput, validateStartAndEndStations } from "../validation/validation.js";
import { LINE_NAME_INPUT, LINE_ADD_BUTTON, LINE_DELETE_BUTTON, LINE_START_STATION_SELECTOR, LINE_END_STATION_SELECTOR } from "../../constants/tag.js";

function onLineHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));

  render(app("line", subwayDatas));
  subwayDatas && updateEvent();
}

function updateEvent() {
  document.getElementById(LINE_ADD_BUTTON).addEventListener("click", onAddLineHandler);

  let deleteBtns = document.getElementsByClassName(LINE_DELETE_BUTTON);
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onDeleteLineHandler);
  }
}

function onAddLineHandler() {
  let lineName = validateInput(document.getElementById(LINE_NAME_INPUT).value, LINE_NAME_INPUT);

  if (lineName !== "") {
    let startAndEndStations = [document.getElementById(LINE_START_STATION_SELECTOR).value, document.getElementById(LINE_END_STATION_SELECTOR).value];
    let validatedStartAndEndStations = validateStartAndEndStations(startAndEndStations);
    validatedStartAndEndStations && addLine(lineName, validatedStartAndEndStations);
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
