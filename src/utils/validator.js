import { STATION } from "../constants.js";
import { hasDuplicateName } from "./util.js";
import { isInLine } from "./stationUtil.js";

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
