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
const stationNameInput = document.getElementById('station-name-input');
const stationAddButton = document.getElementById('station-add-button');
const stationResult = document.getElementById('station-result');
const lineNameInput = document.getElementById('line-name-input');
const lineStartStationSelector = document.getElementById('line-start-station-selector');
const lineEndStationSelector = document.getElementById('line-end-station-selector');
const lineAddButton = document.getElementById('line-add-button');
const lineResult = document.getElementById('line-result');

const subwayMap = new SubwayMap();

stationManagerButton.addEventListener('click', showStationManager);
lineManagerButton.addEventListener('click', showLineManager);
sectionManagerButton.addEventListener('click', showSectionManager);
mapPrintManagerButton.addEventListener('click', showMapPrintManager);
stationAddButton.addEventListener('click', clickStationAddButton);

// 역 관리 탭
function showStationManager() {
  "use strict";

  changeTab(station);
  stationNameInput.value = '';
  showStationList();
}

// 노선 관리 탭
function showLineManager() {
  "use strict";

  changeTab(line);
  lineNameInput.value = '';
  showStationSelect();
  showLineList();
}

// 구간 관리 탭
function showSectionManager() {
  "use strict";

  changeTab(section);
}

// 지하철 노선도 출력 탭
function showMapPrintManager() {
  "use strict";

  changeTab(mapPrint);
}

// 탭 교체
function changeTab(dom) {
  "use strict";

  station.classList.add('d-none');
  line.classList.add('d-none');
  section.classList.add('d-none');
  mapPrint.classList.add('d-none');
  dom.classList.remove('d-none');
}

// 지하철 역 목록 출력
function showStationList() {
  "use strict";

  const stationList = subwayMap.getStationList();
  const stationDeleteButtonHTML = '<button class="station-delete-button">삭제</button>';

  let html = '';
  for (const station of stationList) {
    html += `<tr><td>${station}</td><td>${stationDeleteButtonHTML}</td></tr>`;
  }
  stationResult.innerHTML = html;
}

// 역 추가 버튼
function clickStationAddButton() {
  "use strict";

  if (!subwayMap.addStation(stationNameInput.value)) {
    alert('다른 역과 중복되지 않은 이름을 2자 이상으로 입력해주세요.');
    return;
  }
  stationNameInput.value = '';
  showStationList();
}

// 지하철 역 select 출력
function showStationSelect() {
  "use strict";

  const stationList = subwayMap.getStationList();

  let html = '';
  for (const station of stationList) {
    html += `<option value="${station}">${station}</option>`;
  }
  lineStartStationSelector.innerHTML = html;
  lineEndStationSelector.innerHTML = html;
}

// 지하철 노선 목록 출력
function showLineList() {
  "use strict";

  const lineList = subwayMap.getLineList();
  const lineDeleteButtonHTML = '<button class="line-delete-button">삭제</button>';

  let html = '';
  for (const line of lineList) {
    html += `<tr><td>${line}</td><td>${lineDeleteButtonHTML}</td></tr>`;
  }
  lineResult.innerHTML = html;
}
