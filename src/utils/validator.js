import { STATION } from "../constants.js";
import { hasDuplicateName } from "./util.js";

export const addStationValidate = (stationName) => {
  let validate = true;
  if (stationName.length < STATION.NAME_LENGTH_LIMIT) validate = false;
  if (hasDuplicateName("stations", "name", stationName)) validate = false;

  return validate;
};
