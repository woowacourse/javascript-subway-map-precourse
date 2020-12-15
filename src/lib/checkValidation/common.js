import { MIN_LENGTH_OF_STATION_NAME } from "../common/constants.js";

export const haveSpace = (inputValue) => /\s+/g.test(inputValue);
export const isLessThanMinLengthOfStationName = (inputValue) =>
  inputValue.length < MIN_LENGTH_OF_STATION_NAME;
export const isEmptyInput = (inputValue) => inputValue.length === 0;
export const isContainChars = (inputValue) => /[^0-9]+/g.test(inputValue);
export const isInvalidNumber = (inputValue) =>
  isContainChars(inputValue) || inputValue < 0 || haveSpace(inputValue);
