import {
  STATION_STORAGE_NAME,
  LINE_STORAGE_NAME,
} from "../common/constants.js";

export const stationSelector = () =>
  JSON.parse(localStorage.getItem(STATION_STORAGE_NAME));
export const lineSelector = () =>
  JSON.parse(localStorage.getItem(LINE_STORAGE_NAME));

// export const isStateChanged = localStorage.getItem("isChanged") === "true";

// 지하철 라인 관련은 조금 응용하자...
