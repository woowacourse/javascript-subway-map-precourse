export function getMessageToCheckStationName(name) {
  const processedName = name.trim();
  if (processedName.length < MINIMUM_LENGTH_OF_NAME) {
    return MINIMUM_LENGTH_ERROR_MESSAGE;
  }
  return "성공";
}

const MINIMUM_LENGTH_OF_NAME = 2;
const MINIMUM_LENGTH_ERROR_MESSAGE = `역 이름은 최소 ${MINIMUM_LENGTH_OF_NAME} 글자여야 합니다.`;
