import lineStorage from '../lineStorage.js';
import stationStorage from '../stationStorage.js';

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

const isEqualLine = (startStationName, endStationName) => {
  const startStationId = stationStorage().getStationIdByName(startStationName);
  const endStationId = stationStorage().getStationIdByName(endStationName);

  const startStationIds = lineStorage()
    .getStartPointsId()
    .map((stationId) => stationId === parseInt(startStationId));
  const endStationIds = lineStorage()
    .getEndPointsId()
    .map((stationId) => stationId === parseInt(endStationId));

  const equalLine = startStationIds.filter((station, index) => station && endStationIds[index]);
  return equalLine.length !== 0 ? alert('동일한 종점을 가진 노선이 있습니다') : true;
};

const isEqualReverseLine = (startStationName, endStationName) => {
  const startStationId = stationStorage().getStationIdByName(startStationName);
  const endStationId = stationStorage().getStationIdByName(endStationName);

  const endStationsIds = lineStorage()
    .getStartPointsId()
    .map((stationId) => stationId === parseInt(startStationId));
  const StartStationsIds = lineStorage()
    .getEndPointsId()
    .map((stationId) => stationId === parseInt(endStationId));

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
