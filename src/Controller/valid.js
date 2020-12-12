export const isStationInputVaild = (station, exStation) => {
  if (!isLengthRight(station)) {
    return false;
  }
  if (!isMatched(station)) {
    return false;
  }
  if (!isAllDifferentStation(station, exStation)) {
    return false;
  }

  return true;
};

export const isLineInputValid = (userLine, exLine) => {
  if (!isLengthRight(userLine.lineName)) {
    return false;
  }
  if (!isMatched(userLine.lineName)) {
    return false;
  }
  if (!isAllDifferentLine(userLine.lineName, exLine)) {
    return false;
  }
  if (!isLastStopDifferent(userLine.station)) {
    return false;
  }

  return true;
};

export const isSectionValid = (userSection, exSection) => {
  if (!isNumber(userSection.number)) {
    return false;
  }
  if (!isAllDifferentSection(userSection, exSection)) {
    return false;
  }
  if (!isMoreThanMaxNumber(userSection, exSection)) {
    return false;
  }

  return true;
};

export const isNotLineHaved = (station, lines) => {
  if (lines.find((line) => line.station.includes(station))) {
    return alert('노선에 존재하는 역은 삭제할 수 없습니다.');
  }

  return true;
};

export const isMoreThanTwoStation = (line) => {
  if (line.length <= 2) {
    return alert('노선에 역이 2개 이하이면 삭제할 수 없습니다.');
  }

  return true;
};

const isLengthRight = (value) => {
  if (value.length < 2) {
    return alert('2글자 이상으로 입력해주세요.');
  }

  return true;
};

const isMatched = (value) => {
  if (value.match(/[^가-힣1-9]/)) {
    return alert('띄어쓰기 없이 한글과 숫자만 입력해주세요.');
  }

  return true;
};

const isAllDifferentStation = (station, allStations) => {
  if (allStations && allStations.includes(station)) {
    return alert('같은 이름의 역이 존재합니다.');
  }

  return true;
};

const isAllDifferentLine = (userLine, allLines) => {
  if (allLines.find((line) => line.lineName === userLine)) {
    return alert('같은 이름의 노선이 존재합니다.');
  }

  return true;
};

const isAllDifferentSection = (userSection, allSection) => {
  if (allSection.find((station) => station === userSection.sectionName)) {
    return alert('이미 역이 추가되어 있습니다.');
  }

  return true;
};

const isLastStopDifferent = (station) => {
  if (station[0] === station[station.length - 1]) {
    return alert('상행과 하행이 같은 역이 될 수 없습니다.');
  }

  return true;
};

const isNumber = (number) => {
  if (number.match(/\D/) || number === '') {
    return alert('숫자를 입력해주세요.');
  }

  return true;
};

const isMoreThanMaxNumber = (userSection, section) => {
  if (section.length < userSection.number) {
    return alert(`${section.length}이하의 수를 입력해주세요.`);
  }

  return true;
};
