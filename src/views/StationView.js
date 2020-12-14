export default class StationView {
  constructor(stationList) {
    this.stationList = stationList;

    this.elements = {
      managerContainer: document.querySelector('#manager-container'),
    };

    this.render();
    this.setElements();
  }

  setElements() {
    this.elements = {
      ...this.elements,
      stationListTableBody: document.querySelector('#station-list tbody'),
    };
  }

  addListItemElement(station) {
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

  deleteListItemElement(name) {
    const element = this.elements.stationListTableBody.querySelector(`tr[data-name="${name}"]`);
    element.remove();
  }

  renderStationListItems() {
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

  render() {
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
        <tbody>${this.renderStationListItems()}</tbody>
      </table>
    `;
  }
}
