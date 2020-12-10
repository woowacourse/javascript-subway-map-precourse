import { MESSAGE } from "../constants/index.js";

const alertMessage = (input, text) => {
  alert(text);
  input.value = "";
  input.focus();
};

export const checkTheList = (checkList, input) => {
  const { isEmpty, isTooShort } = checkList;

  if (isEmpty) {
    alertMessage(input, MESSAGE.EMPTY);
  } else if (isTooShort) {
    alertMessage(input, MESSAGE.SHORT);
  } else {
    return true;
  }
};
