export default class Line {
  constructor(name) {
    this.name = name;
    this.stationList = [];
  }

  displayLine(stationAll) {
    // 1호선 관리
    // 구간 등록
    // stationAll 중에 순서 선택 등록
  }

  addStation(station, order) {
    this.stationList.arr.splice(order, 0, station);
  }

  deleteStation(station) {
    let index = this.stationList.indexOf(station);
    this.stationList.arr.splice(index, 1);
  }
}
