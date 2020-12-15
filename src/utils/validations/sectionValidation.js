import { isDuplicatedValue, isPossibleIndex } from "./index.js";
import { alertMessage } from "../domUtil.js";
import { NUM } from "../constants/number.js";
import { MESSAGE } from "../constants/message.js";

export const isValidSectionNumber = ($input, nameList, name, index) => {
  if (isNaN(index)) {
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

export const isRemovableSection = (
  sections,
  limit = NUM.SECTION_LENGTH_LIMIT,
) => {
  if (sections.length == limit) {
    alert(MESSAGE.SECTION_LENGTH_ERROR);
    return false;
  }

  return true;
};
