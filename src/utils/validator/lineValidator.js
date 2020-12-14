import lineStorage from '../lineStorage.js';

const isEqualName = (lines, lineName) => {
  if (lines.some((line) => line.name === lineName)) {
    return alert('중복된 노선 이름입니다.');
  }
  return true;
};

const isNameNotNull = (lineName) => {
  if (!lineName) {
    return alert('노선 이름을 입력해주세요');
  }
  return true;
};

const isCorrectName = (lineName) => {
  if (lineName.split('')[lineName.length - 1] !== '선') {
    return alert("노선의 이름은 '선'으로 끝나야 합니다");
  }
  return true;
};

const isEqualPoints = (startStationName, endStationName) => {
  if (startStationName === endStationName) {
    return alert('상행 종점과 하행 종점은 서로 달라야 합니다');
  }
  return true;
};

const isEqualLine = (startStationName, endStationName) => {
  const startStations = lineStorage()
    .getStartPoints()
    .map((station) => station.name === startStationName);
  const endStations = lineStorage()
    .getEndPoints()
    .map((station) => station.name === endStationName);

  const equalLine = startStations.filter((station, index) => station && endStations[index]);
  return equalLine.length !== 0 ? alert('동일한 종점을 가진 노선이 있습니다') : true;
};

const isEqualReverseLine = (startStationName, endStationName) => {
  const endStations = lineStorage()
    .getStartPoints()
    .map((station) => station.name === endStationName);
  const StartStations = lineStorage()
    .getEndPoints()
    .map((station) => station.name === startStationName);

  const equalLine = StartStations.filter((station, index) => station && endStations[index]);
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
