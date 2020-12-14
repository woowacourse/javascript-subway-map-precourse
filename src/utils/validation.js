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

export const isRemovableStation = station => {
  if (!station) {
    return false;
  }

  if (station.lines.length) {
    alert(MESSAGE.REMOVE_STATION_ERROR);
    return false;
  }

  return true;
};

export const isValidLineName = ($input, nameList, name) => {
  if (isEmptyValue(name)) {
    alertMessage($input, MESSAGE.EMPTY_NAME_ERROR);
    return false;
  }

  if (isDuplicatedName(name, nameList)) {
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
