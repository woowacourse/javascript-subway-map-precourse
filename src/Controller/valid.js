import {ERROR_MESSAGE, MIN_LETTER, MIN_LINE_LENGTH} from './utils.js';

export const isStationInputVaild = (station, exStation) => {
  if (!isMatched(station)) {
    return false;
  }
  if (!isAllDifferentStation(station, exStation)) {
    return false;
  }

  return true;
};

export const isLineInputValid = (userLine, exLine) => {
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
    return alert(ERROR_MESSAGE.LINE_HAVE_SAME_STATION);
  }

  return true;
};

export const isMoreThanTwoStation = (line) => {
  if (line.length <= MIN_LINE_LENGTH) {
    return alert(ERROR_MESSAGE.LESS_THAN_TWO_STATION);
  }

  return true;
};

const isMatched = (value) => {
  if (value.match(/[^가-힣0-9]/)) {
    return alert(ERROR_MESSAGE.WRONG_INPUT);
  }
  if (value.length < MIN_LETTER) {
    return alert(ERROR_MESSAGE.LESS_THAN_ONE_LETTER);
  }

  return true;
};

const isAllDifferentStation = (station, allStations) => {
  if (allStations && allStations.includes(station)) {
    return alert(ERROR_MESSAGE.SAME_STATION);
  }

  return true;
};

const isAllDifferentLine = (userLine, allLines) => {
  if (allLines.find((line) => line.lineName === userLine)) {
    return alert(ERROR_MESSAGE.SAME_LINE);
  }

  return true;
};

const isAllDifferentSection = (userSection, allSection) => {
  if (allSection.find((station) => station === userSection.sectionName)) {
    return alert(ERROR_MESSAGE.ALREADY_INCLUDE_STATION);
  }

  return true;
};

const isLastStopDifferent = (station) => {
  if (station[0] === station[station.length - 1]) {
    return alert(ERROR_MESSAGE.SAME_LAST_STOP);
  }

  return true;
};

const isNumber = (number) => {
  if (number.match(/\D/) || number === '') {
    return alert(ERROR_MESSAGE.NOT_NUMBER);
  }

  return true;
};

const isMoreThanMaxNumber = (userSection, section) => {
  if (section.length < userSection.number) {
    return alert(`${section.length}${ERROR_MESSAGE.LENGTH_LIMIT}`);
  }

  return true;
};
