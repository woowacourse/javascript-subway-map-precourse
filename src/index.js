import Station from './Station.js';

const MINIMUM_INPUT_LENGTH = 2;

class SubwayMap {
  constructor() {
    this.stationList = [];
    this.setMenuElements();
    this.setMenuEventListener();
  }

  setMenuElements() {
    this.elements = {
      stationManagerButton: document.querySelector('#station-manager-button'),
      lineManagerButton: document.querySelector('#line-manager-button'),
      sectionManagerButton: document.querySelector('#section-manager-button'),
      mapPrintManagerButton: document.querySelector('#map-print-manager-button'),
      managerContainer: document.querySelector('#manager-container'),
    };
  }

  setMenuEventListener() {
    this.elements.stationManagerButton.addEventListener('click', this.showStationManager.bind(this));
    this.elements.lineManagerButton.addEventListener('click', this.showLineManager.bind(this));
    this.elements.sectionManagerButton.addEventListener('click', this.showSectionManager.bind(this));
    this.elements.mapPrintManagerButton.addEventListener('click', this.showMapPrintManager.bind(this));
  }

  isExistStation(name) {
    return this.stationList.some((station) => station.name === name);
  }

  hasValidStationName(name) {
    if (name.length < MINIMUM_INPUT_LENGTH) {
      alert(`${MINIMUM_INPUT_LENGTH}글자 이상 입력해주세요`);
      return false;
    }

    if (this.isExistStation(name)) {
      alert(`이미 존재하는 역 이름입니다`);
      return false;
    }

    return true;
  }

  addStationListItemElement(station) {
    this.elements.stationListTableBody.innerHTML += `
      <tr data-name="${station.name}">
        <td>${station.name}</td>
        <td>
          <button class="station-delete-button" data-name="${station.name}">
            삭제
          </button>
        </td>
      </tr>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  deleteStationListItemElement(name) {
    const element = document.querySelector(`tr[data-name="${name}"]`);
    element.remove();
  }

  handleSubmitStationAdd(e) {
    e.preventDefault();

    const name = this.elements.stationNameInput.value;
    if (!this.hasValidStationName(name)) return;

    const station = new Station(name);
    this.stationList.push(station);
    this.addStationListItemElement(station);
    this.saveStationList();

    this.elements.stationNameInput.value = '';
  }

  handleClickStationDelete(e) {
    if (e.target.className !== 'station-delete-button') return;

    const { name } = e.target.dataset;
    const index = this.stationList.findIndex((station) => station.name === name);

    if (index >= 0) {
      this.stationList.splice(index, 1);
      this.deleteStationListItemElement(name);
      this.saveStationList();
    }
  }

  saveStationList() {
    localStorage.setItem('stationList', JSON.stringify(this.stationList));
  }

  loadStationList() {
    const stationListData = JSON.parse(localStorage.getItem('stationList'));
    if (stationListData) {
      this.stationList = stationListData;
    }
  }

  showStationElementsAll() {
    if (!this.stationList || this.stationList.length < 0) return;

    const stationListDOMItems = this.stationList.map((station) => {
      return `
        <tr data-name="${station.name}">
          <td>${station.name}</td>
          <td>
            <button class="station-delete-button" data-name="${station.name}">
              삭제
            </button>
          </td>
        </tr>
      `;
    });

    this.elements.stationListTableBody.innerHTML += stationListDOMItems.join('');
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
        <tbody></tbody>
      </table>
    `;

    this.elements = {
      ...this.elements,
      stationForm: document.querySelector('#station-form'),
      stationNameInput: document.querySelector('#station-name-input'),
      stationAddButton: document.querySelector('#station-add-button'),
      stationList: document.querySelector('#station-list'),
      stationListTableBody: document.querySelector('#station-list tbody'),
    };

    this.elements.stationForm.addEventListener('submit', this.handleSubmitStationAdd.bind(this));
    this.elements.stationList.addEventListener('click', this.handleClickStationDelete.bind(this));

    this.loadStationList();
    this.showStationElementsAll();
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
