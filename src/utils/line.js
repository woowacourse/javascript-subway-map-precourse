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
  return lines.find((el) => el.name === name);
};

export const existLineSameEndPoints = ([start, end]) => {
  const lines = getStateFromStorage(LOCAL_STORAGE_LINES_KEY);
  if (!lines) {
    return false;
  }
  return Boolean(
    lines.find(
      (el) => el.section[0] === start && el.section.slice(-1)[0] === end
    )
  );
};

export const removeLine = (lineName) => {
  const lines = getStateFromStorage(LOCAL_STORAGE_LINES_KEY);
  if (!lines) {
    return;
  }
  setStateToStorage(
    LOCAL_STORAGE_LINES_KEY,
    lines.filter((el) => el.name !== lineName)
  );
};
