export default class SubwayLine {
  constructor(name, startStation, endStation) {
    this.name = name;
    this.line = [startStation, endStation];
  }

  // 노선에 역 추가. index를 지정하지 않으면 하행 종점 앞에 추가됨
  addStation(station, index = -1) {
    this.line.splice(index, 0, station);
  }

  // 노선에서 역 제거
  removeStation(station) {
    let index = this.line.indexOf(station);
    if (this.line <= 2 || index === -1) {
      return false;
    }
    this.line.splice(index, 1);
    return true;
  }

  // 구간 조회
  getLine() {
    return this.line.map(element => element.name);
  }
}
