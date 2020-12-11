import { ALERT_MESSAGES } from "../../../global/alert-messages.js";

const checkSpecialCharacter = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+₩\<\>@\#$%&\\\=\(\'\"]/;
const checkInvalidKorean = /[|ㄱ-ㅎ|ㅏ-ㅣ]/;
const checkMultipleSpaces = /\s{2,}/;

export default function inputStationValidator(stationNameInputValue) {
  let isValid = false;

  if (stationNameInputValue.length < 2) {
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
