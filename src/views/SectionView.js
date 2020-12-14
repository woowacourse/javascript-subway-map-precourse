export default class SectionView {
  constructor(stationList, lineList) {
    this.stationList = stationList;
    this.lineList = lineList;

    this.elements = {
      managerContainer: document.querySelector('#manager-container'),
    };

    this.renderLineMenu();
    this.setElementsLineMenu();
  }

  updateSectionListElement(selectedLine) {
    this.elements.sectionListTableBody.innerHTML = this.renderSectionListItems(selectedLine);
  }

  renderSectionStationSelectorOptions() {
    return this.stationList.map((station) => `<option value="${station.name}">${station.name}</options>`).join('');
  }

  renderSectionListItems(selectedLine) {
    return selectedLine.sectionList
      .map(
        (section, index) => `
          <tr data-name="${section.name}">
            <td>${index}</td>
            <td>${section.name}</td>
            <td>
              <button class="section-delete-button" data-name="${section.name}">
                삭제
              </button>
            </td>
          </tr>
        `,
      )
      .join('');
  }

  renderForm(selectedLine) {
    this.elements.sectionLineMenuContainer.innerHTML = `
      <h3>${selectedLine.name} 관리</h3>
      <h4>구간 등록</h4>
      <form id="section-form">
        <select id="section-station-selector">
          ${this.renderSectionStationSelectorOptions()}
        </select>
        <input type="number" id="section-order-input" placeholder="순서" />
        <button id="section-add-button">등록</button>
      </form>
      <table id="section-list">
        <thead>
          <tr>
            <th>순서</th>
            <th>이름</th>
            <th>설정</th>
          </tr>
        </thead>
        <tbody>
          ${this.renderSectionListItems(selectedLine)}
        </tbody>
      </table>
    `;

    this.setElementsForm();
  }

  setElementsForm() {
    this.elements = {
      ...this.elements,
      sectionForm: document.querySelector('#section-form'),
      sectionStationSelector: document.querySelector('#section-station-selector'),
      sectionOrderInput: document.querySelector('#section-order-input'),
      sectionAddButton: document.querySelector('#section-add-button'),
      sectionListTableBody: document.querySelector('#section-list tbody'),
    };
  }

  renderLineMenuItems() {
    return this.lineList
      .map((line) => `<button class="section-line-menu-button" data-line-name="${line.name}">${line.name}</button>`)
      .join('');
  }

  renderLineMenu() {
    this.elements.managerContainer.innerHTML = `
      <h3>구간을 수정할 노선을 선택해주세요</h3>
      <div id="section-line-menu-button-container">
        ${this.renderLineMenuItems()}
      </div>
      <div id="section-line-menu-container"></div>
    `;
  }

  setElementsLineMenu() {
    this.elements = {
      ...this.elements,
      sectionLineMenuButtonContainer: document.querySelector('#section-line-menu-button-container'),
      sectionLineMenuContainer: document.querySelector('#section-line-menu-container'),
    };
  }
}
