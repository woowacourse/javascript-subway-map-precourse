import Table from './Table.js';

import { DELETE_TEXT } from './constants/CommonConstants.js';

import {
  STATION_INPUT_ID,
  STATION_ADD_BUTTON_ID,
  STATION_DELETE_BUTTON_CLASS,
} from './constants/CommonConstants.js';

export default class StationManager {
  constructor({ target, subway, addStation, deleteStation }) {
    this.target = target;
    target.className = 'station-manager';
    this.subway = subway;
    this.onClickAddStation = addStation;
    this.onClickDeleteStation = deleteStation;

    this.cleanUpPage(target);
    this.createStationInput(target);
    this.createStationListHeader(target);
    this.createStationTable(target);
  }

  cleanUpPage(target) {
    target.innerHTML = '';
  }

  createStationInput(target) {
    const container = document.createElement('div');
    target.appendChild(container);

    container.innerHTML = `  
      <p>역 이름</p>
      <input type="text" id="${STATION_INPUT_ID}" />
      <button id="${STATION_ADD_BUTTON_ID}">역 추가</button>
    `;

    const addButton = document.getElementById(STATION_ADD_BUTTON_ID);
    addButton.addEventListener('click', this.onClickAddStation);
  }

  createStationListHeader(target) {
    const h2 = document.createElement('h2');
    h2.innerHTML = `🚉 지하철 역 목록`;

    target.appendChild(h2);
  }

  createStationTable(target) {
    const headers = ['역 이름', '설정'];
    this.stationTable = new Table({ target });
    this.stationTable.createTableHeader(headers);
    this.render();
  }

  setSubway(subway) {
    this.subway = subway;
    this.render();
  }

  render() {
    const stations = this.subway.getStationName();
    const callbackRender = (station) => `
      <tr>
        <td>${station}</td>
        <td>
          <button class="${STATION_DELETE_BUTTON_CLASS}">
            ${DELETE_TEXT}
          </button>
        </td>
      </tr>`;

    this.stationTable.renderTable({
      data: stations,
      callbackRender,
      onClickDelete: this.onClickDeleteStation,
      className: `.${STATION_DELETE_BUTTON_CLASS}`,
    });
  }
}
