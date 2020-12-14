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

    this.createTable(target);
    this.createTableHeader();
    this.render();
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
        <th>노선 이름</th>
        <th>상행 종점역</th>
        <th>하행 종점역</th>
        <th>설정</th>
      </tr>
    `;
  }

  setSubway(subway) {
    this._subway = subway;
    this.render();
  }

  addLineDeleteEvent(lines) {
    const deleteButtons = this.tbody.querySelectorAll('.line-delete-button');

    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener(
        'click', () => this.onClickDeleteLine(lines[index]),
      );
    });
  }

  render() {
    const lines = this._subway.getLines();
    if (lines.length === 0) {
      this.tbody.innerHTML = '';
      return;
    }
    this.tbody.innerHTML = `
      ${lines.map(({ lineName, section }) => `
        <tr>
          <td>${lineName}</td>
          <td>${section[0]}</td>
          <td>${section[section.length - 1]}</td>
          <td><button class="line-delete-button">${DELETE_TEXT}</button></td>
        </tr>`).join('')}
      `;
    this.addLineDeleteEvent(lines);
  }
}
