import {
  getNewId,
  getDataFromLocalStorage,
  getDataFromSelect,
} from "./data.js";
import {
  cleanPreView,
  controlDisplay,
  setDataSelect,
  printTable,
} from "./controlView.js";
import { LINE_DIV, ERR_MESSAGE_LINE, LINE_NAME_LIMIT } from "../constant.js";

export function addLinetoStation(lineId, stationId) {
  let stationIndex = this.station.findIndex((v) => v.id == stationId);
  if (!this.station[stationIndex].hasOwnProperty("line")) {
    this.station[stationIndex].line = [];
  }
  this.station[stationIndex].line.push({ id: lineId });
}

export function createLine(lineNameInput, destination) {
  const lineId = getNewId();
  this.line.push({
    id: lineId,
    name: lineNameInput,
    stations: destination,
  });
  destination.map((v) => addLinetoStation.call(this, lineId, v.id));
}

export const isValidSelect = () => {
  const selectStart = document.getElementById("line-start-station-selector");
  const selectEnd = document.getElementById("line-end-station-selector");
  const lineStartId = getDataFromSelect(selectStart, "id");
  const lineEndId = getDataFromSelect(selectEnd, "id");
  if (lineStartId == null || lineEndId == null || lineStartId === lineEndId) {
    return false;
  } else {
    return [
      { id: lineStartId, station: getDataFromSelect(selectStart, "value") },
      { id: lineEndId, station: getDataFromSelect(selectEnd, "value") },
    ];
  }
};

export function lineAddHandler(e) {
  const lineNameInput = document.getElementById("line-name-input");
  let destination = isValidSelect();
  if (
    this.isValidName(lineNameInput.value, "line", LINE_NAME_LIMIT) &&
    destination
  ) {
    createLine.call(this, lineNameInput.value, destination);
    console.log(this.line);
    printTable.call(this, LINE_DIV);
    lineNameInput.value = "";
  } else {
    alert(ERR_MESSAGE_LINE);
    lineNameInput.value = "";
  }
}

export function lineEventHandler(e) {
  getDataFromLocalStorage(this);
  cleanPreView(LINE_DIV);
  controlDisplay(document.getElementById("app").children[LINE_DIV]);
  setDataSelect.call(this, "line-start-station-selector");
  setDataSelect.call(this, "line-end-station-selector");
}

export function lineInit() {
  const lineManagerButton = document.getElementById("line-manager-button");
  const lineAddButton = document.getElementById("line-add-button");
  lineManagerButton.addEventListener("click", lineEventHandler.bind(this));
  lineAddButton.addEventListener("click", lineAddHandler.bind(this));
}
