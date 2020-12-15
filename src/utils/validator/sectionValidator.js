const isNotRegistered = (id, stations, stationName) => {
  const stationLines = stations.filter((station) => station.name === stationName)[0].line;
  return stationLines.includes(id) ? alert('이미 등록된 역입니다') : true;
};

const isNumber = (sectionIndex) => {
  return Number.isNaN(sectionIndex) ? alert('정확한 숫자를 입력해주세요') : true;
};

const isPositiveNumber = (sectionIndex) => {
  return sectionIndex >= 0 ? true : alert('음수가 아닌 0 이상의 숫자를 입력해주세요');
};

const isCorrectIndex = (sectionLength, sectionIndex) => {
  return sectionIndex <= sectionLength ? true : alert('입력한 순서를 확인해주세요');
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

export { sectionStationNameValidator, sectionIndexValidator };
