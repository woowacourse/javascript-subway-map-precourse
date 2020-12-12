export default class StationINFOManager {
  constructor() {
    this.stations_ = [];
    this.lines_ = [];
  }

  addNewStation({ name }) {
    if (this.isOverlapName_(this.stations_, name)) {
      alert(OVERLAP_STATION_ERROR_MESSAGE);
      return;
    }
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
      alert(NOT_EXIST_NAME_ERROR_MESSAGE);
      return;
    }
    this.stations_.splice(stationIndexToDelete, 1);
  }
  addNewLine({ lineName, startStationName, endStationName }) {
    if (this.isOverlapName_(this.lines_, lineName)) {
      alert(OVERLAP_LINE_ERROR_MESSAGE);
      return;
    }
    const startStationPtr = this.getPointerFromStationsArray_(startStationName);
    const endStationPtr = this.getPointerFromStationsArray_(endStationName);
    const newLine = {
      name: lineName,
      stationsOfLine: [startStationPtr, endStationPtr],
    };
    startStationPtr.linesOfStation.add(lineName);
    endStationPtr.linesOfStation.add(lineName);
    this.lines_.push(newLine);
    console.log(this.stations_);
    console.log(this.lines_);
  }

  getPointerFromStationsArray_(targetName) {
    const targetIndex = this.stations_.findIndex(({ name }) => {
      return name === targetName;
    });
    return this.stations_[targetIndex];
  }
  isOverlapName_(targetToFindOverlap, inputName) {
    const overlapIndex = targetToFindOverlap.findIndex(
      ({ name }) => name === inputName
    );
    return overlapIndex !== -1;
  }
}

const OVERLAP_STATION_ERROR_MESSAGE = "기존 역 이름과 중복되는 이름입니다.";
const OVERLAP_LINE_ERROR_MESSAGE = "기존 노선 이름과 중복되는 이름입니다.";
const NOT_EXIST_NAME_ERROR_MESSAGE = "제거할 역이 이미 존재하지 않습니다.";
