export function isValidStation(name) {
  const condition1 = canSatisfyLengthCondition({
    name: name,
    minLength: MINIMUM_LENGTH_OF_STATION_NAME,
    errorMessage: MINIMUM_LENGTH_STATION_NAME_ERROR_MESSAGE,
  });

  if (!condition1) {
    return false;
  }
  return true;
}

export function isValidLine(name, startStationName, endStationName) {
  const condition1 = canSatisfyLengthCondition({
    name: name,
    minLength: MINIMUM_LENGTH_OF_LINE_NAME,
    errorMessage: MINIMUM_LENGTH_LINE_NAME_ERROR_MESSAGE,
  });
  const condition2 = hasNotEqualName(startStationName, endStationName);
  let boolToReturn = true;

  if (!(condition1 && condition2)) {
    boolToReturn = false;
  }
  return boolToReturn;
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

const HAS_EQUAL_NAME_ERROR_MESSAGE = `상행 종점과 하행 종점이 같은 역입니다.`;
