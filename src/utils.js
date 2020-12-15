export const hasDuplicatedName = (stationList, stationName) =>
  stationList.includes(stationName);

const isLengthMoreOne = stationName => stationName.length > 1;

export const isValidStationName = (stationList, stationName) => {
  return (
    !hasDuplicatedName(stationList, stationName) && isLengthMoreOne(stationName)
  );
};

const hasDuplicatedLine = (lineList, lineInfo) => {
  for (const line of lineList) {
    if (line[0] === lineInfo[0]) {
      return true;
    }
  }
  return false;
};

const isSameStation = lineInfo => lineInfo[1] === lineInfo[2];

export const isValidLineInfo = (lineList, lineInfo) => {
  return !hasDuplicatedLine(lineList, lineInfo) && !isSameStation(lineInfo);
};

export const inLine = stationName => {
  let lineList = JSON.parse(window.localStorage.getItem("lineList"));

  lineList = lineList.flat();
  return lineList.includes(stationName);
};
