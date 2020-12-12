import { STANDARD, MESSAGE } from "../constants/constants.js";
import { showErrors } from "../utils/handleDom.js";

export const isValidStationManager = (stationName, stations) => {
  let error = getErrorsFromStationManager(stationName, stations);

  if (error !== "") {
    showErrors(error + MESSAGE.CHECK_GUIDE);
    return false;
  }

  return true;
};

const checkNameLength = (stationName) => {
  return stationName.length < STANDARD.STATION_NAME_LENGTH;
};

const isDuplicate = (stationName, stations) => {
  console.log(stations);
  return stations.includes(stationName);
};

const getErrorsFromStationManager = (stationName, stations) => {
  let error = "";

  if (checkNameLength(stationName)) {
    error += MESSAGE.STATION_NAME_LENGTH_ERROR;
  }
  if (isDuplicate(stationName, stations)) {
    error += MESSAGE.DUPLICATION_ERROR;
  }
  return error;
};
