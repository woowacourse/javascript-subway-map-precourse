export default class StationManager {
  constructor({ target, subway, addStation }) {
    this._target = target;
    this._subway = subway;
    this.onClickAddStation = addStation;

    this.createStationInput(target);
    this.createStationListHeader(target);
    this.createTable(target);
    this.createTableHeader();
    this.render();
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
    if (stations.length === 0) {
      this.tbody.innerHTML = '';
      return;
    }
    this.tbody.innerHTML = `
      ${stations.map((station) => `
        <tr>
          <td>${station}</td>
          <td><button class="station-delete-button">삭제</button></td>
        </tr>`).join('')}
      `;
  }
}
