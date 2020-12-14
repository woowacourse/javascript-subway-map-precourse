import { SUB_WAY_INFO } from "../constant.js";

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
