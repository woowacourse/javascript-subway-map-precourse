import { STANDARD } from "../constants/constants.js";
export const isValid = (stationName, stations) => {
  return checkNameLength(stationName) && isDuplicate(stationName, stations);
};

const checkNameLength = (stationName) => {
  return stationName.length >= STANDARD.STATION_NAME_LENGTH;
};

const isDuplicate = (stationName, stations) => {
  return !stations.includes(stationName);
};
