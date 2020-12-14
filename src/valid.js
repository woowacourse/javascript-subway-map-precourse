const MIN_STRING_LENGTH = 2;
const MIN_SECTION_LENGTH = 2;
const SECTION_START = 0;
const ERROR_DUPLICATED_NAME = '중복된 이름이 존재합니다.';
const ERROR_UNDER_MINUMUM_LENGTH = `역 이름은 ${MIN_STRING_LENGTH}글자 이상이어야 합니다.`;
const ERROR_EMPTY_STRING = '값을 입력해야 합니다.';
const ERROR_SECTION_LENGTH_UNDER_MIN = `노선에 역이 ${MIN_SECTION_LENGTH}개 이하이므로 삭제가 불가능합니다.`;
const ERROR_STATION_INCLUDED = '노선에 포함되어있는 역은 삭제가 불가능합니다.';
const ERROR_STATION_ALREADY_EXISTS = '기존의 노선에 해당 역이 존재합니다.';
const ERROR_SECTION_OUT_OF_RANGE = '구간 범위를 벗어난 숫자입니다.';
export const VALID_ADDITION = 'addition';
export const VALID_DELETION = 'deletion';

const isDuplicatedName = (list, input) => list.indexOf(input) !== -1;

const isUnderMinLength = input => input.length < MIN_STRING_LENGTH;

const isEmptyString = input => !input;

export const isValidStationName = (list, input) => {
  if (isDuplicatedName(list, input)) {
    alert(ERROR_DUPLICATED_NAME);
    return false;
  } else if (isEmptyString(input)) {
    alert(ERROR_EMPTY_STRING);
    return false;
  } else if (isUnderMinLength(input)) {
    alert(ERROR_UNDER_MINUMUM_LENGTH);
    return false;
  }

  return true;
};

export const isInvalidStationName = (list, input) => {
  if (isDuplicatedName(list, input)) {
    alert(ERROR_STATION_ALREADY_EXISTS);
    return true;
  }
  return false;
};

export const isValidLineName = (list, input) => {
  const nameList = list.map(item => item.lineName);
  if (isDuplicatedName(nameList, input)) {
    alert(ERROR_DUPLICATED_NAME);
    return false;
  } else if (isEmptyString(input)) {
    alert(ERROR_EMPTY_STRING);
    return false;
  }

  return true;
};

export const isInvalidStationOrder = (line, order) => {
  if (order < SECTION_START || order > line.length) {
    alert(ERROR_SECTION_OUT_OF_RANGE);
    return true;
  } else if (isEmptyString(order)) {
    alert(ERROR_EMPTY_STRING);
    return true;
  }
  return false;
};

export const isInvalidStationDeletion = (lines, targetStation) => {
  for (let i = SECTION_START; i < lines.length; i++) {
    const index = lines[i].stations.indexOf(targetStation);
    if (index !== -1) {
      alert(ERROR_STATION_INCLUDED);
      return true;
    }
  }
  return false;
};

export const isInvalidSectionDeletion = stations => {
  if (stations.length <= MIN_SECTION_LENGTH) {
    alert(ERROR_SECTION_LENGTH_UNDER_MIN);
    return true;
  }
  return false;
};

export const isEndSection = (stations, targetIndex, type) => {
  if (type === VALID_DELETION) {
    return targetIndex === stations.length - 1;
  } else if (type === VALID_ADDITION) {
    return targetIndex === stations.length;
  }

  return false;
};

export const isStartSection = targetIndex => {
  return targetIndex === SECTION_START;
};

export const isStartEqualsEnd = (startStation, endStation) => {
  if (startStation === endStation) {
    alert('상행 종점과 하행 종점이 동일합니다.');
    return true;
  }
  return false;
};
