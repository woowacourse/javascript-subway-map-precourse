import { STATION_ALERT_MESSAGES, LINE_ALERT_MESSAGES } from "../../../global/messages.js";
import { state } from "../../../index.js";

const checkSpecialCharacter = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+₩\<\>@\#$%&\\\=\(\'\"]/;
const checkInvalidKorean = /[|ㄱ-ㅎ|ㅏ-ㅣ]/;
const checkMultipleSpaces = /\s{2,}/;
const STATION_INPUT_MINIMUM_LENGTH = 2;
const LINE_INPUT_MINIMUM_LENGTH = 1;

function isDuplicatedName(array, name) {
  let isDuplicated = false;

  for (const object of array) {
    if (object.type === "STATION" && object.stationName === name) {
      isDuplicated = true;
    }
    if (object.type === "LINE" && object.lineName === name) {
      isDuplicated = true;
    }
  }

  return isDuplicated;
}

function isValidStationName(value) {
  let isValid = false;

  if (isDuplicatedName(state.stationArray, value)) {
    alert(STATION_ALERT_MESSAGES.ERROR_STATION_INPUT_DUPLICATED);
  } else if (value.length < STATION_INPUT_MINIMUM_LENGTH) {
    alert(STATION_ALERT_MESSAGES.ERROR_STATION_INPUT_LENGTH_UNDER);
  } else if (checkSpecialCharacter.test(value)) {
    alert(STATION_ALERT_MESSAGES.ERROR_STATION_INPUT_SPECIAL_CHARACTER);
  } else if (checkInvalidKorean.test(value)) {
    alert(STATION_ALERT_MESSAGES.ERROR_STATION_INPUT_NOT_COMPLETE);
  } else if (checkMultipleSpaces.test(value)) {
    alert(STATION_ALERT_MESSAGES.ERROR_STATION_INPUT_MULTIPLE_SPACES);
  } else {
    isValid = true;
  }

  return isValid;
}

function isValidLineName(value) {
  let isValid = false;

  if (isDuplicatedName(state.subwayLines, value)) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_DUPLICATED);
  } else if (value.length < LINE_INPUT_MINIMUM_LENGTH) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_LENGTH_UNDER);
  } else if (checkSpecialCharacter.test(value)) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_SPECIAL_CHARACTER);
  } else if (checkInvalidKorean.test(value)) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_NOT_COMPLETE);
  } else if (checkMultipleSpaces.test(value)) {
    alert(LINE_ALERT_MESSAGES.ERROR_LINE_INPUT_MULTIPLE_SPACES);
  } else {
    isValid = true;
  }

  return isValid;
}

export default function inputNameValidator(type, value) {
  if (type === "STATION") {
    return isValidStationName(value);
  }
  if (type === "LINE") {
    return isValidLineName(value);
  }
}
