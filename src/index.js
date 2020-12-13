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
  delStation(name) {
    let index = this.stationList.findIndex(element => element.name === name);
    if (index === -1 || this.stationList[index].semaphore !== 0) {
      return false;
    }
    this.stationList.splice(index, 1);
    return true;
  }

  // 지하철 노선 조회
  getLineList() {
    return this.lineList.map(element => [element.name, element.getLine()]);
  }

  // 지하철 노선 등록
  addLine(name, startStationName, endStationName) {
    if (name.length <= 0 || this.lineList.find(element => element.name === name) !== undefined) {
      return false;
    }
    const startStation = this.stationList.find(element => element.name === startStationName);
    const endStation = this.stationList.find(element => element.name === endStationName);
    startStation.semaphore++;
    endStation.semaphore++;
    let line = new SubwayLine(name, startStation, endStation);
    this.lineList.push(line);
    return true;
  }

  // 지하철 노선 삭제
  delLine(name) {
    let index = this.lineList.findIndex(element => element.name === name);
    if (index === -1) {
      return false;
    }
    this.lineList.splice(index, 1);
    return true;
  }

  // 데이터 직렬화
  serialize() {
    const data = {
      station: this.getStationList(),
      line: this.getLineList()
    };
    return JSON.stringify(data);
  }

  // 데이터 역직렬화
  deserialize(json) {
    const data = JSON.parse(json);
    this.stationList = [];
    this.lineList = [];
    for (const station of data.station) {
      this.addStation(station);
    }
    for (const line of data.line) {
      const endIndex = line[1].length - 1;
      this.addLine(line[0], line[1][0], line[1][endIndex]);
      const lineObj = this.lineList.find(element => element.name === line[0]);
      for (let i = 1; i < endIndex; i++) {
        const station = this.stationList.find(element => element.name === line[1][i]);
        lineObj.addStation(station);
      }
    }
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
const sectionList = document.getElementById('section-list');
const sectionDiv = document.getElementById('section-div');
const sectionName = document.getElementById('section-name');
const sectionStationSelector = document.getElementById('section-station-selector');
const sectionOrderInput = document.getElementById('section-order-input');
const sectionAddButton = document.getElementById('section-add-button');
const sectionResult = document.getElementById('section-result');

const subwayMap = new SubwayMap();
if (localStorage.getItem('subwayMap') !== null) {
  subwayMap.deserialize(localStorage.getItem('subwayMap'));
}

stationManagerButton.addEventListener('click', showStationManager);
lineManagerButton.addEventListener('click', showLineManager);
sectionManagerButton.addEventListener('click', showSectionManager);
mapPrintManagerButton.addEventListener('click', showMapPrintManager);
stationAddButton.addEventListener('click', clickStationAddButton);
lineAddButton.addEventListener('click', clickLineAddButton);
document.body.addEventListener('click', clickInstanceButton);

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
  showLineButton();
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

  let html = '';
  for (const station of stationList) {
    const stationDeleteButtonHTML = `<button class="station-delete-button" data-station="${station}">삭제</button>`;
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
  localStorage.setItem('subwayMap', subwayMap.serialize());
}

// 역 삭제 버튼
function clickStationDelButton(event) {
  "use strict";

  if (!subwayMap.delStation(event.target.dataset.station)) {
    alert('노선에 등록된 역은 삭제할 수 없습니다.');
    return;
  }
  showStationList();
  localStorage.setItem('subwayMap', subwayMap.serialize());
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
    const endIndex = line[1].length - 1;
    html += `<tr><td>${line[0]}</td><td>${line[1][0]}</td><td>${line[1][endIndex]}</td><td>${lineDeleteButtonHTML}</td></tr>`;
  }
  lineResult.innerHTML = html;
}

// 노선 추가 버튼
function clickLineAddButton() {
  "use strict";

  if (!subwayMap.addLine(lineNameInput.value, lineStartStationSelector.value, lineEndStationSelector.value)) {
    alert('다른 노선과 중복되지 않은 이름으로 입력해주세요.');
    return;
  }
  lineNameInput.value = '';
  showLineList();
  localStorage.setItem('subwayMap', subwayMap.serialize());
}

// 지하철 노선 button 출력
function showLineButton() {
  "use strict";

  const lineList = subwayMap.getLineList();

  let html = '';
  for (const line of lineList) {
    html += `<button class="section-line-menu-button">${line[0]}</option> `;
  }
  sectionList.innerHTML = html;
}

function clickInstanceButton(event) {
  "use strict";

  if (event.target.tagName.toLowerCase() !== 'button') {
    return;
  }
  if (event.target.classList.contains('station-delete-button')) {
    clickStationDelButton(event);
  }
}
