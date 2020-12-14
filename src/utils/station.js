import {
  STATION_DIV,
  DELETE_MESSAGE_STATION,
  ERR_MESSAGE_STATION,
} from "../constant.js";
import { getNewId } from "./getNewId.js";
import { getDataFromLocalStorage } from "./getDataFromLocalStorage.js";
import { printStation, cleanPreView, controlDisplay } from "./controlView.js";

export function removeStationHandler(e) {
  if (confirm(DELETE_MESSAGE_STATION)) {
    const tr = e.target.parentNode.parentNode;
    const clearStation = this.station.filter((v) => v.id !== tr.dataset.id);
    this.station = clearStation;
    console.log(clearStation);
    printStation.call(this);
  }
}
export function stationAddHandler() {
  const stationNameInput = document.getElementById("station-name-input");
  if (this.isValidStation(stationNameInput.value)) {
    this.station.push({
      id: getNewId(),
      name: stationNameInput.value,
    });
    printStation.call(this);
    stationNameInput.value = "";
  } else {
    alert(ERR_MESSAGE_STATION);
    stationNameInput.value = "";
  }
}

export function stationEventHandler(e) {
  getDataFromLocalStorage(this);
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
