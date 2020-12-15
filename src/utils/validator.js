import { STATION, LINE, SECTION } from "../constants.js";
import { hasDuplicateName } from "./util.js";
import { isInLine } from "./stationUtil.js";
import { getStationsInLine } from "./sectionUtil.js";

export const addStationValidate = (stationName) => {
  let validate = true;
  if (stationName.length < STATION.NAME_LENGTH_LIMIT) validate = false;
  if (hasDuplicateName("stations", "name", stationName)) validate = false;

  return validate;
};

export const deleteStationValidate = (stationName) => {
  let validate = true;
  if (isInLine(stationName)) validate = false;

  return validate;
};

export const addLineValidate = (lineName, startStation, endStation) => {
  let validate = true;
  if (lineName.length < LINE.NAME_LENGTH_LIMIT) validate = false;
  if (hasDuplicateName("lines", "lineName", lineName)) validate = false;
  if (startStation === endStation) validate = false;

  return validate;
};

export const addSectionValidate = (index, station, lineName) => {
  const stationsInLine = getStationsInLine(lineName);
  let validate = true;
  if (isNaN(index)) validate = false;
  if (index < 1 || index > stationsInLine.length - 1) validate = false;
  if (stationsInLine.includes(station)) validate = false;

  return validate;
};

export const deleteSectionValidate = (elem) => {
  let validate = true;
  if (getStationsInLine(elem.dataset.name).length <= SECTION.MINIMUM_SECTION)
    validate = false;

  return validate;
};
