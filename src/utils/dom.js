import {
  DELETE_TEXT,
  LOCAL_STORAGE_LINES_KEY,
  LOCAL_STORAGE_STATIONS_KEY,
} from "../constants/index.js";
import { getStationOptions, removeLine } from "./line.js";
import { removeStation } from "./station.js";
import { getStateFromStorage } from "./storage.js";

export const addClickEventFromId = (id, event) => {
  const element = document.getElementById(id);
  element.addEventListener("click", event);
};

export const resetStationTable = () => {
  const stationTableBody = document.getElementById("station-table-body");
  stationTableBody.innerHTML = `<tr><th>역 이름</th><th>설정</th></tr>`;
};

export const renderStationTable = () => {
  const stations = getStateFromStorage(LOCAL_STORAGE_STATIONS_KEY);
  resetStationTable();
  if (!stations) {
    return;
  }
  const stationTableBody = document.getElementById("station-table-body");
  stations.forEach((station) => {
    const tableRow = document.createElement("tr");
    const stationTableData = document.createElement("td");
    const tableSetData = document.createElement("td");
    const stationDeleteButton = document.createElement("button");
    stationTableData.innerText = station;
    stationDeleteButton.setAttribute("class", "station-delete-button");
    stationDeleteButton.innerText = DELETE_TEXT;
    stationDeleteButton.onclick = () => {
      removeStation(station);
      renderStationTable();
    };
    tableSetData.append(stationDeleteButton);
    tableRow.append(stationTableData, tableSetData);
    stationTableBody.append(tableRow);
  });
};

export const resetLineTable = () => {
  const lineTableBody = document.getElementById("line-table-body");
  lineTableBody.innerHTML = `<tr><th>노선 이름</th><th>상행 종점역</th><th>하행 종점역</th><th>설정</th></tr>`;
};

export const renderLineTable = () => {
  const lines = getStateFromStorage(LOCAL_STORAGE_LINES_KEY);
  resetLineTable();
  if (!lines) {
    return;
  }
  const lineTableBody = document.getElementById("line-table-body");
  lines.forEach((line) => {
    const tableRow = document.createElement("tr");
    const nameEl = document.createElement("td");
    const startEl = document.createElement("td");
    const endEl = document.createElement("td");
    const setEl = document.createElement("td");
    const lineDeleteButton = document.createElement("button");
    nameEl.innerText = line.name;
    startEl.innerText = line.section[0];
    endEl.innerText = line.section.slice(-1)[0];
    lineDeleteButton.setAttribute("class", "line-delete-button");
    lineDeleteButton.innerText = DELETE_TEXT;
    lineDeleteButton.onclick = () => {
      removeLine(line.name);
      renderLineTable();
    };
    setEl.append(lineDeleteButton);
    tableRow.append(nameEl, startEl, endEl, setEl);
    lineTableBody.append(tableRow);
  });
};

export const putOptions = () => {
  const startStationSeletor = document.getElementById(
    "line-start-station-selector"
  );
  const endStationSelector = document.getElementById(
    "line-end-station-selector"
  );
  startStationSeletor.innerHTML = getStationOptions();
  endStationSelector.innerHTML = getStationOptions();
};
