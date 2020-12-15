import {
  LOCAL_STORAGE_STATIONS_KEY,
  LOCAL_STORAGE_LINES_KEY,
} from "../constants/index.js";
import { getStateFromStorage } from "./storage.js";

export const getStationOptions = () => {
  const stations = getStateFromStorage(LOCAL_STORAGE_STATIONS_KEY);
  if (!stations) {
    return null;
  }
  return stations.map((el) => `<option value="${el}">${el}</option>`).join("");
};

export const existLineName = (name) => {
  const lines = getStateFromStorage(LOCAL_STORAGE_LINES_KEY);
  if (!lines) {
    return false;
  }
  return Object.keys(lines).indexOf(name) > -1;
};

export const existLineSameEndPoints = ([start, end]) => {
  const lines = getStateFromStorage(LOCAL_STORAGE_LINES_KEY);
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
  const lines = getStateFromStorage(LOCAL_STORAGE_LINES_KEY);
  if (!lines) {
    return;
  }
  delete lines[lineName];
  setStateToStorage(LOCAL_STORAGE_LINES_KEY, lines);
};
