import {
  STATION_STORAGE_NAME,
  LINE_STORAGE_NAME,
} from "../common/constants.js";

export const annulChangedState = () => localStorage.setItem("isChanged", "false");

export const stationReducer = (updatedSelectorArray) => {
  localStorage.setItem(
    STATION_STORAGE_NAME,
    JSON.stringify(updatedSelectorArray),
  );
  localStorage.setItem("isChanged", "true");
};

export const lineReducer = (updatedSelectorArray) => {
  localStorage.setItem(LINE_STORAGE_NAME, JSON.stringify(updatedSelectorArray));
  localStorage.setItem("isChanged", "true");
};
