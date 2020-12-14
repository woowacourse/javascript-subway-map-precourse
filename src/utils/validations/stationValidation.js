import {
  isEmptyValue,
  isValidInputLength,
  isDuplicatedValue,
} from "./index.js";
import { alertMessage } from "../domUtil.js";
import { NUM } from "../constants/number.js";
import { MESSAGE } from "../constants/message.js";

export const isVaildStationName = ($input, nameList, name) => {
  if (isEmptyValue(name)) {
    alertMessage($input, MESSAGE.EMPTY_NAME_ERROR);
    return false;
  }

  if (!isValidInputLength(name, NUM.STATION_NAME_LIMIT)) {
    alertMessage($input, MESSAGE.STATION_NAME_LIMIT_ERROR);
    return false;
  }

  if (isDuplicatedValue(nameList, name)) {
    alertMessage($input, MESSAGE.DUPLICATED_NAME_ERROR);
    return false;
  }

  return true;
};

export const isRemovableStation = (lines, name) => {
  if (lines.some(({ sections }) => sections.inculdes(name))) {
    alert(MESSAGE.REMOVE_STATION_ERROR);
    return false;
  }

  return true;
};
