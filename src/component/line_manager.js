import Role from './role.js';
import {
  LINE_MANAGER,
  LINE_MANAGER_BUTTON,
  LINE_MANAGER_K,
  LINE_START_STATION_SELECTOR,
  LINE_END_STATION_SELECTOR,
  LINE_ADD_BUTTON,
  LINE_NAME_INPUT,
  LINES_LS,
  LINE_NAMES,
  LINE_TABLE,
  LINE,
  LINE_DELETE_BUTTON,
  DELETE_K,
  LINE_ROW,
} from '../library/constant/constant.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import LineValidator from '../util/validator/line_validator.js';

export default class LineManager extends Role {
  constructor(lines) {
    super(LINE_MANAGER, LINE_MANAGER_BUTTON, LINE_MANAGER_K);
    this._lines = lines;
    this.renderLines();
    this.renderSelectors();
    this.clickAddButton();
  }

  renderLines() {
    this.clearLineTable();
    for (const lineInfo of this._lines) {
      if (!lineInfo) {
        continue;
      }
      const line = Object.keys(lineInfo)[0];
      const section = Object.values(lineInfo)[0];
      const lineStart = section[0];
      const lineEnd = section[section.length - 1];

      this.renderLine(line, lineStart, lineEnd);
    }
    this.clickDeleteButton();
  }

  clearLineTable() {
    const table = nodeSelector.selectId(LINE_TABLE);

    table.innerHTML = '';
  }

  renderLine(line, lineStart, lineEnd) {
    const lineTable = nodeSelector.selectId(LINE_TABLE);
    const row = this.getLineRow();
    const lineDeleteButton = this.getLineDeleteButton(line);

    row.childNodes[0].className = LINE;
    row.childNodes[0].append(line);
    row.childNodes[1].append(lineStart);
    row.childNodes[2].append(lineEnd);
    row.childNodes[3].append(lineDeleteButton);
    lineTable.append(row);
  }

  getLineRow() {
    const row = document.createElement('tr');
    const blank = document.createElement('td');

    row.className = LINE_ROW;
    row.append(
      blank,
      blank.cloneNode(true),
      blank.cloneNode(true),
      blank.cloneNode(true)
    );

    return row;
  }

  getLineDeleteButton(line) {
    const button = document.createElement('button');

    button.className = LINE_DELETE_BUTTON;
    button.dataset.line = line;
    button.append(DELETE_K);

    return button;
  }

  clickAddButton() {
    const addButton = nodeSelector.selectId(LINE_ADD_BUTTON);

    addButton.addEventListener('click', this.onClickAddButton.bind(this));
  }

  onClickAddButton() {
    const validator = new LineValidator();
    const lineNameInput = nodeSelector.selectId(LINE_NAME_INPUT);
    const lineStart = nodeSelector.selectId(LINE_START_STATION_SELECTOR);
    const lineEnd = nodeSelector.selectId(LINE_END_STATION_SELECTOR);

    if (
      validator.checkValidInput(lineNameInput) &&
      validator.checkValidOptions(this._lines, lineStart, lineEnd)
    ) {
      this.addLine(lineNameInput, lineStart, lineEnd);
      this.renderLines();
    }
  }

  addLine(line, lineStart, lineEnd) {
    const lineInfo = {};
    const index = LINE_NAMES.indexOf(line.value);

    lineInfo[line.value] = [lineStart.value, lineEnd.value];
    this._lines[index] = lineInfo;
    localStorage.setItem(LINES_LS, JSON.stringify(this._lines));
    line.value = '';
  }

  clickDeleteButton() {
    const deleteButtons = nodeSelector.selectClassAll(LINE_DELETE_BUTTON);

    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener(
        'click',
        this.onClickDeleteButton.bind(this)
      );
    });
  }

  onClickDeleteButton(event) {
    const target = event.target.dataset.line;

    this.deleteLine(target);
    this.renderLines();
  }

  deleteLine(target) {
    for (let i = 0; i < this._lines.length; i++) {
      const lineInfo = this._lines[i] ?? {};

      if (lineInfo.hasOwnProperty(target)) {
        this._lines.splice(i, 1);
        localStorage.setItem(LINES_LS, JSON.stringify(this._lines));

        return;
      }
    }
  }
}
