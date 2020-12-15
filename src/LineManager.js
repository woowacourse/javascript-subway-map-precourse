import Table from './Table.js';

import {
  DELETE_TEXT,
} from './constants/Constants.js';

export default class LineManager {
  constructor({ target, subway, addLine, deleteLine }) {
    this.target = target;
    this.subway = subway;
    this.onClickAddLine = addLine;
    this.onClickDeleteLine = deleteLine;

    this.createLineInput(target);
    this.createSelector(target);
    this.createLineListHeader(target);
    this.createLineTable(target);
  }

  createContainerElement(target, classNames = '') {
    const container = document.createElement('div');
    target.appendChild(container);
    if (classNames !== '') {
      container.className = classNames;
    }
    return container;
  }

  createLineInput(target) {
    const container = this.createContainerElement(
      target, 'line-station line-input',
    );
    container.innerHTML = `
      <p>노선 이름</p>
      <input
        type="text"
        placeholder="노선 이름을 입력해주세요."
        id="line-name-input"
      />
    `;
  }

  renderOptions(stations) {
    return stations.map((station, index) => `
      <option value=${index}>${station}</option>
    `).join('');
  }

  renderSelector({ label, id, stations }) {
    return `
      <label>${label}
        <select id=${id}>
          ${this.renderOptions(stations)}
        </select>
      </label>
    `;
  }

  createStartStationSelect(target) {
    const container = this.createContainerElement(target);

    container.innerHTML = this.renderSelector({
      label: '상행 종점',
      id: 'line-start-station-selector',
      stations: this.subway.getStationName(),
    });
  }

  createEndStationSelect(target) {
    const container = document.createElement('div');
    target.appendChild(container);

    container.innerHTML = this.renderSelector({
      label: '하행 종점',
      id: 'line-end-station-selector',
      stations: this.subway.getStationName(),
    });
  }

  createAddLineButton(target) {
    const container = this.createContainerElement(target, 'line-station');

    container.innerHTML = `
      <button id="line-add-button">노선 추가</button>
    `;

    const addButton = document.querySelector('#line-add-button');
    addButton.addEventListener('click', this.onClickAddLine);
  }

  createSelector(target) {
    const container = this.createContainerElement(
      target, 'line-station line-selector',
    );

    this.createStartStationSelect(container);
    this.createEndStationSelect(container);
    this.createAddLineButton(container);
  }

  createLineListHeader(target) {
    const h2 = document.createElement('h2');
    h2.innerHTML = `🚉 지하철 노선 목록`;

    target.appendChild(h2);
  }

  createLineTable(target) {
    const headers = ['노선 이름', '상행 종점역', '하행 종점역', '설정'];
    this.lineTable = new Table({ target });
    this.lineTable.createTableHeader(headers);
    this.render();
  }

  setSubway(subway) {
    this.subway = subway;
    this.render();
  }

  render() {
    const lines = this.subway.getLines();
    const callbackRender = ({ lineName, section }) => `
      <tr>
        <td>${lineName}</td>
        <td>${section[0]}</td>
        <td>${section[section.length - 1]}</td>
        <td>
          <button class="line-delete-button">
            ${DELETE_TEXT}
          </button>
        </td>
      </tr>`;

    this.lineTable.renderTable({
      data: lines,
      callbackRender,
      onClickDelete: this.onClickDeleteLine,
      className: '.line-delete-button',
    });
  }
}
