import { LINE_ALERT_MESSAGES } from "../../../global/messages.js";
import { state } from "../../../index.js";

const checkSpecialCharacter = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+₩\<\>@\#$%&\\\=\(\'\"]/;
const checkInvalidKorean = /[|ㄱ-ㅎ|ㅏ-ㅣ]/;
const checkMultipleSpaces = /\s{2,}/;
const STATION_INPUT_MINIMUM_LENGTH = 1;

export function isDuplicatedLineName(lineName) {
  let isDuplicated = false;

  for (const line of state.subwayLines) {
    if (line.lineName === lineName) {
      isDuplicated = true;
    }
  }

  return isDuplicated;
}

export default function inputLineValidator(lineNameInputValue) {
  let isValid = false;

  if (isDuplicatedLineName(lineNameInputValue)) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_DUPLICATED);
  } else if (lineNameInputValue.length < STATION_INPUT_MINIMUM_LENGTH) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_LENGTH_UNDER);
  } else if (checkSpecialCharacter.test(lineNameInputValue)) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_SPECIAL_CHARACTER);
  } else if (checkInvalidKorean.test(lineNameInputValue)) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_NOT_COMPLETE);
  } else if (checkMultipleSpaces.test(lineNameInputValue)) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_MULTIPLE_SPACES);
  } else {
    isValid = true;
  }

  return isValid;
}
