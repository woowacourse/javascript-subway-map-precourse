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

const checkFirstFormat = (input) => { // Format: $숫자 + 호선
  let isRightFormat = false;
  if (!input.includes('호선')) {
    return isRightFormat;
  }
  const [before, after] = input.split('호선');
  let num = parseInt(before);
  if (num && !after) {
    isRightFormat = true;
  }
  return isRightFormat;
};

const checkSecondFormat = (input) => { // Format: $문자 + 선
  let isRightFormat = false;
  if (!input.includes('선')) {
    return isRightFormat;
  }
  const [before, after] = input.split('선');
  let num = parseInt(before);
  if (isNaN(num) && !after) {
    isRightFormat = true;
  }
  return isRightFormat;
};
