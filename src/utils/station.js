import {
  STATION_NAME_LIMIT,
  STATION_DIV,
  DELETE_MESSAGE,
  ERR_MESSAGE_STATION,
} from "../constant.js";
import { getNewId, getDataFromLocalStorage, setDataToStorage } from "./data.js";
import { printTable, cleanPreView, controlDisplay } from "./controlView.js";

export function removeStationHandler(e) {
  if (confirm(DELETE_MESSAGE)) {
    const tr = e.target.parentNode.parentNode;
    const clearStation = this.station.filter((v) => v.id !== tr.dataset.id);
    this.station = clearStation;
    setDataToStorage(this);
    printTable.call(this, STATION_DIV);
  }
}

export function stationAddHandler() {
  const stationNameInput = document.getElementById("station-name-input");
  if (this.isValidName(stationNameInput.value, "station", STATION_NAME_LIMIT)) {
    this.station.push({
      id: getNewId(),
      name: stationNameInput.value,
    });
    printTable.call(this, STATION_DIV);
    setDataToStorage(this);
    stationNameInput.value = "";
  } else {
    alert(ERR_MESSAGE_STATION);
    stationNameInput.value = "";
  }
}

export function stationEventHandler(e) {
  getDataFromLocalStorage(this);
  printTable.call(this, STATION_DIV);
  cleanPreView(STATION_DIV);
  controlDisplay(document.getElementById("app").children[STATION_DIV]);
}

export function stationInit() {
  const stationManagerButton = document.getElementById(
    "station-manager-button"
  );
  const stationAddButton = document.getElementById("station-add-button");
  stationManagerButton.addEventListener(
    "click",
    stationEventHandler.bind(this)
  );
  stationAddButton.addEventListener("click", stationAddHandler.bind(this));
}
