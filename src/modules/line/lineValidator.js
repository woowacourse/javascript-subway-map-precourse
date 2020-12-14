import { getLineName } from './lineDataHandler.js';

export const validateUserInput = (input, start, end) => {
  return !checkDuplication(input) && !checkStartEnd(start, end);
};

const checkDuplication = (input) => {
  const lines = getLineName();
  let isDuplicated = false;
  if (lines.includes(input)) {
    isDuplicated = true;
  }
  return isDuplicated;
};

const checkStartEnd = (start, end) => {
  let isSame = false;
  if (start === end) {
    isSame = true;
  }
  return isSame;
};
