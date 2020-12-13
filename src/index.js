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
    const station = new SubwayStation(name);
    this.stationList.push(station);
    return true;
  }

  // 지하철 역 삭제
  delStation(name) {
    const index = this.stationList.findIndex(element => element.name === name);
    if (index === -1 || this.stationList[index].semaphore !== 0) {
      return false;
    }
    this.stationList.splice(index, 1);
    return true;
  }

  // 지하철 노선 조회
  getLineList() {
    return this.lineList.map(element => [element.name, element.getSection()]);
  }

  // 지하철 노선 등록
  addLine(name, startStationName, endStationName) {
    if (name.length <= 0 || this.lineList.find(element => element.name === name) !== undefined) {
      return false;
    }
    if (startStationName === endStationName) {
      return false;
    }
    const startStation = this.stationList.find(element => element.name === startStationName);
    const endStation = this.stationList.find(element => element.name === endStationName);
    startStation.semaphore++;
    endStation.semaphore++;
    const line = new SubwayLine(name, startStation, endStation);
    this.lineList.push(line);
    return true;
  }

  // 지하철 노선 삭제
  delLine(name) {
    const index = this.lineList.findIndex(element => element.name === name);
    if (index === -1) {
      return false;
    }
    const stationList = this.lineList[index].section;
    for (const station of stationList) {
      station.semaphore--;
    }
    this.lineList.splice(index, 1);
    return true;
  }

  // 지하철 노선 구간 조회
  getSection(lineName) {
    const line = this.lineList.find(element => element.name === lineName);
    return line.getSection();
  }

  // 지하철 구간 등록
  addSection(lineName, stationName, index) {
    const line = this.lineList.find(element => element.name === lineName);
    const station = this.stationList.find(element => element.name === stationName);
    if (index === undefined) {
      return line.addStation(station);
    } else {
      return line.addStation(station, index);
    }
  }

  // 지하철 구간 제거
  delSection(lineName, index) {
    const line = this.lineList.find(element => element.name === lineName);
    return line.delStation(index);
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
      for (let i = 1; i < endIndex; i++) {
        this.addSection(line[0], line[1][i]);
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
sectionAddButton.addEventListener('click', clickSectionAddButton);
document.body.addEventListener('click', clickInstanceButton);

// 역 관리 탭
function showStationManager() {
  "use strict";

  stationNameInput.value = '';
  showStationList();
  changeTab(station);
}

// 노선 관리 탭
function showLineManager() {
  "use strict";

  lineNameInput.value = '';
  showStationSelect();
  showLineList();
  changeTab(line);
}

// 구간 관리 탭
function showSectionManager() {
  "use strict";

  showLineButton();
  sectionDiv.classList.add('d-none');
  changeTab(section);
}

// 지하철 노선도 출력 탭
function showMapPrintManager() {
  "use strict";

  showMapPrint();
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
    const button = `<button class="station-delete-button" data-station="${station}">삭제</button>`;
    html += `<tr><td>${station}</td><td>${button}</td></tr>`;
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

  if (!confirm('정말로 삭제하시겠습니까?')) {
    return;
  }
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
  let html = '';
  for (const line of lineList) {
    const endIndex = line[1].length - 1;
    const button = `<button class="line-delete-button" data-line="${line[0]}">삭제</button>`;
    html += `<tr><td>${line[0]}</td><td>${line[1][0]}</td><td>${line[1][endIndex]}</td><td>${button}</td></tr>`;
  }
  lineResult.innerHTML = html;
}

// 노선 추가 버튼
function clickLineAddButton() {
  "use strict";

  if (!subwayMap.addLine(lineNameInput.value, lineStartStationSelector.value, lineEndStationSelector.value)) {
    alert('중복 역 없이 다른 노선과 중복되지 않은 이름으로 입력해주세요.');
    return;
  }
  lineNameInput.value = '';
  showLineList();
  localStorage.setItem('subwayMap', subwayMap.serialize());
}

// 노선 삭제 버튼
function clickLineDelButton(event) {
  "use strict";

  if (!confirm('정말로 삭제하시겠습니까?')) {
    return;
  }
  subwayMap.delLine(event.target.dataset.line);
  showLineList();
  localStorage.setItem('subwayMap', subwayMap.serialize());
}

// 지하철 노선 button 출력
function showLineButton() {
  "use strict";

  const lineList = subwayMap.getLineList();
  let html = '';
  for (const line of lineList) {
    html += `<button class="section-line-menu-button" data-line="${line[0]}">${line[0]}</button> `;
  }
  sectionList.innerHTML = html;
}

// 구간을 수정할 노선 버튼
function clickLineSectionButton(event) {
  "use strict";

  const line = event.target.dataset.line;
  sectionName.textContent = `${line} 관리`;
  const stationList = subwayMap.getStationList();
  let html = '';
  for (const station of stationList) {
    html += `<option value="${station}">${station}</option>`;
  }
  sectionStationSelector.innerHTML = html;
  sectionOrderInput.value = '';
  sectionAddButton.dataset.line = line;
  showSectionList(line);
  sectionDiv.classList.remove('d-none');
}

// 노선 역 목록 출력
function showSectionList(line) {
  "use strict";

  const stationList = subwayMap.getSection(line);
  sectionOrderInput.max = subwayMap.getSection(line).length;
  let html = '';
  for (let i = 0; i < stationList.length; i++) {
    const station = stationList[i];
    const button = `<button class="section-delete-button" data-line="${line}" data-index="${i}">노선에서 제거</button>`;
    html += `<tr><td class="text-center">${i}</td><td>${station}</td><td>${button}</td></tr>`;
  }
  sectionResult.innerHTML = html;
}

// 구간 등록 버튼
function clickSectionAddButton() {
  "use strict";

  if (Number.isNaN(parseInt(sectionOrderInput.value))) {
    alert('순서를 입력해주세요.');
    return;
  }
  const line = sectionAddButton.dataset.line;
  if (!subwayMap.addSection(line, sectionStationSelector.value, sectionOrderInput.value)) {
    alert('이미 등록된 역입니다.');
    return;
  }
  sectionOrderInput.value = '';
  showSectionList(line);
  localStorage.setItem('subwayMap', subwayMap.serialize());
}

// 노선에서 제거 버튼
function clickSectionDelButton(event) {
  "use strict";

  if (!confirm('정말로 노선에서 제거하시겠습니까?')) {
    return;
  }
  const line = event.target.dataset.line;
  if (!subwayMap.delSection(line, event.target.dataset.index)) {
    alert('노선에 역이 두개 이하일 때는 제거할 수 없습니다.');
    return;
  }
  showSectionList(line);
  localStorage.setItem('subwayMap', subwayMap.serialize());
}

// 지하철 노선도 출력
function showMapPrint() {
  "use strict";

  const lineList = subwayMap.getLineList();
  let html = '<div class="map">';
  for (const line of lineList) {
    html += `<h3>${line[0]}</h3><ul>`;
    for (const station of line[1]) {
      html += `<li>${station}</li>`;
    }
    html += '</ul>';
  }
  html += '</div>';
  mapPrint.innerHTML = html;
}

// 동적으로 생성된 버튼
function clickInstanceButton(event) {
  "use strict";

  if (event.target.tagName.toLowerCase() !== 'button') {
    return;
  }
  if (event.target.classList.contains('station-delete-button')) {
    clickStationDelButton(event);
  } else if (event.target.classList.contains('line-delete-button')) {
    clickLineDelButton(event);
  } else if (event.target.classList.contains('section-line-menu-button')) {
    clickLineSectionButton(event);
  } else if (event.target.classList.contains('section-delete-button')) {
    clickSectionDelButton(event);
  }
}
