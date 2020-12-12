import {
  STATION_STORAGE_NAME,
  LINE_STORAGE_NAME,
} from "../common/constants.js";
import { stationSelector, lineSelector } from "./selectors.js";

const initState = {
  stations: [],
  lines: [],
};

export default () => {
  if (localStorage.length === 0) {
    localStorage.setItem(STATION_STORAGE_NAME, "[]");
    localStorage.setItem(LINE_STORAGE_NAME, "[]");
    console.log(localStorage);
  } else {
    initState.stations = stationSelector;
    initState.lines = lineSelector;
  }

  console.log(initState);
};
