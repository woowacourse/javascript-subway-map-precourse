import { REFRENCE_STATION_LENGTH } from "../constants/index.js";
import { loadLines } from "../Line/lineContainer.js";
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

export const checkRange = (rangeRefrence, orderInputValue) =>
  orderInputValue < 0 || orderInputValue >= rangeRefrence ? true : false;

export const checkDuplicateSection = (selectLine, stationName) => {
  const lines = loadLines() || [];
  const filteredLine = lines.filter(
    (line) => selectLine === Object.keys(line)[0]
  );
  const currentSection = Object.values(filteredLine[0])[0];

  if (currentSection.includes(stationName)) {
    return true;
  }
};

export const checkInSection = (targetStation) => {
  const lines = loadLines() || [];

  const isInSection = lines.map((line) => {
    const sections = Object.values(line);
    const isInLine = sections.map((line) =>
      line.includes(targetStation) ? true : false
    );

    return isInLine;
  });

  const stationInSection = isInSection.map((line) =>
    line.includes(true) ? true : false
  );

  return stationInSection.includes(true);
};
