export default class SubwayLine {
  constructor(name, upTerminus, downTerminus) {
    this.name = name;
    this.line = [upTerminus, downTerminus];
  }

  // 노선에 역 추가. index를 지정하지 않으면 하행 종점 앞에 추가됨
  addStation(station, index = -1) {
    this.line.splice(index, 0, station);
  }
}
