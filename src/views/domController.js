import { stationMangeContainer, getStationRow } from "./dom.js";
import Station from "../components/Station.js";
import { addLocalStorageByKey } from "../utils/util.js";
import { addStationValidate } from "../utils/validator.js";
import { STATION } from "../constants.js";

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
    // 삭제 이벤트 등록
  } else {
    alert(STATION.INPUT_ERROR_MESSAGE);
  }
  stationNameElem.value = "";
};

export const rendStationMangeDom = () => {
  const container = document.getElementById("subway-manager-container");
  const div = document.createElement("div");
  div.innerHTML = stationMangeContainer();
  container.appendChild(div);
  //삭제 이벤트 등록
};
