export default class StationINFOManager {
  constructor() {
    this.stations_ = [];
  }

  addNewStation({ name }) {
    const newStation = {
      name: name,
      lineNumber: null,
    };
    if (this.isOverlapName_(name)) {
      alert(OVERLAP_ERROR_MESSAGE);
      return;
    }
    this.stations_.push(newStation);
  }
  getStationsNames() {
    let stationNames = [];
    this.stations_.forEach(({ name }) => {
      stationNames.push(name);
    });
    return stationNames;
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

  isOverlapName_(inputName) {
    const overlapIndex = this.stations_.findIndex(
      ({ name }) => name === inputName
    );
    return overlapIndex !== -1;
  }
}

const OVERLAP_ERROR_MESSAGE = "기본 역 이름과 중복되는 이름입니다.";
const NOT_EXIST_NAME_ERROR_MESSAGE = "제거할 역이 이미 존재하지 않습니다.";
