import { getNewId } from "./getNewId.js";
import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { cleanPreView, controlDisplay, setDataSelect } from "./controlView.js";
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
    stations: [{ id: destination[0] }, { id: destination[1] }],
  });
  destination.map((v) => addLinetoStation.call(this, lineId, v));
}

export const isValidSelect = () => {
  const selectStart = document.getElementById("line-start-station-selector");
  const selectEnd = document.getElementById("line-end-station-selector");
  let lineStartId = selectStart.options[selectStart.selectedIndex]?.dataset.id;
  let lineEndId = selectEnd.options[selectEnd.selectedIndex]?.dataset.id;
  if (lineStartId == null || lineEndId == null || lineStartId === lineEndId) {
    return false;
  } else {
    return [lineStartId, lineEndId];
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
