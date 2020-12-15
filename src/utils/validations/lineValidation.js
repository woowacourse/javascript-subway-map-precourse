import { isEmptyValue, isDuplicatedValue } from "./index.js";
import { alertMessage } from "../domUtil.js";
import { MESSAGE } from "../constants/message.js";

export const isValidLineName = ($input, nameList, name) => {
  if (isEmptyValue(name)) {
    alertMessage($input, MESSAGE.EMPTY_NAME_ERROR);
    return false;
  }

  if (isDuplicatedValue(nameList, name)) {
    alertMessage($input, MESSAGE.DUPLICATED_NAME_ERROR);
    return false;
  }

  return true;
};

export const isSameStation = (startName, endName) => {
  if (startName === endName) {
    alert(MESSAGE.SAME_STATION_SELECT_ERROR);
    return false;
  }

  return true;
};
