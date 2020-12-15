import { SECTION_ALERT_MESSAGES } from "../../../global/messages.js";

const checkNumber = /^\d+$/;
const checkFirstDigitZero = /^0{1,}/;

export function isDuplicatedStationInSection(selectedStation, stationsInLine) {
  let isDuplicated = false;

  for (const station of stationsInLine) {
    if (station.stationName === selectedStation) {
      isDuplicated = true;
    }
  }

  return isDuplicated;
}

export function checkStationInputZero(inputValue) {
  let deleteZeroInValue = inputValue.trim().replace(checkFirstDigitZero, "");

  if (deleteZeroInValue === "") {
    deleteZeroInValue = "0";
  }

  return deleteZeroInValue;
}

export default function sectionInputValidator(inputValue, selectedStation, stationsInLine) {
  let isValid = false;

  if (!checkNumber.test(inputValue)) {
    alert(SECTION_ALERT_MESSAGES.ERROR_SECTION_INPUT_NUMBER);
  } else if (isDuplicatedStationInSection(selectedStation, stationsInLine)) {
    alert(SECTION_ALERT_MESSAGES.ERROR_SECTION_INPUT_DUPLICATED);
  } else {
    isValid = true;
  }

  return isValid;
}
