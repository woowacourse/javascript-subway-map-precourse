import * as storageKey from "../constants/storageKey.js";
import { getStateFromStorage } from "./storage.js";

export const getStationOptions = () => {
  const stations = getStateFromStorage(storageKey.STATIONS);
  if (!stations) {
    return null;
  }
  return stations.map((el) => `<option value="${el}">${el}</option>`).join("");
};

export const existLineName = (name) => {
  const lines = getStateFromStorage(storageKey.LINES);
  if (!lines) {
    return false;
  }
  return Object.keys(lines).indexOf(name) > -1;
};

export const existLineSameEndPoints = ([start, end]) => {
  const lines = getStateFromStorage(storageKey.LINES);
  if (!lines) {
    return false;
  }
  for (const key in lines) {
    const section = lines[key];
    if (section[0] === start && section.slice(-1)[0] === end) {
      return true;
    }
  }
  return false;
};

export const removeLine = (lineName) => {
  const lines = getStateFromStorage(storageKey.LINES);
  if (!lines) {
    return;
  }
  delete lines[lineName];
  setStateToStorage(storageKey.LINES, lines);
};
