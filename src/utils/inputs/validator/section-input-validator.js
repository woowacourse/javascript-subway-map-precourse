import { SECTION_ALERT_MESSAGES } from "../../../global/messages.js";

const checkNumber = /^\d+$/;
// const checkZero = /^0\d{1,}$/
const checkFirstDigitZero = /^0{1,}/;

export function isDuplicatedStationInSection(
  selectedStationName,
  stationsInLine
) {
  let isDuplicated = false;

  for (const station of stationsInLine) {
    if (station.stationName === selectedStationName) {
      isDuplicated = true;
    }
  }

  return isDuplicated;
}

export function checkStationInputZero(sectionInputValue) {
  let deleteZeroInValue = sectionInputValue
    .trim()
    .replace(checkFirstDigitZero, "");
  if (deleteZeroInValue === "") {
    deleteZeroInValue = "0";
  }
  return deleteZeroInValue;
}

export default function sectionInputValidator(
  sectionInputValue,
  selectedStationName,
  stationsInLine
) {
  let isValid = false;

  if (!checkNumber.test(sectionInputValue)) {
    alert(SECTION_ALERT_MESSAGES.ERROR_SECTION_INPUT_NUMBER);
  } else if (
    isDuplicatedStationInSection(selectedStationName, stationsInLine)
  ) {
    alert(SECTION_ALERT_MESSAGES.ERROR_SECTION_INPUT_DUPLICATED);
  } else {
    isValid = true;
  }

  return isValid;
}
