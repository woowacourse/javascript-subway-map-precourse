import Table from './Table.js';

export default class SectionManager {
  constructor({ target, subway, addSection, deleteSection }) {
    this._target = target;
    this._subway = subway;
    this.onClickAddSection = addSection;
    this.onClickDeleteSection = deleteSection;
    this.createHeader(target);
    this.createSectionButtons(target);
  }

  get currentLine() {
    return this._currentLine;
  }

  createContainerElement(target, classNames = '') {
    const _container = document.createElement('div');
    target.appendChild(_container);
    if (classNames !== '') {
      _container.className = classNames;
    }
    return _container;
  }

  createHeader(target) {
    const h3 = document.createElement('h3');
    h3.innerHTML = `구간을 수정할 노선을 선택해주세요.`;

    target.appendChild(h3);
  }

  createSectionManagerContainer(target, line) {
    this._currentLine = line;
    target.innerHTML = ``;
    const _container = this.createContainerElement(target);
    const stations = this._subway.getStationName();

    _container.innerHTML = `
      <h3>${line.lineName} 관리</h3>
      <h4>구간 등록</h4>
      <div>
        <select id="section-station-selector">
          ${stations.map((station, index) => `
            <option value=${index}>${station}</option>
          `).join('')}
        </select>
        <input
          type="number"
          placeholder="순서"
          id="seletion-order-input"
        />
        <button id="section-add-button">등록</button>
      </div>
    `;
    const _addButton = document.querySelector('#section-add-button');
    _addButton.addEventListener('click', () => this.onClickAddSection());

    this.createSectionTable(target);
  }

  addSectionUpdateClickEvent(target, lines) {
    const sectionLineMenuButtons = document.querySelectorAll(
      '.section-line-menu-button',
    );
    this._wrapper = this.createContainerElement(target, 'section-manager');

    sectionLineMenuButtons.forEach((button, index) => {
      button.addEventListener(
        'click', () => this.createSectionManagerContainer(
          this._wrapper, lines[index],
        ),
      );
    });
  }

  createSectionButtons(target) {
    const _container = this.createContainerElement(target, 'section-line-menu');
    const _lines = this._subway.getLines();

    _container.innerHTML = `
      ${_lines.map(({ lineName }) => `
        <button class="section-line-menu-button">${lineName}</button>
      `).join('')}
    `;
    this.addSectionUpdateClickEvent(target, _lines);
  }

  createSectionTable(target) {
    const headers = ['순서', '이름', '설정'];
    this._sectionTable = new Table({ target });
    this._sectionTable.createTableHeader(headers);
    this.render();
  }

  setSubway(subway) {
    this._subway = subway;
    this.render();
  }

  render() {
    const { section } = this._currentLine;
    const callbackRender = (name, index) => `
      <tr>
        <td>${index}</td>
        <td>${name}</td>
        <td>
          <button class="section-delete-button">
            노선에서 제거
          </button>
        </td>
      </tr>
    `;
    this._sectionTable.renderTable({
      data: section,
      callbackRender,
      onClickDelete: this.onClickDeleteSection,
      className: '.section-delete-button',
    });
  }
}
