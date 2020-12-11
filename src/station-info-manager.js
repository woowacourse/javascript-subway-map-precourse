export default class StationINFOManager {
  constructor() {
    this.stations_ = [];
  }

  addNewStation({ name }) {
    const newStation = {
      name: name,
      lineNumber: null,
    };
    if (this.isOverlapName(name)) {
      alert(OVERLAP_ERROR_MESSAGE);
      return;
    }
    this.stations_.push(newStation);
  }

  isOverlapName(inputName) {
    const overlapIndex = this.stations_.findIndex(
      ({ name }) => name === inputName
    );
    return overlapIndex !== -1;
  }
  getStationsNames() {
    let stationNames = [];
    this.stations_.forEach(({ name }) => {
      stationNames.push(name);
    });
    return stationNames;
  }
}

const OVERLAP_ERROR_MESSAGE = "기본 역 이름과 중복되는 이름입니다.";