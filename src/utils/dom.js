import * as storageKey from "../constants/storageKey.js";
import * as skeleton from "../constants/skeleton.js";
import * as message from "../constants/message.js";
import { getStationOptions, removeLine } from "./line.js";
import { removeStation } from "./station.js";
import { getStateFromStorage, setStateToStorage } from "./storage.js";

const DELETE = "삭제";
const DELETE_AT_LINE = "노선에서 제거";

export const addClickEventFromId = (id, event) => {
  const element = document.getElementById(id);
  element.addEventListener("click", event);
};

export const resetStationTable = () => {
  const stationTableBody = document.getElementById("station-table-body");
  stationTableBody.innerHTML = skeleton.STATION_TABLE_BODY;
};

export const renderStationTable = () => {
  const stations = getStateFromStorage(storageKey.STATIONS);
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
    stationDeleteButton.innerText = DELETE;
    stationDeleteButton.onclick = () => {
      removeStation(station);
      renderStationTable();
    };
    tableRow.dataset.station = station;
    tableSetData.append(stationDeleteButton);
    tableRow.append(stationTableData, tableSetData);
    stationTableBody.append(tableRow);
  });
};

export const resetLineTable = () => {
  const lineTableBody = document.getElementById("line-table-body");
  lineTableBody.innerHTML = skeleton.LINE_TABLE_BODY;
};

export const renderLineTable = () => {
  const lines = getStateFromStorage(storageKey.LINES);
  resetLineTable();
  if (!lines) {
    return;
  }
  const lineTableBody = document.getElementById("line-table-body");
  for (const key in lines) {
    const tableRow = document.createElement("tr");
    const nameEl = document.createElement("td");
    const startEl = document.createElement("td");
    const endEl = document.createElement("td");
    const setEl = document.createElement("td");
    const lineDeleteButton = document.createElement("button");
    nameEl.innerText = key;
    startEl.innerText = lines[key][0];
    endEl.innerText = lines[key].slice(-1)[0];
    lineDeleteButton.setAttribute("class", "line-delete-button");
    lineDeleteButton.innerText = DELETE;
    lineDeleteButton.onclick = () => {
      removeLine(key);
      renderLineTable();
    };
    tableRow.dataset.line = key;
    setEl.append(lineDeleteButton);
    tableRow.append(nameEl, startEl, endEl, setEl);
    lineTableBody.append(tableRow);
  }
};

export const putOptionsFromId = (id) => {
  const element = document.getElementById(id);
  element.innerHTML = getStationOptions();
};

export const renderSectionSelector = () => {
  const lines = getStateFromStorage(storageKey.LINES);
  if (!lines) {
    return;
  }
  const sectionManagerContent = document.getElementById(
    "section-manager-content"
  );
  sectionManagerContent.innerHTML = skeleton.SECTION_CONTENT;
  const sectionSelectorContainer = document.getElementById(
    "section-selector-container"
  );
  for (const key in lines) {
    const lineSelectorButton = document.createElement("button");
    lineSelectorButton.setAttribute("class", "section-line-menu-button");
    lineSelectorButton.dataset.line = key;
    lineSelectorButton.innerText = key;
    lineSelectorButton.onclick = () => renderModifySectionContainer(key);
    sectionSelectorContainer.appendChild(lineSelectorButton);
  }
};

export const addSection = (lineName) => {
  const lines = getStateFromStorage(storageKey.LINES);
  const section = lines[lineName];
  const station = document.getElementById("section-station-selector").value;
  let order = document.getElementById("section-order-input").value;
  if (section.indexOf(station) > -1) {
    alert(message.ALREADY_EXIST_STATION_IN_LINE);
    return;
  }
  section.splice(order, 0, station);
  setStateToStorage(storageKey.LINES, {
    ...lines,
    [lineName]: section,
  });
  renderSectionTable(lineName);
};

export const renderModifySectionContainer = (lineName) => {
  const sectionModifyContainer = document.getElementById(
    "section-modify-container"
  );
  const sectionManageTitle = document.getElementById("section-manage-title");
  const sectionAddButton = document.getElementById("section-add-button");
  sectionAddButton.onclick = () => addSection(lineName);
  sectionModifyContainer.style.display = "block";
  sectionManageTitle.innerText = `${lineName} 관리`;
  putOptionsFromId("section-station-selector");
  renderSectionTable(lineName);
};

export const resetSectionTable = () => {
  const sectionTableBody = document.getElementById("section-table-body");
  sectionTableBody.innerHTML = skeleton.SECTION_TABLE_BODY;
};

export const removeSection = (lineName, station) => {
  const lines = getStateFromStorage(storageKey.LINES);
  if (lines[lineName].length < 3) {
    alert(message.LESS_THAN_2_LINE_SECTION);
    return;
  }
  setStateToStorage(storageKey.LINES, {
    ...lines,
    [lineName]: lines[lineName].filter((el) => el !== station),
  });
  renderSectionTable(lineName);
};

export const renderSectionTable = (lineName) => {
  const selectedSection = getStateFromStorage(storageKey.LINES)[lineName];
  resetSectionTable();
  const sectionTableBody = document.getElementById("section-table-body");
  selectedSection.forEach((station, i) => {
    const tableRow = document.createElement("tr");
    const orderEl = document.createElement("td");
    const nameEl = document.createElement("td");
    const setEl = document.createElement("td");
    const deleteButton = document.createElement("button");
    orderEl.innerText = i;
    nameEl.innerText = station;
    deleteButton.innerText = DELETE_AT_LINE;
    deleteButton.onclick = () => removeSection(lineName, station);
    tableRow.dataset.section = `${lineName}-${i}`;
    setEl.append(deleteButton);
    tableRow.append(orderEl, nameEl, setEl);
    sectionTableBody.append(tableRow);
  });
};

export const combineMap = (acc, [line, section]) => {
  return (
    acc +
    `<h2 data-line=${line}>${line}</h2><ul>${section.reduce(
      (a, c) => a + `<li data-station=${line}-${c}>${c}</li>`,
      ""
    )}</ul>`
  );
};
