import render from "../render.js";
import app from "../../components/app.js";
import { validateSectionDelete, validateOrder, validateSection } from "../validation/validation.js";

function onSectionHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));

  subwayDatas.targetLine = ``;
  renderAndUpdateEvent(subwayDatas);
}

function onLineSelectHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let targetLine = event.target.innerText;

  subwayDatas.targetLine = targetLine;
  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  renderAndUpdateEvent(subwayDatas);
}

function onAddSectionHandler() {
  let station = validateSection(document.getElementById("section-station-selector").value);
  let order = validateOrder(document.getElementById("section-order-input").value);

  if (station && order) {
    addSection(station, order);
  }
}

function addSection(station, order) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let targetLine = subwayDatas.targetLine;
  let targetLineIdx = subwayDatas.lines.findIndex((line) => line.name === targetLine);

  subwayDatas.lines[targetLineIdx].stops.splice(order, 0, station);
  subwayDatas.subwayStations.forEach((addedStation, idx) => {
    if (station === addedStation.name) {
      subwayDatas.subwayStations[idx].line.push(subwayDatas.targetLine);
    }
  });

  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  renderAndUpdateEvent(subwayDatas);
}

function onSectionDeleteHandler() {
  let deleteTargetIdx = event.target.parentNode.parentNode.childNodes[1].outerText;
  let deleteTarget = event.target.parentNode.parentNode.childNodes[3].outerText;
  let deleteConfirmed = validateSectionDelete();

  if (deleteConfirmed === true) {
    sectionDelete(deleteTarget, deleteTargetIdx);
  }
}

function sectionDelete(deleteTarget, deleteTargetIdx) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));

  let targetLineIdx = subwayDatas.lines.findIndex((line) => line.name === subwayDatas.targetLine);
  subwayDatas.lines[targetLineIdx].stops.splice(deleteTargetIdx, 1);

  subwayDatas.subwayStations.forEach((station) => {
    if (station.name === deleteTarget) {
      station.line.splice(subwayDatas.subwayStations.indexOf(subwayDatas.targetLine), 1);
    }
  });

  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  renderAndUpdateEvent(subwayDatas);
}

function renderAndUpdateEvent(subwayDatas) {
  render(app("section", subwayDatas));
  updateEventToBtns();
}

function updateEventToBtns() {
  let sectionBtn = document.getElementById("section-add-button");
  sectionBtn && document.getElementById("section-add-button").addEventListener("click", onAddSectionHandler);

  let lineBtns = document.getElementsByClassName(".section-line-menu-button");
  for (let i = 0; i < lineBtns.length; i++) {
    let eachBtn = lineBtns[i];
    eachBtn.addEventListener("click", onLineSelectHandler);
  }

  let deleteBtns = document.getElementsByClassName(".section-delete-button");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onSectionDeleteHandler);
  }
}

export { onSectionHandler };
