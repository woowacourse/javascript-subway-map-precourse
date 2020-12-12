class SubwayMap {
  constructor() {
    this.resetElements();
    this.setEventListener();
  }

  resetElements() {
    this.elements = {
      stationManagerButton: document.querySelector('#station-manager-button'),
      lineManagerButton: document.querySelector('#line-manager-button'),
      sectionManagerButton: document.querySelector('#section-manager-button'),
      mapPrintManagerButton: document.querySelector('#map-print-manager-button'),
      managerContainer: document.querySelector('#manager-container'),
    };
  }

  setEventListener() {
    this.elements.stationManagerButton.addEventListener('click', this.showStationManager.bind(this));
    this.elements.lineManagerButton.addEventListener('click', this.showLineManager.bind(this));
    this.elements.sectionManagerButton.addEventListener('click', this.showSectionManager.bind(this));
    this.elements.mapPrintManagerButton.addEventListener('click', this.showMapPrintManager.bind(this));
  }

  showStationManager() {
    this.elements.managerContainer.innerHTML = `
      <form id="station-form">
        <label for="station-name-input">역 이름</label>
        <br />
        <input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요" />
        <button id="station-add-button">역 추가</button>
      </form>
      <h2>🚉 지하철 역 목록</h2>
      <table id="station-list">
        <thead>
          <tr>
            <th>역 이름</th>
            <th>설정</th>
          </tr>
        </thead>
      </table>
    `;
  }

  showLineManager() {
    this.elements.managerContainer.innerHTML = `
      <form id="line-form">
        <label for="line-name-input">노선 이름</label>
        <br />
        <input type="text" id="line-name-input" placeholder="노선 이름을 입력해주세요"  />
        <p>
          <label for="line-start-station-selector">상행 종점</label>
          <select id="line-start-station-selector"></select>
          <br />
          <label for="line-end-station-selector">하행 종점</label>
          <select id="line-end-station-selector"></select>
        </p>
        <button id="line-add-button">노선 추가</button>
      </form>
      <h2>🚉 지하철 노선 목록</h2>
      <table id="line-list">
        <thead>
          <tr>
            <th>노선 이름</th>
            <th>상행 종점역</th>
            <th>하행 종점역</th>
            <th>설정</th>
          </tr>
        </thead>
      </table>
    `;
  }

  showSectionManager() {
    this.elements.managerContainer.innerHTML = `
      <h3>구간을 수정할 노선을 선택해주세요</h3>
    `;
  }

  showMapPrintManager() {
    this.elements.managerContainer.innerHTML = `
      <h2>지하철 노선도 출력</h2>
    `;
  }
}

new SubwayMap();
