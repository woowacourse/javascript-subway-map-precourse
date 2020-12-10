import { DOMs, DOMCtrl } from './doms.js';

export default class SubwayManager {
  constructor() {
    this.setEventListeners();
  }

  setEventListeners() {
    DOMs.stationManagerButton.addEventListener('click', this.openStationManager);
    DOMs.lineManagerButton.addEventListener('click', this.openLineManager);
    DOMs.sectionManagerButton.addEventListener('click', this.openSectionManager);
    DOMs.mapPrintManagerButton.addEventListener('click', this.openMapPrintManager);
  }

  openStationManager() {
    const stationManager = `
      <div id="station-manager">
        <p>역 이름</p>
        <input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요."/>
        <button id="station-add-button">역 추가</button>
        <h1>🚉지하철 역 목록</h1>
        <table id="station-list"></table>
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
        <h1>🚉지하철 노선 목록</h1>
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
}

new SubwayManager();
