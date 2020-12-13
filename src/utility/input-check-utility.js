import { SELECTEOR_NONE } from "./share-constant-utility.js";

export function isValidStationName(name) {
  const isValidLength = canSatisfyLengthCondition({
    name: name,
    minLength: MINIMUM_LENGTH_OF_STATION_NAME,
    errorMessage: MINIMUM_LENGTH_STATION_NAME_ERROR_MESSAGE,
  });

  if (!isValidLength) {
    return false;
  }
  return true;
}
export function isValidLine(name, startStationName, endStationName) {
  const isValidLength = canSatisfyLengthCondition({
    name: name,
    minLength: MINIMUM_LENGTH_OF_LINE_NAME,
    errorMessage: MINIMUM_LENGTH_LINE_NAME_ERROR_MESSAGE,
  });
  const isNotEqualName = hasNotEqualName(startStationName, endStationName);
  let boolToReturn = true;

  if (!(isValidLength && isNotEqualName)) {
    boolToReturn = false;
  }
  return boolToReturn;
}
export function isValidOrder(order) {
  let retBool = true;
  if (order === "") {
    alert(NOT_TYPE_OF_NUMBER_ERROR_MESSAGE);
    retBool = false;
  }
  if (Number(order) < MINIMUM_VAILD_ORDER) {
    alert(LESS_THAN_MINIMUM_ORDER_ERROR_MESSAGE);
    retBool = false;
  }
  return retBool;
}
export function isValidOption(inputOptions) {
  let retBool = true;
  for (let inputOption of inputOptions) {
    if (inputOption === SELECTEOR_NONE) {
      alert(NOT_SELECTED_OPTION_ERROR_MESSAGE);
      retBool = false;
      break;
    }
  }
  return retBool;
}

function canSatisfyLengthCondition({ name, minLength, errorMessage }) {
  let boolToReturn = true;
  if (name.length < minLength) {
    alert(errorMessage);
    boolToReturn = false;
  }
  return boolToReturn;
}
function hasNotEqualName(startStationName, endStationName) {
  let boolToReturn = true;
  if (startStationName === endStationName) {
    alert(HAS_EQUAL_NAME_ERROR_MESSAGE);
    boolToReturn = false;
  }
  return boolToReturn;
}

const MINIMUM_LENGTH_OF_STATION_NAME = 2;
const MINIMUM_LENGTH_STATION_NAME_ERROR_MESSAGE = `역 이름은 최소 ${MINIMUM_LENGTH_OF_STATION_NAME} 글자여야 합니다.`;
const MINIMUM_LENGTH_OF_LINE_NAME = 1;
const MINIMUM_LENGTH_LINE_NAME_ERROR_MESSAGE = `노선 이름은 최소 ${MINIMUM_LENGTH_OF_LINE_NAME} 글자여야 합니다.`;

const MINIMUM_VAILD_ORDER = 0;
const NOT_TYPE_OF_NUMBER_ERROR_MESSAGE = "숫자를 입력해주세요.";
const LESS_THAN_MINIMUM_ORDER_ERROR_MESSAGE = `순서값은 최소 ${MINIMUM_VAILD_ORDER} 이상이어야 합니다.`;
const HAS_EQUAL_NAME_ERROR_MESSAGE = `상행 종점과 하행 종점이 같은 역입니다.`;
const NOT_SELECTED_OPTION_ERROR_MESSAGE = "콤보박스의 옵션을 선택해주세요.";