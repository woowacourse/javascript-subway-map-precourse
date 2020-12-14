const isNameLengthLongerThanTwo = (stationName) => {
  if (stationName.length < 2) {
    return alert('이름은 두글자 이상입니다');
  }
  return true;
};

const isEqualName = (stations, stationName) => {
  if (stations && stations.map((value) => value.name).includes(stationName)) {
    return alert('중복된 이름입니다.');
  }
  return true;
};

const isIncludedLine = (stationTag) => {
  if (stationTag.dataset.lines.length !== 0) {
    return alert('노선에 포함되어 있는 라인은 삭제할 수 없습니다');
  }
  return true;
};

function stationNameValidator(stations, stationName) {
  return isNameLengthLongerThanTwo(stationName) && isEqualName(stations, stationName);
}

function stationDeleteValidation(stationTag) {
  return isIncludedLine(stationTag);
}

export { stationNameValidator, stationDeleteValidation };
