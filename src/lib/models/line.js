export default class Line {
  constructor(lineName) {
    this.lineName = lineName;
    this.stations = [];
  }

  // 시작 역이 이미 기점이면 추가가 안 된다.
  addStartStation(stationName) {
    this.stations.unshift(stationName);
  }

  // 마지막 역이 이미 종점이면 추가가 안 된다.
  addEndStation(stationName) {
    this.stations.push(stationName);
  }

  // 구간 관리할 부분(삽입, 삭제)
}

//selector에다가 해당되는 노선 이름 찾고 배열 조작 후 reducer로 보내기!