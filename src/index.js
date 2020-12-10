export default class SubwayManager {
  constructor() {
    this.setEventListeners();
  }

  setEventListeners() {
    const stationManagerButton = document.getElementById('station-manager-button');
    stationManagerButton.addEventListener('click', this.openStationManager);
    const lineManagerButton = document.getElementById('line-manager-button');
    lineManagerButton.addEventListener('click', this.openLineManager);
    const sectionManagerButton = document.getElementById('section-manager-button');
    sectionManagerButton.addEventListener('click', this.openSectionManager);
    const mapPrintManagerButton = document.getElementById('map-print-manager-button');
    mapPrintManagerButton.addEventListener('click', this.openMapPrintManager);
  }

  openStationManager() {
    const managerContainer = document.getElementById('manager-container');
    const stationManager = `
      <div id="station-manager">
        <p>역 이름</p>
        <input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요."/>
        <button id="station-add-button">역 추가</button>
        <h1>🚉지하철 역 목록</h1>
        <table id="station-list"></table>
      </div>
    `;
    managerContainer.innerHTML = '';
    managerContainer.innerHTML = stationManager;
  }

  openLineManager() {
    const managerContainer = document.getElementById('manager-container');
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
    managerContainer.innerHTML = '';
    managerContainer.innerHTML = lineManager;
  }

  openSectionManager() {
    const managerContainer = document.getElementById('manager-container');
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
    managerContainer.innerHTML = '';
    managerContainer.innerHTML = sectionManager;
  }

  openMapPrintManager() {
    const managerContainer = document.getElementById('manager-container');
    const mapPrintManager = `
      <div id="map-print-manager"></div>
    `;
    managerContainer.innerHTML = '';
    managerContainer.innerHTML = mapPrintManager;
  }
}

new SubwayManager();
