import Station from './station.js';

export default class SubwayMap {
  constructor() {
    this.stationList = [];
  }

  // 지하철 역 등록
  addStation(name) {
    if (name.length < 2 || this.stationList.find(element => element.name === name) !== undefined) {
      return null;
    }
    let station = new Station(name);
    this.stationList.push(station);
    return station;
  }

  // 지하철 역 삭제
  removeStation(name) {
    let index = this.stationList.findIndex(element => element.name === name);
    if (index === -1 || this.stationList[index].line.length !== 0) {
      return false;
    }
    this.stationList.splice(index, 1);
    return true;
  }
}
