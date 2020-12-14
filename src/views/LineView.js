export default class LineView {
  constructor(stationList, lineList) {
    this.stationList = stationList;
    this.lineList = lineList;

    this.elements = {
      managerContainer: document.querySelector('#manager-container'),
    };

    this.render();
    this.setElements();
  }

  addListItemElement(line) {
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

  deleteListItemElement(name) {
    const element = this.elements.lineListTableBody.querySelector(`tr[data-name="${name}"]`);
    element.remove();
  }

  renderStationSelectorOptions() {
    return this.stationList.map((station) => `<option value="${station.name}">${station.name}</options>`).join('');
  }

  renderLineListItems() {
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

  render() {
    this.elements.managerContainer.innerHTML = `
      <form id="line-form">
        <label for="line-name-input">노선 이름</label>
        <br />
        <input type="text" id="line-name-input" placeholder="노선 이름을 입력해주세요"  />
        <p>
          <label for="line-start-station-selector">상행 종점</label>
          <select id="line-start-station-selector">${this.renderStationSelectorOptions()}</select>
          <br />
          <label for="line-end-station-selector">하행 종점</label>
          <select id="line-end-station-selector">${this.renderStationSelectorOptions()}</select>
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
        <tbody>${this.renderLineListItems()}</tbody>
      </table>
    `;
  }

  setElements() {
    this.elements = {
      ...this.elements,
      lineForm: document.querySelector('#line-form'),
      lineNameInput: document.querySelector('#line-name-input'),
      lineStartStationSelector: document.querySelector('#line-start-station-selector'),
      lineEndStationSelector: document.querySelector('#line-end-station-selector'),
      lineListTableBody: document.querySelector('#line-list tbody'),
    };
  }
}
