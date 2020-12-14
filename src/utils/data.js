import { STATION_DIV, LINE_DIV, SUB_WAY_INFO } from "../constant.js";
import { makeTableStation, makeTableLine } from "./controlView.js";
import { removeLineHandler } from "./line.js";
import { removeStationHandler } from "./station.js";

export const getDataFromLocalStorage = (subwayInfo) => {
  const dataFromStorage = localStorage.getItem(SUB_WAY_INFO);
  if (dataFromStorage !== null) {
    subwayInfo = JSON.parse(dataFromStorage);
  }
};

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
  }
  return buttonFunction;
}

export function getDivName(NAME_DIV, table) {
  if (NAME_DIV === STATION_DIV) {
    makeTableStation.call(this, table);
  } else if (NAME_DIV === LINE_DIV) {
    makeTableLine.call(this, table);
  }
}
