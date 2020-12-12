import { REFRENCE_STATION_LENGTH } from "../constants/index.js";
import { loadLines } from "../Section/lineContainer.js";
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

export const checkDuplicateLine = (lineName) => {
  const lines = loadLines() || [];
  const currentLines = lines.map((line) => Object.keys(line)[0]);
  const isDuplicate = currentLines.includes(lineName);

  return isDuplicate;
};

export const checkSameStation = (startStation, endStation) =>
  startStation === endStation ? true : false;
