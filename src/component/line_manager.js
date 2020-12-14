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
  LINE_CONFIRM,
} from '../library/constant/constant.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import LineValidator from '../util/validator/line_validator.js';

export default class LineManager extends Role {
  constructor() {
    super(LINE_MANAGER, LINE_MANAGER_BUTTON, LINE_MANAGER_K);
    this._lines = this.getSections();
    this.initialize();
    this.renderSelectors();
    this.clickButton(LINE_ADD_BUTTON, this.onClickAddButton, this);
  }

  initialize() {
    this.clearTable(LINE_TABLE);
    this.renderLines();
    this.clickButtons(LINE_DELETE_BUTTON, this.onClickDeleteButton, this);
  }

  renderLines() {
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
      this.initialize();
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

  onClickDeleteButton(event) {
    const target = event.target.dataset.line;

    if (confirm(LINE_CONFIRM)) {
      this.deleteLine(target);
      this.initialize();
    }
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
