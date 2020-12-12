import { MESSAGE } from "../constants/index.js";

const alertMessage = (input, text) => {
  alert(text);
  input.value = "";
  input.focus();
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
  const { isEmpty, isDuplicate, isSameStation } = checkList;

  if (isEmpty) {
    alertMessage(input, MESSAGE.EMPTY);
  } else if (isDuplicate) {
    alertMessage(input, MESSAGE.DUPLICATE);
  } else if (isSameStation) {
    alertMessage(input, MESSAGE.SAME_STATION);
  } else {
    return true;
  }
};

export const checkSectionList = (checkList, input) => {
  const { isEmpty, isWrongRange } = checkList;

  if (isEmpty) {
    alertMessage(input, MESSAGE.EMPTY);
  } else if (isWrongRange) {
    alertMessage(input, MESSAGE.WRONG_RANGE);
  } else {
    return true;
  }
};
