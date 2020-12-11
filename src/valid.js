const MIN_LENGTH = 2;
const ERROR_DUPLICATED_STATION = '중복된 이름이 존재합니다.';
const ERROR_UNDER_MINUMUM_LENGTH = `역 이름은 ${MIN_LENGTH}글자 이상이어야 합니다.`;
const ERROR_EMPTY_STRING = '값을 입력해야 합니다.';

const isDuplicatedName = (list, input) => list.indexOf(input) !== -1;

const isUnderMinLength = input => input.length < MIN_LENGTH;

const isEmptyString = input => !input;

export const isValidStationName = (list, input) => {
  if (isDuplicatedName(list, input)) {
    alert(ERROR_DUPLICATED_STATION);
    return false;
  } else if (isUnderMinLength(input)) {
    alert(ERROR_UNDER_MINUMUM_LENGTH);
    return false;
  } else if (isEmptyString(input)) {
    alert(ERROR_EMPTY_STRING);
    return false;
  }

  return true;
};

export const isValidLineName = (list, input) => {
  const nameList = list.map(item => item.lineName);
  if (isDuplicatedName(nameList, input)) {
    alert(ERROR_DUPLICATED_STATION);
    return false;
  } else if (isEmptyString(input)) {
    alert(ERROR_EMPTY_STRING);
    return false;
  }

  return true;
};
