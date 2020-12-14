import { getStation } from './stationDataHandler.js';

import { numInCondition } from '../util/constants.js';
import { getLineName, getSelectedLineData } from '../line/lineDataHandler.js';

export const validateUserInput = (input) => {
  return (
    !checkDuplication(input) && !checkLength(input) && checkInputType(input)
  );
};

export const checkDeleteAvailable = (input) => {
  const lines = getLineName();
  let isAvailable = true;
  lines.forEach((line) => {
    let stations = getSelectedLineData(line);
    if (stations.includes(input)) {
      isAvailable = false;
      return isAvailable;
    }
  });
  return isAvailable;
};

const checkDuplication = (input) => {
  let isDuplicated = false;
  const stations = getStation();
  if (stations.includes(input)) {
    isDuplicated = true;
  }
  return isDuplicated;
};

const checkLength = (input) => {
  let isShort = false;
  if (input.length < numInCondition.MIN_LENGTH_STATION) {
    isShort = true;
  }
  return isShort;
};

const checkInputType = (input) => {
  let isString = false;
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  if (korean.test(input)) {
    isString = true;
  }
  return isString;
};
