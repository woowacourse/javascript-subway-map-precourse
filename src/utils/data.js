import {
  STATION_DIV,
  LINE_DIV,
  SUB_WAY_LINE_INFO,
  SUB_WAY_STATION_INFO,
} from "../constant.js";

import {
  makeTableStation,
  makeTableLine,
  makeTableSection,
} from "./controlView.js";

import { removeLineHandler } from "./line.js";

import { removeStationHandler } from "./station.js";
import { removeSectionHandler } from "./section.js";

export function getDataFromLocalStorage(subwayInfo) {
  const lineFromStorage = localStorage.getItem(SUB_WAY_LINE_INFO);
  const stationFromStorage = localStorage.getItem(SUB_WAY_STATION_INFO);
  if (lineFromStorage !== null) {
    subwayInfo.line = JSON.parse(lineFromStorage);
  }
  if (stationFromStorage !== null) {
    subwayInfo.station = JSON.parse(stationFromStorage);
  }
}

export function setDataToStorage(subwayInfo) {
  localStorage.setItem(SUB_WAY_LINE_INFO, JSON.stringify(subwayInfo.line));
  localStorage.setItem(
    SUB_WAY_STATION_INFO,
    JSON.stringify(subwayInfo.station)
  );
}

export function getDataFromSelect(parent, dataName) {
  return parent.options[parent.selectedIndex]?.dataset[dataName];
}

export function getNewId() {
  return Math.random().toString(36).substr(2, 16);
}

export function getButtonFunction(buttonNodes) {
  let buttonFunction;
  if (buttonNodes[0]?.getAttribute("class") === "station-delete-button") {
    buttonFunction = removeStationHandler;
  } else if (buttonNodes[0]?.getAttribute("class") === "line-delete-button") {
    buttonFunction = removeLineHandler;
  } else {
    buttonFunction = removeSectionHandler;
  }
  return buttonFunction;
}

export function getDivName(NAME_DIV, table, buttonName) {
  if (NAME_DIV === STATION_DIV) {
    makeTableStation.call(this, table);
  } else if (NAME_DIV === LINE_DIV) {
    makeTableLine.call(this, table);
  } else {
    makeTableSection.call(this, table, buttonName);
  }
}
