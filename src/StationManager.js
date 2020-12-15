import Table from './Table.js';

import { DELETE_TEXT } from './constants/Constants.js';

export default class StationManager {
  constructor({ target, subway, addStation, deleteStation }) {
    this.target = target;
    this.subway = subway;
    this.onClickAddStation = addStation;
    this.onClickDeleteStation = deleteStation;

    this.createStationInput(target);
    this.createStationListHeader(target);
    this.createStationTable(target);
  }

  createStationInput(target) {
    const container = document.createElement('div');
    target.appendChild(container);

    container.innerHTML = `  
      <p>역 이름</p>
      <input type="text" id="station-name-input" />
      <button id="station-add-button">역 추가</button>
    `;

    const addButton = document.querySelector('#station-add-button');
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
          <button class="station-delete-button">
            ${DELETE_TEXT}
          </button>
        </td>
      </tr>`;

    this.stationTable.renderTable({
      data: stations,
      callbackRender,
      onClickDelete: this.onClickDeleteStation,
      className: '.station-delete-button',
    });
  }
}
