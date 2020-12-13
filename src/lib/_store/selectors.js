import {
  STATION_STORAGE_NAME,
  LINE_STORAGE_NAME,
} from "../common/constants.js";

export const stationSelector = () =>
  JSON.parse(localStorage.getItem(STATION_STORAGE_NAME));
export const lineSelector = () =>
  JSON.parse(localStorage.getItem(LINE_STORAGE_NAME));

// 현재 라인이 존재하는지 여부 검사