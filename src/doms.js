import { dataStrings } from './index.js';

export const DOMs = {
  STATION_MANAGER_BUTTON: document.getElementById('station-manager-button'),
  LINE_MANAGER_BUTTON: document.getElementById('line-manager-button'),
  SECTION_MANAGER_BUTTON: document.getElementById('section-manager-button'),
  MAP_PRINT_MANAGER_BUTTON: document.getElementById('map-print-manager-button'),
  MANAGER_CONTAINER: document.getElementById('manager-container'),
};

export const DOMStrings = {
  // station manager
  STATION_MANAGER: 'station-manager',
  STATION_NAME_INPUT: 'station-name-input',
  STATION_ADD_BUTTON: 'station-add-button',
  STATION_LIST_TABLE: 'station-list',
  STATION_DELETE_BUTTON: 'station-delete-button',

  // line manager
  LINE_MANAGER: 'line-manager',
  LINE_NAME_INPUT: 'line-name-input',
  LINE_START_STATION_SELECTOR: 'line-start-station-selector',
  LINE_END_STATION_SELECTOR: 'line-end-station-selector',
  LINE_ADD_BUTTON: 'line-add-button',
  LINE_LIST_TABLE: 'line-list',
  LINE_DELETE_BUTTON: 'line-delete-button',

  // section manager
  SECTION_CONTAINER: 'section-container',
  SECTION_LINE_MENU_BUTTON: 'section-line-menu-button',
  SECTION_MANAGER: 'section-manager',
  SECTION_STATION_SELECTOR: 'section-station-selector',
  SECTION_ORDER_INPUT: 'section-order-input',
  SECTION_ADD_BUTTON: 'section-add-button',
  SECTION_LIST_TABLE: 'sections',
  SECTION_DELETE_BUTTON: 'section-delete-button',
  SECTION_HEADER: 'section-header',

  // map print manager
  MAP_PRINT_MANAGER: 'map',
};

const strings = {
  STATION_NAME: '역 이름',
  STATION_PLACEHOLDER: '역 이름을 입력해주세요.',
  STATION_ADD: '역 추가',
  STATION_LIST_TITLE: '🚉 지하철 역 목록',
  LINE_NAME: '노선 이름',
  LINE_PLACEHOLDER: '노선 이름을 입력해주세요.',
  LINE_START: '상행 종점',
  LINE_END: '하행 종점',
  LINE_START_STATION: '상행 종점역',
  LINE_END_STATION: '하행 종점역',
  LINE_ADD: '노선 추가',
  LINE_LIST_TITLE: '🚉 지하철 노선 목록',
  SECTION_SELECT_TITLE: '구간을 수정할 노선을 선택해주세요.',
  SECTION_ADD_TITLE: '구간 등록',
  SECTION_DELETE: '노선에서 제거',
  SETTING: '설정',
  ORDER: '순서',
  DELETE: '삭제',
  MANAGE: '관리',
  ADD: '등록',
  NAME: '이름',
};

export const DOMCtrl = {
  clearManagerContainer() {
    DOMs.MANAGER_CONTAINER.innerHTML = '';
  },

  openStationManager() {
    const stationManager = `
      <div id="${DOMStrings.STATION_MANAGER}"><br>
        <span>${strings.STATION_NAME}</span><br>
        <input type="text" id="${DOMStrings.STATION_NAME_INPUT}" placeholder="${strings.STATION_PLACEHOLDER}"/>
        <button id="${DOMStrings.STATION_ADD_BUTTON}"> ${strings.STATION_ADD}</button>
        <h1>${strings.STATION_LIST_TITLE}</h1>
        ${DOMCtrl.getStationList(this.stations)}
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = stationManager;
  },

  getStationList(stations) {
    return `
      <table id="${DOMStrings.STATION_LIST_TABLE}">
        <tr>
          <th><b>${strings.STATION_NAME}</b></th>
          <th><b>${strings.SETTING}</b></th>
        </tr>
        ${stations
          .map(
            station => `<tr><td>${station}</td><td><button class="${DOMStrings.STATION_DELETE_BUTTON}" 
              data-${dataStrings.DATA_STATION}="${station}">${strings.DELETE}</button></td></tr>`
          )
          .join('')}
      </table>
    `;
  },

  openLineManager() {
    const lineManager = `
      <div id="${DOMStrings.LINE_MANAGER}"><br>
        <span>${strings.LINE_NAME}</span><br>
        <input type="text" id="${DOMStrings.LINE_NAME_INPUT}" 
          placeholder="${strings.LINE_PLACEHOLDER}" /><br><br>
        ${DOMCtrl.getLineSelectors(this.stations)}
        <button id="${DOMStrings.LINE_ADD_BUTTON}">${strings.LINE_ADD}</button>
        <h1>${strings.LINE_LIST_TITLE}</h1>
        ${DOMCtrl.getLineList(this.lines)}
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = lineManager;
  },

  getLineSelectors(stations) {
    return `
      <span>${strings.LINE_START} 
        <select id="${DOMStrings.LINE_START_STATION_SELECTOR}">
          ${stations.map(station => `<option>${station}</option>`).join('')}
        </select>
      </span><br>
      <span>${strings.LINE_END} 
        <select id="${DOMStrings.LINE_END_STATION_SELECTOR}">
          ${stations.map(station => `<option>${station}</option>`).join('')}
        </select>
      </span><br><br>
    `;
  },

  getLineList(lines) {
    return `
      <table id="${DOMStrings.LINE_LIST_TABLE}">
        ${DOMCtrl.getLineListHeader()}
        ${lines.map(line => this.getLineListContent(line)).join('')}
      </table>
    `;
  },

  getLineListHeader() {
    return `
      <tr>
        <th><b>${strings.LINE_NAME}</b></th>
        <th><b>${strings.LINE_START_STATION}</b></th>
        <th><b>${strings.LINE_END_STATION}</b></th>
        <th><b>${strings.SETTING}</b></th>
      </tr>
    `;
  },

  getLineListContent(line) {
    return `
      <tr>
        <td>${line.lineName}</td>
        <td>${line.start}</td>
        <td>${line.end}</td>
        <td><button class="${DOMStrings.LINE_DELETE_BUTTON}" 
          data-${dataStrings.DATA_LINE}="${line.lineName}">${strings.DELETE}</button></td>
      </tr>
    `;
  },

  openSectionManager() {
    const sectionContainer = `
      <div id="${DOMStrings.SECTION_CONTAINER}"><h2>${strings.SECTION_SELECT_TITLE}</h2>
        ${this.lines
          .map(
            line =>
              `<button class="${DOMStrings.SECTION_LINE_MENU_BUTTON}" 
              data-${dataStrings.DATA_LINE}="${line.lineName}">${line.lineName}</button>`
          )
          .join(' ')}
        <div id="${DOMStrings.SECTION_MANAGER}"></div>
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = sectionContainer;
  },

  openMapPrintManager() {
    const mapManager = `
      <div class="${DOMStrings.MAP_PRINT_MANAGER}">
        ${this.lines
          .map(
            line => `
              <h3>${line.lineName}</h3>
              <ul>${line.stations.map(station => `<li>${station}</li>`).join('')}</ul>`
          )
          .join('')}
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = mapManager;
  },

  selectLine(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.SECTION_LINE_MENU_BUTTON) {
      const lineSelect = event.target.dataset['line'];
      const lineIndex = this.lines.findIndex(line => line.lineName === lineSelect);
      DOMCtrl.openSection.bind(this)(lineSelect, lineIndex);
    }
  },

  openSection(lineSelect, lineIndex) {
    const sectionManager = `
      <h2 id="${DOMStrings.SECTION_HEADER}" data-${dataStrings.DATA_TARGET}="${lineSelect}">
        ${lineSelect} ${strings.MANAGE}</h2>
      <h3>${strings.SECTION_ADD_TITLE}</h3>
      ${DOMCtrl.getSectionSelector(this.stations)}
      <input type="number" id="${DOMStrings.SECTION_ORDER_INPUT}" placeholder="${strings.ORDER}">
      <button id="${DOMStrings.SECTION_ADD_BUTTON}">${strings.ADD}</button><br><br><br>
      ${DOMCtrl.getSectionList(this.lines[lineIndex].stations)}
    `;
    document.getElementById(DOMStrings.SECTION_MANAGER).innerHTML = sectionManager;
  },

  getSectionSelector(stations) {
    return `
      <select id="${DOMStrings.SECTION_STATION_SELECTOR}">
        ${stations.map(station => `<option>${station}</option>`).join('')}
      </select>
    `;
  },

  getSectionList(stations) {
    return `
      <table id="${DOMStrings.SECTION_LIST_TABLE}">
        ${DOMCtrl.getSectionListHeader()}
        ${stations.map((station, index) => this.getSectionListContent(station, index)).join('')}
      </table>
    `;
  },

  getSectionListHeader() {
    return `
      <tr>
        <th><b>${strings.ORDER}</b></th>
        <th><b>${strings.NAME}</b></th>
        <th><b>${strings.SETTING}</b></th>
      </tr>
    `;
  },

  getSectionListContent(station, index) {
    return `
      <tr>
        <td>${index}</td>
        <td>${station}</td>
        <td><button class="${DOMStrings.SECTION_DELETE_BUTTON}" data-${dataStrings.DATA_INDEX}="${index}">
          ${strings.SECTION_DELETE}</button></td>
      </tr>
    `;
  },
};
