import { MESSAGE } from "../constants/message.js";
import { NUM } from "../constants/number.js";
import { alertMessage } from "./domUtil.js";

const isValidNameLength = (name, limit) => name.length >= limit;

const isDuplicatedName = (name, nameList) =>
  nameList.some(target => target === name);

const isEmptyValue = value => !value;

export const isVaildStationName = ($input, nameList, name) => {
  if (isEmptyValue(name)) {
    alertMessage($input, MESSAGE.EMPTY_NAME_ERROR);
    return false;
  }

  if (!isValidNameLength(name, NUM.STATION_NAME_LIMIT)) {
    alertMessage($input, MESSAGE.STATION_NAME_LIMIT_ERROR);
    return false;
  }

  if (isDuplicatedName(name, nameList)) {
    alertMessage($input, MESSAGE.DUPLICATED_NAME_ERROR);
    return false;
  }

  return true;
};
