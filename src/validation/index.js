import { REFRENCE_STATION_LENGTH } from "../constants/index.js";

export const checkEmpty = (inputValue) =>
  inputValue.trim().length === 0 ? true : false;

export const checkLength = (stationName) =>
  stationName.length < REFRENCE_STATION_LENGTH ? true : false;
