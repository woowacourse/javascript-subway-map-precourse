import lineStorage from '../../storage/lineStorage.js';
import { SECTION_MIN_LENGTH } from '../constant.js';

const isNumber = (sectionIndex) => {
  return Number.isNaN(sectionIndex) ? alert('정확한 숫자를 입력해주세요') : true;
};

const isPositiveNumber = (sectionIndex) => {
  return sectionIndex >= 0 ? true : alert('음수가 아닌 0 이상의 숫자를 입력해주세요');
};

const isCorrectIndex = (sectionLength, sectionIndex) => {
  return sectionIndex <= sectionLength ? true : alert('입력한 순서를 확인해주세요');
};

const isLengthLongerThanTwo = (lineId) => {
  const stationLength = lineStorage().getOneLine(lineId).stationIds.length;
  return stationLength <= SECTION_MIN_LENGTH
    ? alert('노선은 최소 2개의 역으로 이루어져 있습니다.')
    : true;
};

const isNotRegistered = (id, stations, stationName) => {
  return stations.filter((station) => station.name === stationName)[0].line.includes(id)
    ? alert('이미 등록된 역입니다')
    : true;
};

function sectionStationNameValidator({ id }, stations, stationName) {
  return isNotRegistered(id, stations, stationName);
}

function sectionIndexValidator(sectionLength, sectionIndex) {
  return (
    isNumber(sectionIndex) &&
    isPositiveNumber(sectionIndex) &&
    isCorrectIndex(sectionLength, sectionIndex)
  );
}

function sectionDeleteValidator(lineId) {
  return isLengthLongerThanTwo(lineId);
}

export { sectionStationNameValidator, sectionIndexValidator, sectionDeleteValidator };
