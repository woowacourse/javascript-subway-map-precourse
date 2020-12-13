import SubwayStation from './subway_station.js';
import SubwayLine from './subway_line.js';

export default class SubwayMap {
  constructor() {
    this.stationList = [];
    this.lineList = [];
  }

  // 지하철 역 조회
  getStationList() {
    return this.stationList.map(element => element.name);
  }

  // 지하철 역 등록
  addStation(name) {
    if (name.length < 2 || this.stationList.find(element => element.name === name) !== undefined) {
      return false;
    }
    let station = new SubwayStation(name);
    this.stationList.push(station);
    return true;
  }

  // 지하철 역 삭제
  removeStation(name) {
    let index = this.stationList.findIndex(element => element.name === name);
    if (index === -1 || this.stationList[index].semaphore !== 0) {
      return false;
    }
    this.stationList.splice(index, 1);
    return true;
  }

  // 지하철 노선 조회
  getLineList() {
    return this.lineList.map(element => element.name);
  }

  // 지하철 노선 등록
  addLine(name, upTerminus, downTerminus) {
    if (name.length <= 0 || this.lineList.find(element => element.name === name) !== undefined) {
      return false;
    }
    let line = new SubwayLine(name, upTerminus, downTerminus);
    this.lineList.push(line);
    return true;
  }

  // 지하철 노선 삭제
  removeLine(name) {
    let index = this.lineList.findIndex(element => element.name === name);
    if (index === -1) {
      return false;
    }
    this.lineList.splice(index, 1);
    return true;
  }
}

const stationManagerButton = document.getElementById('station-manager-button');
const lineManagerButton = document.getElementById('line-manager-button');
const sectionManagerButton = document.getElementById('section-manager-button');
const mapPrintManagerButton = document.getElementById('map-print-manager-button');
const station = document.getElementById('station');
const line = document.getElementById('line');
const section = document.getElementById('section');
const mapPrint = document.getElementById('map-print');

stationManagerButton.addEventListener('click', showStationManager);
lineManagerButton.addEventListener('click', showLineManager);
sectionManagerButton.addEventListener('click', showSectionManager);
mapPrintManagerButton.addEventListener('click', showMapPrintManager);

// 역 관리 탭
function showStationManager() {
  "use strict";

  station.classList.remove('d-none');
  line.classList.add('d-none');
  section.classList.add('d-none');
  mapPrint.classList.add('d-none');
}

// 노선 관리 탭
function showLineManager() {
  "use strict";

  station.classList.add('d-none');
  line.classList.remove('d-none');
  section.classList.add('d-none');
  mapPrint.classList.add('d-none');
}

// 구간 관리 탭
function showSectionManager() {
  "use strict";

  station.classList.add('d-none');
  line.classList.add('d-none');
  section.classList.remove('d-none');
  mapPrint.classList.add('d-none');
}

// 지하철 노선도 출력 탭
function showMapPrintManager() {
  "use strict";

  station.classList.add('d-none');
  line.classList.add('d-none');
  section.classList.add('d-none');
  mapPrint.classList.remove('d-none');
}
