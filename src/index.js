import Station from './Station.js';
import Line from './Line.js';
import { save, load } from './utils.js';

const MINIMUM_INPUT_LENGTH = 2;
const MINIMUM_STATION_COUNT = 2;

class SubwayMap {
  constructor() {
    this.elements = {};
    this.stationList = [];
    this.lineList = [];

    this.setMenuElements();
    this.setMenuEventListener();

    this.loadData();
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

  loadData() {
    this.stationList = load('stationList');
  }

  getStation(name) {
    return this.stationList.find((station) => station.name === name);
  }

  // eslint-disable-next-line class-methods-use-this
  deleteListItemElement(name) {
    const element = document.querySelector(`tr[data-name="${name}"]`);
    element.remove();
  }

  // eslint-disable-next-line class-methods-use-this
  isValidNameLength(name) {
    return name.length >= MINIMUM_INPUT_LENGTH;
  }

  isExistStation(name) {
    return this.stationList.some((station) => station.name === name);
  }

  isValidStationName(name) {
    if (!this.isValidNameLength(name)) {
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

  handleSubmitStationAdd(e) {
    e.preventDefault();

    const name = this.elements.stationNameInput.value.trim();
    if (!this.isValidStationName(name)) return;

    const station = new Station(name);
    this.stationList.push(station);
    this.addStationListItemElement(station);
    save('stationList', this.stationList);

    this.elements.stationNameInput.value = '';
  }

  handleClickStationDelete(e) {
    if (e.target.className !== 'station-delete-button') return;

    const { name } = e.target.dataset;
    const index = this.stationList.findIndex((station) => station.name === name);

    if (index >= 0) {
      this.stationList.splice(index, 1);
      this.deleteListItemElement(name);
      save('stationList', this.stationList);
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

    this.showStationElementsAll();
  }

  getStationSelectorOptions() {
    return this.stationList.map((station) => `<option value="${station.name}">${station.name}</options>`).join('');
  }

  isExistLine(name) {
    return this.lineList.some((line) => line.name === name);
  }

  isValidLine(name, startStation, endStation) {
    if (!this.isValidNameLength(name)) {
      alert(`${MINIMUM_INPUT_LENGTH}글자 이상 입력해주세요`);
      return false;
    }

    if (this.isExistLine(name)) {
      alert(`이미 존재하는 노선 이름입니다`);
      return false;
    }

    if (!startStation || !endStation) {
      alert('종점역을 올바르게 지정해주세요');
      return false;
    }

    if (startStation === endStation) {
      alert('종점역은 서로 다르게 지정해주세요');
      return false;
    }

    return true;
  }

  addLineListItemElement(line) {
    this.elements.lineListTableBody.innerHTML += `
      <tr data-name="${line.name}">
        <td>${line.name}</td>
        <td>${line.startStation.name}</td>
        <td>${line.endStation.name}</td>
        <td>
          <button class="line-delete-button" data-name="${line.name}">
            삭제
          </button>
        </td>
      </tr>
    `;
  }

  handleSubmitLineAdd(e) {
    e.preventDefault();

    const name = this.elements.lineNameInput.value.trim();
    const startStation = this.getStation(this.elements.lineStartStationSelector.value);
    const endStation = this.getStation(this.elements.lineEndStationSelector.value);

    if (!this.isValidLine(name, startStation, endStation)) return;

    const line = new Line(name, startStation, endStation);
    this.lineList.push(line);
    this.addLineListItemElement(line);

    this.elements.lineNameInput.value = '';
  }

  handleClickLineDelete(e) {
    if (e.target.className !== 'line-delete-button') return;

    const { name } = e.target.dataset;
    const index = this.lineList.findIndex((line) => line.name === name);

    if (index >= 0) {
      this.lineList.splice(index, 1);
      this.deleteListItemElement(name);
    }
  }

  isValidLineManager() {
    return this.stationList.length >= MINIMUM_STATION_COUNT;
  }

  showLineManager() {
    if (!this.isValidLineManager()) {
      alert('등록된 역이 2개 이상이어야 노선 관리 메뉴에 진입할 수 있습니다.');
      return;
    }

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
        <tbody>
        </tbody>
      </table>
    `;

    this.elements = {
      ...this.elements,
      lineForm: document.querySelector('#line-form'),
      lineNameInput: document.querySelector('#line-name-input'),
      lineStartStationSelector: document.querySelector('#line-start-station-selector'),
      lineEndStationSelector: document.querySelector('#line-end-station-selector'),
      lineList: document.querySelector('#line-list'),
      lineListTableBody: document.querySelector('#line-list tbody'),
    };

    this.elements.lineStartStationSelector.innerHTML = this.getStationSelectorOptions();
    this.elements.lineEndStationSelector.innerHTML = this.getStationSelectorOptions();

    this.elements.lineForm.addEventListener('submit', this.handleSubmitLineAdd.bind(this));
    this.elements.lineList.addEventListener('click', this.handleClickLineDelete.bind(this));
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
