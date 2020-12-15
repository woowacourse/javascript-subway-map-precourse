import { state } from "../index.js";

export function getStationByName(name) {
  return state.stationArray.filter(
    (station) => station.stationName === name
  )[0];
}
