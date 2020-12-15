import { NAME_MIN_LENGTH } from '../constant.js';

const isNameLengthLongerThanTwo = (stationName) => {
  return stationName.length < NAME_MIN_LENGTH ? alert('이름은 두글자 이상입니다') : true;
};

const isEqualName = (stations, stationName) => {
  return stations && stations.map((value) => value.name).includes(stationName)
    ? alert('중복된 이름입니다.')
    : true;
};

const isIncludedLine = (stationTag) => {
  return stationTag.dataset.lines.length !== 0
    ? alert('노선에 포함되어 있는 라인은 삭제할 수 없습니다')
    : true;
};

function stationNameValidator(stations, stationName) {
  return isNameLengthLongerThanTwo(stationName) && isEqualName(stations, stationName);
}

function stationDeleteValidation(stationTag) {
  return isIncludedLine(stationTag);
}

export { stationNameValidator, stationDeleteValidation };
