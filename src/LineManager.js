import Table from './Table.js';

import {
  LINE_PLACEHOLDER,
  DELETE_TEXT,
} from './constants/Constants.js';

export default class LineManager {
  constructor({ target, subway, addLine, deleteLine }) {
    this._target = target;
    this._subway = subway;
    this.onClickAddLine = addLine;
    this.onClickDeleteLine = deleteLine;

    this.createLineInput(target);
    this.createSelector(target);
    this.createLineListHeader(target);
    this.createLineTable(target);
  }

  createContainerElement(target, classNames = '') {
    const _container = document.createElement('div');
    target.appendChild(_container);
    if (classNames !== '') {
      _container.className = classNames;
    }

    return _container;
  }

  createLineInput(target) {
    const _container = this.createContainerElement(
      target, 'line-station line-input',
    );

    _container.innerHTML = `  
      <p>노선 이름</p>
      <input
        type="text"
        placeholder=${LINE_PLACEHOLDER}
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
    const _container = this.createContainerElement(target);

    _container.innerHTML = this.renderSelector({
      label: '상행 종점',
      id: 'line-start-station-selector',
      stations: this._subway.getStationName(),
    });
  }

  createEndStationSelect(target) {
    const _container = document.createElement('div');
    target.appendChild(_container);

    _container.innerHTML = this.renderSelector({
      label: '하행 종점',
      id: 'line-end-station-selector',
      stations: this._subway.getStationName(),
    });
  }

  createAddLineButton(target) {
    const _container = this.createContainerElement(target, 'line-station');

    _container.innerHTML = `
      <button id="line-add-button">노선 추가</button>
    `;

    const _addButton = document.querySelector('#line-add-button');
    _addButton.addEventListener('click', this.onClickAddLine);
  }

  createSelector(target) {
    const _container = this.createContainerElement(
      target, 'line-station line-selector',
    );

    this.createStartStationSelect(_container);
    this.createEndStationSelect(_container);
    this.createAddLineButton(_container);
  }

  createLineListHeader(target) {
    const h2 = document.createElement('h2');
    h2.innerHTML = `🚉 지하철 노선 목록`;

    target.appendChild(h2);
  }

  createLineTable(target) {
    const headers = ['노선 이름', '상행 종점역', '하행 종점역', '설정'];
    this._lineTable = new Table({ target });
    this._lineTable.createTableHeader(headers);
    this.render();
  }

  setSubway(subway) {
    this._subway = subway;
    this.render();
  }

  render() {
    const lines = this._subway.getLines();
    const callbackRender = ({ lineName, section }) => `
      <tr>
        <td>${lineName}</td>
        <td>${section[0]}</td>
        <td>${section[section.length - 1]}</td>
        <td><button class="line-delete-button">${DELETE_TEXT}</button></td>
      </tr>`;

    this._lineTable.renderTable({
      data: lines,
      callbackRender,
      onClickDelete: this.onClickDeleteLine.bind(this),
      className: '.line-delete-button',
    });
  }
}
