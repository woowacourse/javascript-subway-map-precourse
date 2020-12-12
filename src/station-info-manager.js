export default class StationINFOManager {
  constructor() {
    this.stations_ = [];
    this.lines_ = [];
  }

  addNewStation({ name }) {
    const newStation = {
      name: name,
      linesOfStation: new Set(),
    };
    this.stations_.push(newStation);
  }
  getStationsNames() {
    const stationNames = [];
    this.stations_.forEach(({ name }) => {
      stationNames.push(name);
    });
    return stationNames;
  }
  getLinesNames() {
    const linesINFOs = [];
    this.lines_.forEach(({ name, stationsOfLine }) => {
      linesINFOs.push({
        name: name,
        startStationName: stationsOfLine[0].name,
        endStationName: stationsOfLine[stationsOfLine.length - 1].name,
      });
    });
    return linesINFOs;
  }
  deleteStation(nameToDelete) {
    const stationIndexToDelete = this.stations_.findIndex(({ name }) => {
      return nameToDelete === name;
    });
    if (stationIndexToDelete === -1) {
      return;
    }
    this.stations_.splice(stationIndexToDelete, 1);
  }
  addNewLine({ lineName, startStationName, endStationName }) {
    const startStationPtr = this.getPointerFromStationsArray_(startStationName);
    const endStationPtr = this.getPointerFromStationsArray_(endStationName);
    const newLine = {
      name: lineName,
      stationsOfLine: [startStationPtr, endStationPtr],
    };
    startStationPtr.linesOfStation.add(lineName);
    endStationPtr.linesOfStation.add(lineName);
    this.lines_.push(newLine);
  }
  deleteLine(nameToDelete) {
    const lineIndexToDelete = this.lines_.findIndex(({ name }) => {
      return nameToDelete === name;
    });
    if (lineIndexToDelete === -1) {
      return;
    }
    this.deleteLineINFOInAllStations_(this.lines_[lineIndexToDelete]);
    this.lines_.splice(lineIndexToDelete, 1);
  }
  isNotOverlapNameInStationsArray(inputName) {
    const isValid = this.isNotOverlapName_(this.stations_, inputName);
    if (!isValid) {
      alert(OVERLAP_STATION_ERROR_MESSAGE);
    }
    return isValid;
  }
  isNotOverlapNameInLinesArray(inputName) {
    const isValid = this.isNotOverlapName_(this.lines_, inputName);
    if (!isValid) {
      alert(OVERLAP_LINE_ERROR_MESSAGE);
    }
    return isValid;
  }

  isNotOverlapName_(targetToFindOverlap, inputName) {
    const overlapIndex = targetToFindOverlap.findIndex(
      ({ name }) => name === inputName
    );
    return overlapIndex === -1;
  }
  deleteLineINFOInAllStations_(lineToDelete) {
    const { name, stationsOfLine } = lineToDelete;
    stationsOfLine.forEach((station) => {
      station.linesOfStation.delete(name);
    });
  }
  getPointerFromStationsArray_(targetName) {
    const targetIndex = this.stations_.findIndex(({ name }) => {
      return name === targetName;
    });
    return this.stations_[targetIndex];
  }
}

const OVERLAP_STATION_ERROR_MESSAGE = "기존 역 이름과 중복되는 이름입니다.";
const OVERLAP_LINE_ERROR_MESSAGE = "기존 노선 이름과 중복되는 이름입니다.";
