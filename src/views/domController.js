import {
  stationMangeContainer,
  getStationRow,
  lineMangeContainer,
} from "./dom.js";
import Station from "../components/Station.js";
import { addLocalStorageByKey, deleteDataByName } from "../utils/util.js";
import {
  addStationValidate,
  deleteStationValidate,
} from "../utils/validator.js";
import { STATION, DELETE_CONFIRM_MESSAGE } from "../constants.js";

export const clearMangeContainer = () => {
  const container = document.getElementById("subway-manager-container");
  container.innerHTML = "";
};

// station
export const insertStationTable = (stationName) => {
  const stationTable = document.getElementById("station-list-table");
  const row = stationTable.insertRow(stationTable.rows.length);
  row.innerHTML = getStationRow(stationName, stationTable.rows.length);
};

export const addStation = () => {
  const stationNameElem = document.getElementById("station-name-input");
  if (addStationValidate(stationNameElem.value)) {
    addLocalStorageByKey("stations", new Station(stationNameElem.value));
    insertStationTable(stationNameElem.value);
    setStationDeleteEvent();
  } else {
    alert(STATION.INPUT_ERROR_MESSAGE);
  }
  stationNameElem.value = "";
};

export const confirmStationDelete = (targetElem) => {
  try {
    if (deleteStationValidate(targetElem.dataset.index)) {
      deleteDataByName("stations", targetElem.dataset.index, "name");
      const removeElem = targetElem.parentNode.parentNode;
      removeElem.parentNode.removeChild(removeElem);
    } else {
      alert(STATION.DELETE_ERROR_MESSAGE);
    }
  } catch (e) {}
};

export const setStationDeleteEvent = () => {
  document.querySelectorAll(".station-delete-button").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      if (confirm(DELETE_CONFIRM_MESSAGE)) confirmStationDelete(event.target);
    });
  });
};

export const rendStationMangeDom = () => {
  const container = document.getElementById("subway-manager-container");
  const div = document.createElement("div");
  div.innerHTML = stationMangeContainer();
  container.appendChild(div);
  setStationDeleteEvent();
};

//line
export const rendLineMangeDom = () => {
  const container = document.getElementById("subway-manager-container");
  const div = document.createElement("div");
  div.innerHTML = lineMangeContainer();
  container.appendChild(div);
  //setLineDeleteEvent();
};
