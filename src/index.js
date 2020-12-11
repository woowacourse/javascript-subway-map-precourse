import SubwayLine from './line.js';
import { DOMs, DOMCtrl } from './doms.js';
import { isValidStationName, isValidLineName } from './valid.js';

export default class SubwayManager {
  constructor() {
    this.stations = JSON.parse(localStorage.getItem('stations')) || [];
    this.lines = JSON.parse(localStorage.getItem('lines')) || [];

    this.setEventListeners();
  }

  setEventListeners() {
    DOMs.stationManagerButton.addEventListener('click', this.openStationManager.bind(this));
    DOMs.lineManagerButton.addEventListener('click', this.openLineManager.bind(this));
    DOMs.sectionManagerButton.addEventListener('click', this.openSectionManager);
    DOMs.mapPrintManagerButton.addEventListener('click', this.openMapPrintManager);
    DOMs.managerContainer.addEventListener('click', this.addStation.bind(this));
    DOMs.managerContainer.addEventListener('click', this.deleteStation.bind(this));
    DOMs.managerContainer.addEventListener('click', this.addLine.bind(this));
    DOMs.managerContainer.addEventListener('click', this.deleteLine.bind(this));
  }

  openStationManager() {
    const stationManager = `
      <div id="station-manager"><br><span>역 이름</span><br><input type="text" 
      id="station-name-input" placeholder="역 이름을 입력해주세요."/>
      <button id="station-add-button">역 추가</button><h1>🚉 지하철 역 목록</h1>
      <table id="station-list"><tr><th><b>역 이름</b></th><th><b>설정</b></th></tr>
        ${this.stations
          .map(
            station =>
              `<tr><td>${station}</td><td><button class="station-delete-button" 
              data-station="${station}">삭제</button></td></tr>`
          )
          .join('')}</table></div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.managerContainer.innerHTML = stationManager;
  }

  openLineManager() {
    const lineManager = `
      <div id="line-manager"><br><span>노선 이름</span><br>
      <input type="text" id="line-name-input" placeholder="노선 이름을 입력해주세요." />
      <br><br><span>상행 종점<select id="line-start-station-selector">
        ${this.stations.map(station => `<option>${station}</option>`).join('')}
      </select></span><br><span>하행 종점<select id="line-end-station-selector">
        ${this.stations.map(station => `<option>${station}</option>`).join('')}
      </select></span><br><br><button id="line-add-button">노선 추가</button>
      <h1>🚉 지하철 노선 목록</h1><table id="line-list"><tr><th><b>노선 이름</b></th>
      <th><b>상행 종점역</b></th><th><b>하행 종점역</b></th><th><b>설정</b></th></tr>
      ${this.lines
        .map(
          line =>
            `<tr><td>${line.lineName}</td><td>${line.start.stationName}</td>
          <td>${line.end.stationName}</td><td><button class="line-delete-button" 
          data-line="${line.lineName}">삭제</button></td></tr>`
        )
        .join('')}</table></div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.managerContainer.innerHTML = lineManager;
  }

  openSectionManager() {
    const sectionManager = `
      <div id="section-manager">
        <h2>구간을 수정할 노선을 선택해주세요.</h2>
        <!--
          <button class="section-line-menu-button">1호선</button>
          <button class="section-line-menu-button">2호선</button>
          <button class="section-line-menu-button">3호선</button>
        -->
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.managerContainer.innerHTML = sectionManager;
  }

  openMapPrintManager() {
    const mapPrintManager = `
      <div id="map-print-manager"></div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.managerContainer.innerHTML = mapPrintManager;
  }

  addStation(event) {
    const {
      target: { id },
    } = event;
    if (id === 'station-add-button') {
      const station = document.getElementById('station-name-input').value;
      if (isValidStationName(this.stations, station)) {
        this.stations.push(station);
        localStorage.setItem('stations', JSON.stringify(this.stations));
        this.openStationManager();
      }
    }
  }

  deleteStation(event) {
    // 노선에 등록된 역은 삭제할 수 없음(구현 예정)
    const {
      target: { className },
    } = event;
    if (className === 'station-delete-button') {
      const targetStationName = event.target.dataset['station'];
      const index = this.stations.indexOf(targetStationName);
      this.stations.splice(index, 1);
      localStorage.setItem('stations', JSON.stringify(this.stations));
      this.openStationManager();
    }
  }

  addLine(event) {
    const {
      target: { id },
    } = event;
    if (id === 'line-add-button') {
      const lineName = document.getElementById('line-name-input').value;
      if (isValidLineName(this.lines, lineName)) {
        const startStation = document.getElementById('line-start-station-selector').value;
        const endStation = document.getElementById('line-end-station-selector').value;
        this.lines.push(new SubwayLine(lineName, startStation, endStation));
        localStorage.setItem('lines', JSON.stringify(this.lines));
        this.openLineManager();
      }
    }
  }

  deleteLine(event) {
    const {
      target: { className },
    } = event;
    if (className === 'line-delete-button') {
      const targetLineName = event.target.dataset['line'];
      const index = this.lines.findIndex(line => line.lineName === targetLineName);
      this.lines.splice(index, 1);
      localStorage.setItem('lines', JSON.stringify(this.lines));
      this.openLineManager();
    }
  }
}

new SubwayManager();
