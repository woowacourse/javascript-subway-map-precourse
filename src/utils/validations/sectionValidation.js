import { MESSAGE } from "../constants/message.js";
import { alertMessage } from "../domUtil.js";
import { isDuplicatedValue, isEmptyValue, isPossibleIndex } from "./index.js";

export const isValidSectionNumber = ($input, nameList, name, index) => {
  if (isEmptyValue(index)) {
    alertMessage($input, MESSAGE.EMPTY_NUMBER_ERROR);
    return false;
  }

  if (!isPossibleIndex(index, nameList.length)) {
    alertMessage($input, MESSAGE.INDEX_OVER_ERROR);
    return false;
  }

  if (isDuplicatedValue(nameList, name)) {
    alertMessage($input, MESSAGE.DUPLICATED_NAME_ERROR);
    return false;
  }

  return true;
};
