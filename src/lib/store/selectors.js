import Line from "../models/line.js";
import {
  STATION_STORAGE_NAME,
  LINE_STORAGE_NAME,
} from "../common/constants.js";

export const stationSelector = () =>
  JSON.parse(localStorage.getItem(STATION_STORAGE_NAME));
export const lineSelector = () =>
  JSON.parse(localStorage.getItem(LINE_STORAGE_NAME)).map(
    ({ lineName, stations }) => new Line({ lineName, stations }),
  );
