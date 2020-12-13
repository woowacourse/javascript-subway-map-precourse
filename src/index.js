import Station from './Station.js';
import Line from './Line.js';
import { save, load } from './utils.js';
import { MINIMUM_INPUT_LENGTH, MINIMUM_STATION_COUNT } from './constants.js';
import {
  INPUT_LENGTH_MESSAGE,
  ALREADY_EXIST_STATION_NAME_MESSAGE,
  REGISTERED_STATION_MESSAGE,
  ALREADY_EXIST_LINE_NAME_MESSAGE,
  NOT_CORRECT_STATION_MESSAGE,
  SAME_STATION_MESSAGE,
  VALID_LINE_MANAGER_MESSAGE,
  ALREADY_EXIST_SECTION_NAME_MESSAGE,
  VALID_ORDER_MESSAGE,
  MINIMUM_STATION_MESSAGE,
  VALID_SECTION_MANAGER_MESSAGE,
  DELETE_MESSAGE,
} from './messages.js';

class SubwayMap {
  constructor() {
    this.elements = {};
    this.stationList = [];
    this.lineList = [];
    this.selectedLine = null;

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
    this.lineList = load('lineList');
  }

  getStation(name) {
    return this.stationList.find((station) => station.name === name);
  }

  getLine(name) {
    return this.lineList.find((line) => line.name === name);
  }

  getLineIndex(name) {
    return this.lineList.findIndex((line) => line.name === name);
  }

  isRegisteredStation(station) {
    return this.lineList.some((line) => {
      const index = line.sectionList.findIndex((section) => section.name === station.name);
      return index >= 0;
    });
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
      alert(INPUT_LENGTH_MESSAGE);
      return false;
    }

    if (this.isExistStation(name)) {
      alert(ALREADY_EXIST_STATION_NAME_MESSAGE);
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

    if (this.isRegisteredStation(this.stationList[index])) {
      alert(REGISTERED_STATION_MESSAGE);
      return;
    }

    if (window.confirm(DELETE_MESSAGE) && index >= 0) {
      this.stationList.splice(index, 1);
      this.deleteListItemElement(name);
      save('stationList', this.stationList);
    }
  }

  generateStationListItems() {
    return this.stationList
      .map((station) => {
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
      })
      .join('');
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
        <tbody>${this.generateStationListItems()}</tbody>
      </table>
    `;

    this.elements = {
      ...this.elements,
      stationForm: document.querySelector('#station-form'),
      stationNameInput: document.querySelector('#station-name-input'),
      stationAddButton: document.querySelector('#station-add-button'),
      stationListTableBody: document.querySelector('#station-list tbody'),
    };

    this.elements.stationForm.addEventListener('submit', this.handleSubmitStationAdd.bind(this));
    this.elements.stationListTableBody.addEventListener('click', this.handleClickStationDelete.bind(this));
  }

  isExistLine(name) {
    return this.lineList.some((line) => line.name === name);
  }

  isValidLine(name, startStation, endStation) {
    if (!this.isValidNameLength(name)) {
      alert(INPUT_LENGTH_MESSAGE);
      return false;
    }

    if (this.isExistLine(name)) {
      alert(ALREADY_EXIST_LINE_NAME_MESSAGE);
      return false;
    }

    if (!startStation || !endStation) {
      alert(NOT_CORRECT_STATION_MESSAGE);
      return false;
    }

    if (startStation === endStation) {
      alert(SAME_STATION_MESSAGE);
      return false;
    }

    return true;
  }

  addLineListItemElement(line) {
    const endIndex = line.sectionList.length - 1;

    this.elements.lineListTableBody.innerHTML += `
      <tr data-name="${line.name}">
        <td>${line.name}</td>
        <td>${line.sectionList[0].name}</td>
        <td>${line.sectionList[endIndex].name}</td>
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
    save('lineList', this.lineList);

    this.elements.lineNameInput.value = '';
  }

  handleClickLineDelete(e) {
    if (e.target.className !== 'line-delete-button') return;

    const { name } = e.target.dataset;
    const index = this.lineList.findIndex((line) => line.name === name);

    if (window.confirm(DELETE_MESSAGE) && index >= 0) {
      this.lineList.splice(index, 1);
      this.deleteListItemElement(name);
      save('lineList', this.lineList);
    }
  }

  generateStationSelectorOptions() {
    return this.stationList.map((station) => `<option value="${station.name}">${station.name}</options>`).join('');
  }

  generateLineListItems() {
    return this.lineList
      .map((line) => {
        const endIndex = line.sectionList.length - 1;
        return `
          <tr data-name="${line.name}">
            <td>${line.name}</td>
            <td>${line.sectionList[0].name}</td>
            <td>${line.sectionList[endIndex].name}</td>
            <td>
              <button class="line-delete-button" data-name="${line.name}">
                삭제
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  isValidLineManager() {
    return this.stationList.length >= MINIMUM_STATION_COUNT;
  }

  showLineManager() {
    if (!this.isValidLineManager()) {
      alert(VALID_LINE_MANAGER_MESSAGE);
      return;
    }

    this.elements.managerContainer.innerHTML = `
      <form id="line-form">
        <label for="line-name-input">노선 이름</label>
        <br />
        <input type="text" id="line-name-input" placeholder="노선 이름을 입력해주세요"  />
        <p>
          <label for="line-start-station-selector">상행 종점</label>
          <select id="line-start-station-selector">${this.generateStationSelectorOptions()}</select>
          <br />
          <label for="line-end-station-selector">하행 종점</label>
          <select id="line-end-station-selector">${this.generateStationSelectorOptions()}</select>
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
        <tbody>${this.generateLineListItems()}</tbody>
      </table>
    `;

    this.elements = {
      ...this.elements,
      lineForm: document.querySelector('#line-form'),
      lineNameInput: document.querySelector('#line-name-input'),
      lineStartStationSelector: document.querySelector('#line-start-station-selector'),
      lineEndStationSelector: document.querySelector('#line-end-station-selector'),
      lineListTableBody: document.querySelector('#line-list tbody'),
    };

    this.elements.lineForm.addEventListener('submit', this.handleSubmitLineAdd.bind(this));
    this.elements.lineListTableBody.addEventListener('click', this.handleClickLineDelete.bind(this));
  }

  updateSectionListElement() {
    this.elements.sectionListTableBody.innerHTML = this.generateSectionListItems();
  }

  isExistSection(station) {
    return this.selectedLine.sectionList.some(({ name }) => name === station);
  }

  isValidOrder(order) {
    return order >= 0 && order <= this.selectedLine.sectionList.length;
  }

  validateSection(stationName, order) {
    if (this.isExistSection(stationName)) {
      alert(ALREADY_EXIST_SECTION_NAME_MESSAGE);
      return false;
    }

    if (!this.isValidOrder(order)) {
      alert(VALID_ORDER_MESSAGE(this.selectedLine.sectionList.length));
      return false;
    }

    return true;
  }

  saveSelectedLine() {
    const selectedLineIndex = this.getLineIndex(this.selectedLine.name);
    const nextLineList = [...this.lineList];
    nextLineList[selectedLineIndex] = this.selectedLine;
    save('lineList', nextLineList);
  }

  handleSubmitSectionAdd(e) {
    e.preventDefault();

    const selectedStationName = this.elements.sectionStationSelector.value;
    const selectedStation = this.getStation(selectedStationName);
    const order = parseInt(this.elements.sectionOrderInput.value.trim(), 10);

    if (!this.validateSection(selectedStationName, order)) return;

    this.selectedLine.sectionList.splice(order, 0, selectedStation);
    this.updateSectionListElement();
    this.saveSelectedLine();
  }

  handleClickSectionDelete(e) {
    if (e.target.className !== 'section-delete-button') return;

    if (this.selectedLine.sectionList.length <= 2) {
      alert(MINIMUM_STATION_MESSAGE);
      return;
    }

    const { name } = e.target.dataset;
    const index = this.selectedLine.sectionList.findIndex((station) => station.name === name);

    if (window.confirm(DELETE_MESSAGE) && index >= 0) {
      this.selectedLine.sectionList.splice(index, 1);
      this.updateSectionListElement(name);
      this.saveSelectedLine();
    }
  }

  generateSectionStationSelectorOptions() {
    return this.stationList.map((station) => `<option value="${station.name}">${station.name}</options>`).join('');
  }

  generateSectionListItems() {
    return this.selectedLine.sectionList
      .map(
        (section, index) => `
          <tr data-name="${section.name}">
            <td>${index}</td>
            <td>${section.name}</td>
            <td>
              <button class="section-delete-button" data-name="${section.name}">
                삭제
              </button>
            </td>
          </tr>
        `,
      )
      .join('');
  }

  showSectionManagerForm() {
    this.elements.sectionLineMenuContainer.innerHTML = `
      <h3>${this.selectedLine.name} 관리</h3>
      <h4>구간 등록</h4>
      <form id="section-form">
        <select id="section-station-selector">
          ${this.generateSectionStationSelectorOptions()}
        </select>
        <input type="number" id="section-order-input" placeholder="순서" />
        <button id="section-add-button">등록</button>
      </form>
      <table id="section-list">
        <thead>
          <tr>
            <th>순서</th>
            <th>이름</th>
            <th>설정</th>
          </tr>
        </thead>
        <tbody>
          ${this.generateSectionListItems()}
        </tbody>
      </table>
    `;

    this.elements = {
      ...this.elements,
      sectionForm: document.querySelector('#section-form'),
      sectionStationSelector: document.querySelector('#section-station-selector'),
      sectionOrderInput: document.querySelector('#section-order-input'),
      sectionAddButton: document.querySelector('#section-add-button'),
      sectionListTableBody: document.querySelector('#section-list tbody'),
    };

    this.elements.sectionForm.addEventListener('submit', this.handleSubmitSectionAdd.bind(this));
    this.elements.sectionListTableBody.addEventListener('click', this.handleClickSectionDelete.bind(this));
  }

  isValidSectionManager() {
    return this.lineList.length >= 1;
  }

  handleClickLineMenu(e) {
    if (e.target.className !== 'section-line-menu-button') return;

    const { lineName } = e.target.dataset;
    const selectedLine = this.lineList.find((line) => line.name === lineName);

    if (selectedLine) {
      this.selectedLine = selectedLine;
      this.showSectionManagerForm();
    }
  }

  showSectionManager() {
    if (!this.isValidSectionManager()) {
      alert(VALID_SECTION_MANAGER_MESSAGE);
      return;
    }

    const sectionLineMenuButtonsDOM = this.lineList
      .map((line) => `<button class="section-line-menu-button" data-line-name="${line.name}">${line.name}</button>`)
      .join('');

    this.elements.managerContainer.innerHTML = `
      <h3>구간을 수정할 노선을 선택해주세요</h3>
      <div id="section-line-menu-button-container">
        ${sectionLineMenuButtonsDOM}
      </div>
      <div id="section-line-menu-container"></div>
    `;

    this.elements = {
      ...this.elements,
      sectionLineMenuButtonContainer: document.querySelector('#section-line-menu-button-container'),
      sectionLineMenuContainer: document.querySelector('#section-line-menu-container'),
    };

    this.elements.sectionLineMenuButtonContainer.addEventListener('click', this.handleClickLineMenu.bind(this));
  }

  showMapPrintManager() {
    this.elements.managerContainer.innerHTML = `<div class="map" />`;
    const mapElement = document.querySelector('.map');

    mapElement.innerHTML = this.lineList
      .map((line) => {
        let generatedDOM = `
          <h3>${line.name}</h3>
          <ul>
        `;
        generatedDOM += line.sectionList.map((section) => `<li>${section.name}</li>`).join('');
        generatedDOM += `</ul>`;

        return generatedDOM;
      })
      .join('');
  }
}

new SubwayMap();
