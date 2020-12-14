import Table from './Table.js';

import { DELETE_TEXT } from './constants/Constants.js';

export default class StationManager {
  constructor({ target, subway, addStation, deleteStation }) {
    this._target = target;
    this._subway = subway;
    this.onClickAddStation = addStation;
    this.onClickDeleteStation = deleteStation;

    this.createStationInput(target);
    this.createStationListHeader(target);
    this.createStationTable(target);
  }

  createStationInput(target) {
    const _container = document.createElement('div');
    target.appendChild(_container);

    _container.innerHTML = `  
      <p>역 이름</p>
      <input type="text" id="station-name-input" />
      <button id="station-add-button">역 추가</button>
    `;

    const _addButton = document.querySelector('#station-add-button');
    _addButton.addEventListener('click', this.onClickAddStation);
  }

  createStationListHeader(target) {
    const _h2 = document.createElement('h2');
    _h2.innerHTML = `🚉 지하철 역 목록`;

    target.appendChild(_h2);
  }

  createStationTable(target) {
    const headers = ['역 이름', '설정'];
    this._stationTable = new Table({ target });
    this._stationTable.createTableHeader(headers);
    this.render();
  }

  createTable(target) {
    const table = document.createElement('table');
    this.table = table;
    target.appendChild(table);

    const thead = document.createElement('thead');
    this.thead = thead;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    this.tbody = tbody;
    table.appendChild(tbody);
  }

  createTableHeader() {
    this.thead.innerHTML = `
      <tr>
        <th>역 이름</th>
        <th>설정</th>
      </tr>
    `;
  }

  setSubway(subway) {
    this._subway = subway;
    this.render();
  }

  render() {
    const stations = this._subway.getStationName();
    const callbackRender = (station) => `
      <tr>
        <td>${station}</td>
        <td><button class="station-delete-button">${DELETE_TEXT}</button></td>
      </tr>`;

    this._stationTable.renderTable({
      data: stations,
      callbackRender,
      onClickDelete: this.onClickDeleteStation.bind(this),
      className: '.station-delete-button',
    });
  }
}
