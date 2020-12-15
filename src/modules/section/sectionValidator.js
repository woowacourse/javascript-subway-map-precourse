import { getSelectedLineData } from '../line/lineDataHandler.js';

export const validateUserInput = (lineName, station, idx) => {
  const stations = getSelectedLineData(lineName);
  return !checkDuplication(stations, station) && checkIndex(stations, idx);
};

export const checkDeleteAvailable = (lineName) => {
  let isAvailable = true;
  const stations = getSelectedLineData(lineName);
  if (stations.length < 3) {
    isAvailable = false;
  }
  return isAvailable;
};

const checkDuplication = (stations, station) => {
  let isDuplicated = false;
  if (stations.includes(station)) {
    isDuplicated = true;
  }
  return isDuplicated;
};

const checkIndex = (stations, idx) => {
  let isOk = true;
  if (idx < 0 || idx >= stations.length) {
    isOk = false;
  }
  return isOk;
};
