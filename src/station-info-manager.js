export default class StationINFOManager {
  constructor() {
    this.stations_ = [];
    this.lines_ = [];
    //this.loadAllFromLocalStorage_();
  }

  addNewStation({ name }) {
    const newStation = {
      name: name,
      linesOfStation: new Set(),
    };
    this.stations_.push(newStation);
    this.saveAllToLocalStorage_();
    console.log(this.stations_);
    console.log(this.lines_);
  }
  addNewLine({ lineName, startStationName, endStationName }) {
    const newLine = {
      name: lineName,
      stationsOfLine: [startStationName, endStationName],
    };
    const startStation = this.getOneStationINFOByName(startStationName);
    const endStation = this.getOneStationINFOByName(endStationName);
    this.lines_.push(newLine);
    startStation.linesOfStation.add(lineName);
    endStation.linesOfStation.add(lineName);
    this.saveAllToLocalStorage_();
  }
  registerStationToLine(lineName, orderToRegister, stationName) {
    const targetLine = this.getOneLineByCondition((line) => {
      return line.name === lineName;
    });
    const targetStation = this.getOneStationINFOByName(stationName);
    targetLine.stationsOfLine.splice(orderToRegister, 0, stationName);
    targetStation.linesOfStation.add(lineName);
    this.saveAllToLocalStorage_();
  }
  deleteStation(nameToDelete) {
    const stationIndexToDelete = this.stations_.findIndex(({ name }) => {
      return nameToDelete === name;
    });
    if (
      this.stations_[stationIndexToDelete].linesOfStation.size >
      MAXIMUM_NUMBER_LINES_OF_STATION_TO_DELETE_STATION
    ) {
      alert(STATION_INCLUDE_IN_LINE_ERROR_MESSAGE);
      return;
    }
    this.stations_.splice(stationIndexToDelete, 1);
    this.saveAllToLocalStorage_();
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
    this.saveAllToLocalStorage_();
  }
  deleteSection(targetStationName, targetLineName) {
    const targetLine = this.getOneLineByCondition((line) => {
      return line.name === targetLineName;
    });
    if (targetLine.stationsOfLine.length <= MINIMUM_NUMBER_STATIONS_OF_LINE) {
      alert(NOT_MINIMUM_NUMBER_STATIONS_OF_LINE_ERROR_MESSAGE);
      return;
    }
    this.deleteLineInStation_(targetStationName, targetLineName);
    this.deleteStationInLine_(targetStationName, targetLineName);
    this.saveAllToLocalStorage_();
  }
  getStationsNames() {
    const stationNames = [];
    this.stations_.forEach(({ name }) => {
      stationNames.push(name);
    });
    return stationNames;
  }
  getOneStationINFOByCondition(condition) {
    for (let station of this.stations_) {
      if (condition(station)) {
        return station;
      }
    }
    return -1;
  }
  getOneStationINFOByName(name) {
    for (let station of this.stations_) {
      if (station.name === name) {
        return station;
      }
    }
    return -1;
  }
  getStationNamesByCondition(condition) {
    const returnStations = [];
    this.stations_.forEach((station) => {
      if (condition(station)) {
        returnStations.push(station.name);
      }
    });
    return returnStations;
  }
  getLines() {
    const linesINFOs = [];
    this.lines_.forEach(({ name, stationsOfLine }) => {
      linesINFOs.push({
        name: name,
        stationsOfLine: stationsOfLine,
      });
    });
    return linesINFOs;
  }
  getOneLineByName(name) {
    for (let line of this.lines_) {
      if (line.name === name) {
        return line;
      }
    }
    return -1;
  }
  getOneLineByCondition(condition) {
    for (let line of this.lines_) {
      if (condition(line)) {
        return line;
      }
    }
    return -1;
  }
  getAllLineByCondition(condition) {
    const returnlines = [];
    this.lines_.forEach((line) => {
      if (condition(line)) {
        returnlines.push(line);
      }
    });
    return returnlines;
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

  //private
  loadAllFromLocalStorage_() {
    const stations = JSON.parse(localStorage.getItem("stations"));
    const lines = JSON.parse(localStorage.getItem("lines"));
    stations.forEach((station) => {
      station.linesOfStation = new Set(station.linesOfStation);
    });
    this.stations_ = stations;
    this.lines_ = lines;
    console.log(stations);
    console.log(lines);
  }
  saveAllToLocalStorage_() {
    const jsonStations = JSON.stringify(this.stations_, this._replacer);
    const jsonLines = JSON.stringify(this.lines_);

    localStorage.setItem("stations", jsonStations);
    localStorage.setItem("lines", jsonLines);
  }
  _replacer(key, value) {
    if (value.__proto__.constructor.name === "Set") {
      return Array.from(value);
    }
    return value;
  }
  isNotOverlapName_(targetToFindOverlap, inputName) {
    const overlapIndex = targetToFindOverlap.findIndex(
      ({ name }) => name === inputName
    );
    return overlapIndex === -1;
  }
  deleteLineInStation_(targetStationName, targetLineName) {
    const targetStation = this.getOneStationINFOByCondition((station) => {
      return station.name === targetStationName;
    });
    targetStation.linesOfStation.delete(targetLineName);
  }
  deleteStationInLine_(targetStationName, targetLineName) {
    const targetLine = this.getOneLineByName(targetLineName);
    const targetStationIndex = targetLine.stationsOfLine.findIndex(
      (stationName) => {
        return stationName === targetStationName;
      }
    );
    targetLine.stationsOfLine.splice(targetStationIndex, 1);
  }
  deleteLineINFOInAllStations_(lineToDelete) {
    const { name, stationsOfLine } = lineToDelete;
    stationsOfLine.forEach((stationName) => {
      const targetStation = this.getOneStationINFOByName(stationName);
      targetStation.linesOfStation.delete(name);
    });
  }
}

const OVERLAP_STATION_ERROR_MESSAGE = "기존 역 이름과 중복되는 이름입니다.";
const OVERLAP_LINE_ERROR_MESSAGE = "기존 노선 이름과 중복되는 이름입니다.";

const MINIMUM_NUMBER_STATIONS_OF_LINE = 2;
const NOT_MINIMUM_NUMBER_STATIONS_OF_LINE_ERROR_MESSAGE = `노선에는 최소 ${MINIMUM_NUMBER_STATIONS_OF_LINE}개의 역이 포함되어 있어야합니다.`;
const MAXIMUM_NUMBER_LINES_OF_STATION_TO_DELETE_STATION = 0;
const STATION_INCLUDE_IN_LINE_ERROR_MESSAGE = `${MAXIMUM_NUMBER_LINES_OF_STATION_TO_DELETE_STATION + 1}개 이상의 노선에 포함되어 있는 역은 삭제할 수 없습니다.`;
