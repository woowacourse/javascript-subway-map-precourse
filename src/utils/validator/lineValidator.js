import lineStorage from '../../storage/lineStorage.js';
import stationStorage from '../../storage/stationStorage.js';

const isEqualName = (lines, lineName) => {
  return lines.some((line) => line.name === lineName) ? alert('중복된 노선 이름입니다.') : true;
};

const isNameNotNull = (lineName) => {
  return !lineName ? alert('노선 이름을 입력해주세요') : true;
};

const isCorrectName = (lineName) => {
  return lineName.split('')[lineName.length - 1] !== '선'
    ? alert("노선의 이름은 '선'으로 끝나야 합니다")
    : true;
};

const isEqualPoints = (startStationName, endStationName) => {
  return startStationName === endStationName
    ? alert('상행 종점과 하행 종점은 서로 달라야 합니다')
    : true;
};

const getStartStationIds = (stationName) => {
  return lineStorage()
    .getStartPointsId()
    .map((stationId) => stationId === parseInt(stationStorage().getStationIdByName(stationName)));
};

const getEndStationIds = (stationName) => {
  return lineStorage()
    .getEndPointsId()
    .map((stationId) => stationId === parseInt(stationStorage().getStationIdByName(stationName)));
};

const isEqualLine = (startStationName, endStationName) => {
  const startStationIds = getStartStationIds(startStationName);
  const endStationIds = getEndStationIds(endStationName);

  const equalLine = startStationIds.filter((station, index) => station && endStationIds[index]);
  return equalLine.length !== 0 ? alert('동일한 종점을 가진 노선이 있습니다') : true;
};

const isEqualReverseLine = (startStationName, endStationName) => {
  const endStationsIds = getStartStationIds(startStationName);
  const StartStationsIds = getEndStationIds(endStationName);

  const equalLine = StartStationsIds.filter((station, index) => station && endStationsIds[index]);
  return equalLine.length !== 0 ? alert('동일한 종점을 가진 노선이 있습니다') : true;
};

function lineNameValidator(lines, lineName) {
  return isEqualName(lines, lineName) && isNameNotNull(lineName) && isCorrectName(lineName);
}

function lineStationsValidator(startStationName, endStationName) {
  return (
    isEqualPoints(startStationName, endStationName) &&
    isEqualLine(startStationName, endStationName) &&
    isEqualReverseLine(startStationName, endStationName)
  );
}

export { lineNameValidator, lineStationsValidator };
