import {
  MINIMUM_STATION_NAME_LENGTH,
  MINIMUM_LINE_NAME_LENGTH,
  MINIMUM_ORDER_SIZE,
  MINIMUM_STATION_SIZE,
  SHORT_STATION_NAME,
  REDUNDANT_STATION_NAME,
  REGISTERED_STATION,
  SHORT_LINE_NAME,
  REGISTERED_LINE_NAME,
  SAME_START_END_NAME,
  STATION_BETWEEN_STATIONS,
  REDUNDANT_STATION,
  SMALL_SIZE_SECTION,
} from '../constants/index.js';

export const isValidStationName = (stations, name) => {
  if (name.length < MINIMUM_STATION_NAME_LENGTH) {
    alert(SHORT_STATION_NAME);
    return false;
  }

  if (stations.map(station => station.name).includes(name)) {
    alert(REDUNDANT_STATION_NAME);
    return false;
  }

  return true;
};

export const isAddedStation = (lines, name) => {
  const stationsNameInLines = lines
    .map(line => line.stations)
    .map(stations => stations.map(station => station.name));
  for (const stationsNameInLine of stationsNameInLines) {
    if (stationsNameInLine.includes(name)) {
      alert(REGISTERED_STATION);
      return false;
    }
  }

  return true;
};

export const isValidLineName = (lines, newLineName) => {
  if (newLineName.length < MINIMUM_LINE_NAME_LENGTH) {
    alert(SHORT_LINE_NAME);
    return false;
  }

  if (lines.map(line => line.name).includes(newLineName)) {
    alert(REGISTERED_LINE_NAME);
    return false;
  }

  return true;
};

export const isValidLine = (start, end) => {
  if (start === end) {
    alert(SAME_START_END_NAME);
    return false;
  }

  return true;
};

export const isValidSectionOrder = (stations, order) => {
  if (order <= MINIMUM_ORDER_SIZE || stations.length <= order) {
    alert(STATION_BETWEEN_STATIONS);
    return false;
  }

  return true;
};

export const isValidSection = (stations, name) => {
  if (stations.map(station => station.name).includes(name)) {
    alert(REDUNDANT_STATION);
    return false;
  }

  return true;
};

export const isValidDeleteSection = stations => {
  if (stations.length <= MINIMUM_STATION_SIZE) {
    alert(SMALL_SIZE_SECTION);
    return false;
  }

  return true;
};
