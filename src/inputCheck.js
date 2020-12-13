import { constant } from "./constant.js";

export function isSatisfyLength(len) {
  let result = true;
  if (String(len).length < constant.minLength) {
    result = false;
  }

  return result;
}

export function isSameDestination(start, end) {
  let result = true;
  if (start !== end) {
    result = false;
  }

  return result;
}

export function isStationAlreadyExist(stations, name) {
  let result = false;
  for (let i = 0; i < localStorage.stations.length; i++) {
    if (name === stations[i]) {
      result = true;
      break;
    }
  }

  return result;
}

export function isLineAlreadyExist(lines, name) {
  let result = false;
  for (let i = 0; i < lines.length; i++) {
    if (name === lines[i].name) {
      result = true;
      break;
    }
  }

  return result;
}

export function isSectionAlreadyExist(sections, name) {
  let result = false;
  for (let i = 0; i < sections.length; i++) {
    if (name === sections[i]) {
      result = true;
      break;
    }
  }

  return result;
}

function _isStationOnLine(sections, name) {
  let result = false;
  for (let i = 0; i < sections.length; i++) {
    if (name === sections[i]) {
      result = true;
      break;
    }
  }

  return result;
}

export function isStationOnLine(lines, name) {
  let result = false;
  for (let i = 0; i < lines.length; i++) {
    if (_isStationOnLine(lines[i].sections, name)) {
      result = true;
      break;
    }
  }

  return result;
}

export function isSatisfyMinNumOfStations(line) {
  let result = false;
  if (line.sections.length > constant.minStations) {
    result = true;
  }

  return result;
}
