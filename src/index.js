import { DOMs, DOMCtrl } from './doms.js';
import { isValidStationName } from './valid.js';

export default class SubwayManager {
  constructor() {
    this.stations = [];

    this.setEventListeners();
    this.loadData();
  }

  setEventListeners() {
    DOMs.stationManagerButton.addEventListener('click', this.openStationManager.bind(this));
    DOMs.lineManagerButton.addEventListener('click', this.openLineManager);
    DOMs.sectionManagerButton.addEventListener('click', this.openSectionManager);
    DOMs.mapPrintManagerButton.addEventListener('click', this.openMapPrintManager);
    DOMs.managerContainer.addEventListener('click', this.addStation.bind(this));
    DOMs.managerContainer.addEventListener('click', this.deleteStation.bind(this));
  }

  loadData() {
    this.stations = JSON.parse(localStorage.getItem('stations')) || [];
  }

  openStationManager() {
    const stationManager = `
      <div id="station-manager">
        <br><span>역 이름</span><br>
        <input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요."/>
        <button id="station-add-button">역 추가</button>
        <h1>🚉 지하철 역 목록</h1>
        <table id="station-list">
          <tr>
            <th><b>역 이름</b></th>
            <th><b>설정</b></th>
          </tr>
          ${this.stations
            .map(station => {
              return `<tr><td>${station}</td><td><button class="station-delete-button" data-station="${station}">삭제</button></td></tr>`;
            })
            .join('')}
        </table>
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.managerContainer.innerHTML = stationManager;
  }

  openLineManager() {
    const lineManager = `
      <div id="line-manager">
        <p>노선 이름</p>
        <input type="text" id="line-name-input" placeholder="노선 이름을 입력해주세요." />
        <p>상행 종점
          <select id="line-start-station-selector"></select>
        </p>
          <!-- 추가된 역 목록 -->
        <p>하행 종점
          <select id="line-end-station-selector"></select>
        </p>
          <!-- 추가된 역 목록 -->
        <br>
        <button id="line-add-button">노선 추가</button>
        <h1>🚉 지하철 노선 목록</h1>
        <table id="line-list"></table>
      </div>
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
    const {
      target: { className },
    } = event;
    if (className === 'station-delete-button') {
      const stationName = event.target.dataset['station'];
      const index = this.stations.indexOf(stationName);
      this.stations.splice(index, 1);
      localStorage.setItem('stations', JSON.stringify(this.stations));
      this.openStationManager();
    }
  }
}

new SubwayManager();
