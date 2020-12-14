import { MESSAGE } from "../constants/index.js";

const alertMessage = (input, text) => {
  alert(text);
  input.value = "";
  input.focus();
};

export const confirmDelete = () => {
  const isDelete = confirm(MESSAGE.CONFIRM);

  return isDelete;
};

export const checkStationList = (checkList, input) => {
  const { isEmpty, isTooShort, isDuplicate } = checkList;

  if (isEmpty) {
    alertMessage(input, MESSAGE.EMPTY);
  } else if (isTooShort) {
    alertMessage(input, MESSAGE.SHORT);
  } else if (isDuplicate) {
    alertMessage(input, MESSAGE.DUPLICATE);
  } else {
    return true;
  }
};

export const checkLineList = (checkList, input) => {
  const { isEmpty, isDuplicate, isSameStation, isInclude } = checkList;

  if (isEmpty) {
    alertMessage(input, MESSAGE.EMPTY);
  } else if (isDuplicate) {
    alertMessage(input, MESSAGE.DUPLICATE);
  } else if (isSameStation) {
    alertMessage(input, MESSAGE.SAME_STATION);
  } else if (!isInclude) {
    alertMessage(input, MESSAGE.LINE_WORD_INCLUDE);
  } else {
    return true;
  }
};

export const checkSectionList = (checkList, input) => {
  const { isEmpty, isWrongRange, isDuplicate } = checkList;

  if (isEmpty) {
    alertMessage(input, MESSAGE.EMPTY);
  } else if (isWrongRange) {
    alertMessage(input, MESSAGE.WRONG_RANGE);
  } else if (isDuplicate) {
    alertMessage(input, MESSAGE.DUPLICATE);
  } else {
    return true;
  }
};
