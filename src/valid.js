import { DOMCtrl, strings } from './doms.js';

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
const ERROR_START_EQUALS_END = '상행 종점과 하행 종점이 동일합니다.';
const ERROR_MUST_BE_AN_INTEGER = '정수 값을 입력해야 합니다.';
const ERROR_SYMBOLS_NOT_PERMITTED = '특수문자는 입력할 수 없습니다.';

export const isValidStationName = (list, input) => {
  if (isDuplicatedName(list, input)) {
    DOMCtrl.focusStationNameInput();
    throw new Error(ERROR_DUPLICATED_NAME);
  } else if (isEmptyString(input)) {
    DOMCtrl.focusStationNameInput();
    throw new Error(ERROR_EMPTY_STRING);
  } else if (isUnderMinLength(input)) {
    DOMCtrl.focusStationNameInput();
    throw new Error(ERROR_UNDER_MINUMUM_LENGTH);
  } else if (isNotAText(input)) {
    DOMCtrl.focusStationNameInput();
    throw new Error(ERROR_SYMBOLS_NOT_PERMITTED);
  }
};

export const isValidLineName = (list, input) => {
  const nameList = list.map(item => item.lineName);
  if (isDuplicatedName(nameList, input)) {
    DOMCtrl.focusLineNameInput();
    throw new Error(ERROR_DUPLICATED_NAME);
  } else if (isEmptyString(input)) {
    DOMCtrl.focusLineNameInput();
    throw new Error(ERROR_EMPTY_STRING);
  } else if (isNotAText(input)) {
    DOMCtrl.focusLineNameInput();
    throw new Error(ERROR_SYMBOLS_NOT_PERMITTED);
  }
};

export const isValidSection = (stations, stationName, stationOrder) => {
  if (isDuplicatedName(stations, stationName)) {
    DOMCtrl.focusLineSelector();
    throw new Error(ERROR_STATION_ALREADY_EXISTS);
  } else if (isOutOfRange(stations, stationOrder)) {
    DOMCtrl.focusSectionOrderInput();
    throw new Error(ERROR_SECTION_OUT_OF_RANGE);
  } else if (isEmptyString(stationOrder)) {
    DOMCtrl.focusSectionOrderInput();
    throw new Error(ERROR_EMPTY_STRING);
  } else if (isNotAnInteger(stationOrder)) {
    DOMCtrl.focusSectionOrderInput();
    throw new Error(ERROR_MUST_BE_AN_INTEGER);
  }
};

export const isValidStationDeletion = (lines, targetStation) => {
  for (let i = SECTION_START; i < lines.length; i++) {
    const index = lines[i].stations.indexOf(targetStation);
    if (index !== -1) {
      throw new Error(ERROR_STATION_INCLUDED);
    }
  }
};

export const isValidSectionDeletion = stations => {
  if (isSectionUnderMinLength(stations.length)) {
    throw new Error(ERROR_SECTION_LENGTH_UNDER_MIN);
  }
};

export const isEndSection = (stations, targetIndex, type) => {
  if (type === strings.VALID_DELETION) {
    return targetIndex === stations.length - 1;
  } else if (type === strings.VALID_ADDITION) {
    return targetIndex === stations.length;
  }
  return false;
};

export const isStartSection = targetIndex => {
  return targetIndex === SECTION_START;
};

export const isStartDiffersWithEnd = (startStation, endStation) => {
  if (startStation === endStation) {
    throw new Error(ERROR_START_EQUALS_END);
  }
};

const isDuplicatedName = (list, input) => list.indexOf(input) !== -1;

const isUnderMinLength = input => input.length < MIN_STRING_LENGTH;

const isEmptyString = input => !input && input !== 0;

const isNotAnInteger = input => !Number.isInteger(input);

const isSectionUnderMinLength = targetLength => targetLength <= MIN_SECTION_LENGTH;

const isOutOfRange = (range, order) => order < SECTION_START || order > range.length;

// 한글, 영문, 숫자만 허용
const isNotAText = input => {
  const texts = new RegExp('[^ㄱ-ㅎ가-힣a-zA-Z0-9]', 'g');
  return texts.test(input);
};
