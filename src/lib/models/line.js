export default class Line {
  constructor(lineName, startStation, endStation) {
    this.lineName = lineName;
    this.startStation = startStation;
    this.endStation = endStation;
    this.stations = [];
  }

  getLineData() {
    return {
      lineName: this.lineName,
      stations: this.stations,
    };
  }

  // 구간 관리할 부분(삽입, 삭제)
  updateLineInfo() {
    this.stations.push(this.endStation);
    this.stations.unshift(this.startStation);
  }
}

// selector에다가 해당되는 노선 이름 찾고 배열 조작 후 reducer로 보내기!
// 노선 추가 후 disable된 input은 값 초기화 시키고 다시 활성화시키기
