import render from "../render.js";
import app from "../../components/app.js";
import { validateSectionDelete, validateOrder, validateSection } from "../validation/validation.js";
import { SECTION_LINE_MENU_BUTTON, SECTION_STATION_SELECTOR, SECTION_ORDER_INPUT, SECTION_ADD_BUTTON, SECTION_DELETE_BUTTON } from "../../constants/tag.js";

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
  let station = validateSection(document.getElementById(SECTION_STATION_SELECTOR).value);
  let order = validateOrder(document.getElementById(SECTION_ORDER_INPUT).value);

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
  let sectionBtn = document.getElementById(SECTION_ADD_BUTTON);
  sectionBtn && document.getElementById(SECTION_ADD_BUTTON).addEventListener("click", onAddSectionHandler);

  let lineBtns = document.getElementsByClassName(SECTION_LINE_MENU_BUTTON);
  for (let i = 0; i < lineBtns.length; i++) {
    let eachBtn = lineBtns[i];
    eachBtn.addEventListener("click", onLineSelectHandler);
  }

  let deleteBtns = document.getElementsByClassName(SECTION_DELETE_BUTTON);
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onSectionDeleteHandler);
  }
}

export { onSectionHandler };
