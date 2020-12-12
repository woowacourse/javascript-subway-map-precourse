import {
  STATION_STORAGE_NAME,
  LINE_STORAGE_NAME,
} from "../common/constants.js";

export const stationReducer = (updatedSelectorArray) =>
  localStorage.setItem(
    STATION_STORAGE_NAME,
    JSON.stringify(updatedSelectorArray),
  );

export const lineReducer = (updatedSelectorArray) =>
  localStorage.setItem(LINE_STORAGE_NAME, JSON.stringify(updatedSelectorArray));
