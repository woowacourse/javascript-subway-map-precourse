import totalSubwayManageContainer from "./components/total-subway-manage-container.js";
import stationManageContainer from "./components/station-manage-container.js";
import { STATION_ARRAY_KEY } from "./global/constant.js";

export const state = {
  stationArray: [],
};

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function init() {
  if (localStorage.getItem(STATION_ARRAY_KEY)) {
    state.stationArray = JSON.parse(localStorage.getItem(STATION_ARRAY_KEY));
  }
}

init();
totalSubwayManageContainer();
stationManageContainer(state);
