import Table from './Table.js';

import {
  SECTION_LINE_MENU_BUTTON_CLASS,
  SECTION_STATION_SELECTOR_ID,
  SECTION_ORDER_INPUT_ID,
  SECTION_ADD_BUTTON_ID,
  SECTION_DELETE_BUTTON_CLASS,
} from './constants/CommonConstants.js';

export default class SectionManager {
  constructor({ target, subway, addSection, deleteSection }) {
    this.target = target;
    target.className = 'section-manager';
    this.subway = subway;
    this.onClickAddSection = addSection;
    this.onClickDeleteSection = deleteSection;

    this.cleanUpPage(target);
    this.createHeader(target);
    this.createSectionButtons(target);
  }

  cleanUpPage(target) {
    target.innerHTML = '';
  }

  get currentLine() {
    return this._currentLine;
  }

  set currentLine(currentLine) {
    this._currentLine = currentLine;
  }

  createContainerElement(target, classNames = '') {
    const container = document.createElement('div');
    target.appendChild(container);
    if (classNames !== '') {
      container.className = classNames;
    }
    return container;
  }

  createHeader(target) {
    const h3 = document.createElement('h3');
    h3.innerHTML = `구간을 수정할 노선을 선택해주세요.`;

    target.appendChild(h3);
  }

  createSectionManagerContainer(target, line) {
    this.currentLine = line;
    target.innerHTML = ``;
    const container = this.createContainerElement(target);
    const stations = this.subway.getStationName();

    container.innerHTML = `
      <h3>${line.lineName} 관리</h3>
      <h4>구간 등록</h4>
      <div>
        <select id="${SECTION_STATION_SELECTOR_ID}">
          ${stations.map((station, index) => `
            <option value=${index}>${station}</option>
          `).join('')}
        </select>
        <input
          type="number"
          placeholder="순서"
          id="${SECTION_ORDER_INPUT_ID}"
        />
        <button id="${SECTION_ADD_BUTTON_ID}">등록</button>
      </div>
    `;
    const addButton = document.getElementById(SECTION_ADD_BUTTON_ID);
    addButton.addEventListener('click', () => this.onClickAddSection());

    this.createSectionTable(target);
  }

  addSectionUpdateClickEvent(target, lines) {
    const sectionLineMenuButtons = document.querySelectorAll(
      `.${SECTION_LINE_MENU_BUTTON_CLASS}`,
    );
    this.wrapper = this.createContainerElement(target, 'section-manager');

    sectionLineMenuButtons.forEach((button, index) => {
      button.addEventListener(
        'click', () => this.createSectionManagerContainer(
          this.wrapper, lines[index],
        ),
      );
    });
  }

  createSectionButtons(target) {
    const container = this.createContainerElement(target, 'section-line-menu');
    const lines = this.subway.getLines();

    container.innerHTML = `
      ${lines.map(({ lineName }) => `
        <button class="${SECTION_LINE_MENU_BUTTON_CLASS}">
          ${lineName}
        </button>
      `).join('')}
    `;
    this.addSectionUpdateClickEvent(target, lines);
  }

  createSectionTable(target) {
    const headers = ['순서', '이름', '설정'];
    this.sectionTable = new Table({ target });
    this.sectionTable.createTableHeader(headers);
    this.render();
  }

  setSubway(subway) {
    this.subway = subway;
    this.render();
  }

  render() {
    const { section } = this.currentLine;
    const callbackRender = (name, index) => `
      <tr>
        <td>${index}</td>
        <td>${name}</td>
        <td>
          <button class="${SECTION_DELETE_BUTTON_CLASS}">
            노선에서 제거
          </button>
        </td>
      </tr>
    `;
    this.sectionTable.renderTable({
      data: section,
      callbackRender,
      onClickDelete: this.onClickDeleteSection,
      className: `.${SECTION_DELETE_BUTTON_CLASS}`,
    });
  }
}
