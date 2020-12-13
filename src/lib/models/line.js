export default class Line {
  constructor(lineName) {
    this.lineName = lineName;
    this.startStation = null;
    this.endStation = null;
    this.stations = [];
  }

  getLineData() {
    return {
      lineName: this.lineName,
      stations: this.stations,
    };
  }

  // 시작 역이 이미 기점이면 추가가 안 된다. (유효성 체크 추가)
  addStartStation(stationName) {
    this.startStation = stationName;
    this.stations.unshift(stationName);
  }

  // 마지막 역이 이미 종점이면 추가가 안 된다.
  addEndStation(stationName) {
    this.endStation = stationName;
    this.stations.push(stationName);
  }

  // 구간 관리할 부분(삽입, 삭제)
}

// selector에다가 해당되는 노선 이름 찾고 배열 조작 후 reducer로 보내기!
// 노선 추가 후 disable된 input은 값 초기화 시키고 다시 활성화시키기
