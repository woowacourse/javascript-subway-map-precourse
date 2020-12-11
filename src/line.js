export default class SubwayLine {
  constructor(lineName, start, end) {
    this.lineName = lineName;
    this.start = new Station(start);
    this.end = new Station(end);

    this.start.next = this.end;
  }
  // 노선을 노드로 구성해서 상행 종점을 시작, 하행 종점을 끝으로 하는 연결리스트 만들면 될듯.
}

class Station {
  constructor(stationName) {
    this.stationName = stationName;
    this.next = null;
  }
}
