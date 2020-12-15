import { getLineName } from './lineDataHandler.js';

export const validateUserInput = (input, start, end) => {
  return (
    !checkDuplication(input) &&
    !checkStartEnd(start, end) &&
    (checkFirstFormat(input) || checkSecondFormat(input))
  );
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

const checkFirstFormat = (input) => {
  if (!input.includes('호선')) {
    return false;
  }
  const [before, after] = input.split('호선');
  let num = parseInt(before);
  console.log(num, typeof num);
  if (num && !after) {
    return true;
  }
  return false;
};

const checkSecondFormat = (input) => {
  if (!input.includes('선')) {
    return false;
  }
  const [before, after] = input.split('선');
  let num = parseInt(before);
  if (isNaN(num) && !after) {
    return true;
  }
};
