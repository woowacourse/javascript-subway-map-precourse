export default class SectionManager {
  constructor({ target, subway }) {
    this._target = target;
    this._subway = subway;

    this.createHeader(target);
    this.createSectionButtons(target);
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
    target.innerHTML = ``;
    const _container = this.createContainerElement(target);
    const stations = this._subway.getStationName();

    _container.innerHTML = `
      <h3>${line.lineName} 관리</h3>
      <h4>구간 등록</h4>
      <div>
        <select id="section-station-selector">
          ${stations.map((station) => `
            <option value=${station}>${station}</option>
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

    this.createTable(target);
    this.createTableHeader();
    this.render(line);
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
    const lines = this._subway.getLines();

    _container.innerHTML = `
      ${lines.map(({ lineName }) => `
        <button class="section-line-menu-button">${lineName}</button>
      `).join('')}
    `;
    this.addSectionUpdateClickEvent(target, lines);
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
        <th>순서</th>
        <th>이름</th>
        <th>설정</th>
      </tr>
    `;
  }

  render(line) {
    const { section } = line;
    this.tbody.innerHTML = `
      ${section.map((name, index) => `
        <tr>
          <td>${index}</td>
          <td>${name}</td>
          <td><button class="section-delete-button">노선에서 제거</button></td>
        </tr>
      `).join('')}
    `;
  }
}
