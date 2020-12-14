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

export const isValidLineInfo = (name, start, end) => {
  let error = getErrorsFromLineManager(name, start, end);

  if (error !== "") {
    showErrors(error + MESSAGE.CHECK_GUIDE);
    return false;
  }
  return true;
};

export const isValidSectionInfo = (number, station, line) => {
  let error = getErrorFromSectionManager(number, station, line);

  if (error !== "") {
    showErrors(error + MESSAGE.CHECK_GUIDE);
    return false;
  }
  return true;
};

const isEmpty = (name) => {
  return name === "";
};

const isSameStartAndEnd = (start, end) => {
  return start === end;
};

const checkNameLength = (stationName) => {
  return stationName.length < STANDARD.STATION_NAME_LENGTH;
};

const isDuplicate = (stationName, stations) => {
  return stations.includes(stationName);
};

const isNegative = (number) => {
  return number < 0;
};

const isNumber = (number) => {
  return !Number.isNaN(parseInt(number));
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

const getErrorsFromLineManager = (name, start, end) => {
  let error = "";

  if (isSameStartAndEnd(start, end)) {
    error += MESSAGE.START_END_SAME_ERROR;
  }
  if (isEmpty(name)) {
    error += MESSAGE.EMPTY_ERROR;
  }

  return error;
};

const getErrorFromSectionManager = (order, station, stations) => {
  let error = "";

  if (isNegative(order)) {
    error += MESSAGE.NEGATIVE_ERROR;
  }
  if (!isNumber(order)) {
    error += MESSAGE.NUMBER_ERROR;
  }
  if (isDuplicate(station, stations)) {
    error += MESSAGE.DUPLICATION_ERROR;
  }
  return error;
};
