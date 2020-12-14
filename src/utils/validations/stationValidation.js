import {
  isEmptyValue,
  isValidInputLength,
  isDuplicatedValue,
} from "./index.js";
import { alertMessage } from "../domUtil.js";

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
