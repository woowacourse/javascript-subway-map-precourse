import { REFRENCE_STATION_LENGTH } from "../constants/index.js";
import { loadStations } from "../Station/stationContainer.js";

export const checkEmpty = (inputValue) =>
  inputValue.trim().length === 0 ? true : false;

export const checkLength = (stationName) =>
  stationName.length < REFRENCE_STATION_LENGTH ? true : false;

export const checkDuplicateStation = (stationName) => {
  const stations = loadStations() || [];
  const isDuplicate = stations.includes(stationName);

  return isDuplicate;
};
