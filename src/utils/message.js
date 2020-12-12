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
  const { isEmpty, isDuplicate } = checkList;

  if (isEmpty) {
    alertMessage(input, MESSAGE.EMPTY);
  } else if (isDuplicate) {
    alertMessage(input, MESSAGE.DUPLICATE);
  } else {
    return true;
  }
};
