import {
  STATION_STORAGE_NAME,
  LINE_STORAGE_NAME,
} from "../common/constants.js";

export const stationSelector = JSON.parse(
  localStorage.getItem(STATION_STORAGE_NAME),
);
export const lineSelector = JSON.parse(localStorage.getItem(LINE_STORAGE_NAME));
export const isStateChanged = localStorage.getItem("isChanged") === "true";
// 상태가 변화하면 아래 부분 갱신하면서 갱신하는 부분에 state changed를 false로 돌린다.
