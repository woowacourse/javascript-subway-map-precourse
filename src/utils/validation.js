import { STANDARD } from "../constants/constants.js";
export const isValid = (stationName) => {};

const checkNameLength = (stationName) => {
  return stationName.length >= STANDARD.STATION_NAME_LENGTH;
};
