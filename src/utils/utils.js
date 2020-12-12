import { container } from "../consts/consts.js";
import { stationArray } from "../index.js";

export const clearContainer = () => {
  container.innerHTML = "";
};

export const inputValidator = (inputString) => {
  return inputString.length >= 2 && stationArray.indexOf(inputString) === -1;
};
