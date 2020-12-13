import { ALERT_MESSAGES } from "../../../global/messages.js";
import { state } from "../../../index.js";

const checkSpecialCharacter = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+₩\<\>@\#$%&\\\=\(\'\"]/;
const checkInvalidKorean = /[|ㄱ-ㅎ|ㅏ-ㅣ]/;
const checkMultipleSpaces = /\s{2,}/;
const STATION_INPUT_MINIMUM_LENGTH = 2;

export function isDuplicatedStationName(stationName) {
  let isDuplicated = false;

  for (const station of state.stationArray) {
    if (station.stationName === stationName) {
      isDuplicated = true;
    }
  }

  return isDuplicated;
}

export default function inputStationValidator(stationNameInputValue) {
  let isValid = false;
  if (isDuplicatedStationName(stationNameInputValue)) {
    alert(ALERT_MESSAGES.ERROR_STATION_INPUT_DUPLICATED);
  } else if (stationNameInputValue.length < STATION_INPUT_MINIMUM_LENGTH) {
    alert(ALERT_MESSAGES.ERROR_STATION_INPUT_LENGTH_UNDER);
  } else if (checkSpecialCharacter.test(stationNameInputValue)) {
    alert(ALERT_MESSAGES.ERROR_STATION_INPUT_SPECIAL_CHARACTER);
  } else if (checkInvalidKorean.test(stationNameInputValue)) {
    alert(ALERT_MESSAGES.ERROR_STATION_INPUT_NOT_COMPLETE);
  } else if (checkMultipleSpaces.test(stationNameInputValue)) {
    alert(ALERT_MESSAGES.ERROR_STATION_INPUT_MULTIPLE_SPACES);
  } else {
    isValid = true;
  }

  return isValid;
}
