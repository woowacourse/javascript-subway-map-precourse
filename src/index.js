import totalSubwayManageContainer from "./components/total-subway-manage-container.js";
import { STATION_ARRAY_KEY, LINE_ARRAY_KEY } from "./global/constant.js";

export const state = {
  stationArray: [],
  subwayLines: [],
};

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function init() {
  if (localStorage.getItem(STATION_ARRAY_KEY)) {
    state.stationArray = JSON.parse(localStorage.getItem(STATION_ARRAY_KEY));
  }

  if (localStorage.getItem(LINE_ARRAY_KEY)) {
    state.subwayLines = JSON.parse(localStorage.getItem(LINE_ARRAY_KEY));
  }

  totalSubwayManageContainer();
}

init();
