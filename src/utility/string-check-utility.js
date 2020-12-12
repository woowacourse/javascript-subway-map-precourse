export function getMessageToCheckStationName(name) {
  const processedName = name.trim();
  if (processedName.length < MINIMUM_LENGTH_OF_STATION_NAME) {
    return MINIMUM_LENGTH_STATION_NAME_ERROR_MESSAGE;
  }
  return "성공";
}

export function getMessageToCheckLineInput(name) {
  const processedName = name.trim();
  if (processedName.length < MINIMUM_LENGTH_OF_LINE_NAME) {
    return MINIMUM_LENGTH_LINE_NAME_ERROR_MESSAGE;
  }
  return "성공";
}

const MINIMUM_LENGTH_OF_STATION_NAME = 2;
const MINIMUM_LENGTH_STATION_NAME_ERROR_MESSAGE = `역 이름은 최소 ${MINIMUM_LENGTH_OF_STATION_NAME} 글자여야 합니다.`;
const MINIMUM_LENGTH_OF_LINE_NAME = 1;
const MINIMUM_LENGTH_LINE_NAME_ERROR_MESSAGE = `노선 이름은 최소 ${MINIMUM_LENGTH_OF_LINE_NAME} 글자여야 합니다.`;
