import { SELECTEOR_NONE } from "./share-constant-utility.js";

export function hasValidStationName(name) {
  const isValidLength = hasSatisfiedMinLengthCondition({
    operandLength: name.length,
    minLength: MINIMUM_LENGTH_OF_STATION_NAME,
    errorMessage: MINIMUM_LENGTH_STATION_NAME_ERROR_MESSAGE,
  });
  return isValidLength;
}
export function hasValidLine(name, startStationName, endStationName) {
  const isValidLength = hasSatisfiedMinLengthCondition({
    operandLength: name.length,
    minLength: MINIMUM_LENGTH_OF_LINE_NAME,
    errorMessage: MINIMUM_LENGTH_LINE_NAME_ERROR_MESSAGE,
  });
  const isNotEqualName = hasNotEqualName({
    operand1: startStationName,
    operand2: endStationName,
    errorMessage: HAS_EQUAL_NAME_ERROR_MESSAGE,
  });
  return isValidLength && isNotEqualName;
}
export function hasValidOrder(order) {
  const isTypeOfNumber = hasTypeOfNumber({
    operand: order,
    errorMessage: NOT_TYPE_OF_NUMBER_ERROR_MESSAGE,
  });
  const isSatisfyLengthCondition = hasSatisfiedMinLengthCondition({
    operandLength: Number(order),
    minLength: MINIMUM_VAILD_ORDER,
    errorMessage: LESS_THAN_MINIMUM_ORDER_ERROR_MESSAGE,
  });
  return isTypeOfNumber && isSatisfyLengthCondition;
}
export function hasValidOption(inputOptions) {
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
export function hasSatisfiedMinLengthCondition({
  operandLength,
  minLength,
  errorMessage,
}) {
  let boolToReturn = true;
  if (operandLength < minLength) {
    alert(errorMessage);
    boolToReturn = false;
  }
  return boolToReturn;
}
export function hasSatisfiedMaxLengthCondition({
  operandLength,
  maxLength,
  errorMessage,
}) {
  let boolToReturn = true;
  if (operandLength > maxLength) {
    alert(errorMessage);
    boolToReturn = false;
  }
  return boolToReturn;
}

function hasTypeOfNumber({ operand, errorMessage }) {
  let retBool = true;
  if (operand === "") {
    alert(errorMessage);
    retBool = false;
  }
  return retBool;
}
function hasNotEqualName({ operand1, operand2, errorMessage }) {
  let isNotEqualName = true;
  if (operand1 === operand2) {
    alert(errorMessage);
    isNotEqualName = false;
  }
  return isNotEqualName;
}

const MINIMUM_LENGTH_OF_STATION_NAME = 2;
const MINIMUM_LENGTH_OF_LINE_NAME = 1;
const MINIMUM_VAILD_ORDER = 0;

const MINIMUM_LENGTH_STATION_NAME_ERROR_MESSAGE = `역 이름은 최소 ${MINIMUM_LENGTH_OF_STATION_NAME} 글자여야 합니다.`;
const MINIMUM_LENGTH_LINE_NAME_ERROR_MESSAGE = `노선 이름은 최소 ${MINIMUM_LENGTH_OF_LINE_NAME} 글자여야 합니다.`;
const NOT_TYPE_OF_NUMBER_ERROR_MESSAGE = "숫자를 입력해주세요.";
const LESS_THAN_MINIMUM_ORDER_ERROR_MESSAGE = `순서값은 최소 ${MINIMUM_VAILD_ORDER} 이상이어야 합니다.`;
const HAS_EQUAL_NAME_ERROR_MESSAGE = `상행 종점과 하행 종점이 같은 역입니다.`;
const NOT_SELECTED_OPTION_ERROR_MESSAGE = "콤보박스의 옵션을 선택해주세요.";
