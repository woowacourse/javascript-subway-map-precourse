import Role from './role.js';
import {
  LINE_MANAGER,
  LINE_MANAGER_BUTTON,
  LINE_MANAGER_K,
  STATIONS_LS,
  NONE_K,
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
} from '../library/constant/constant.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import LineValidator from '../util/validator/line_validator.js';

export default class LineManager extends Role {
  constructor(lines) {
    super(LINE_MANAGER, LINE_MANAGER_BUTTON, LINE_MANAGER_K);
    this._lines = lines;
    this.renderLines();
    this.initSelectOptions();
    this.clickAddButton();
    // this.clickDeleteButton();
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
  }

  clearLineTable() {
    const table = nodeSelector.selectId(LINE_TABLE);

    table.innerHTML = '';
  }

  renderLine(line, lineStart, lineEnd) {
    const lineTable = nodeSelector.selectId(LINE_TABLE);
    const row = this.getLineRow();
    const lineDeleteButton = this.getLineDeleteButton(line);

    row.childNodes[0].append(line);
    row.childNodes[0].className = LINE;
    row.childNodes[1].append(lineStart);
    row.childNodes[2].append(lineEnd);
    row.childNodes[3].append(lineDeleteButton);
    lineTable.append(row);
  }

  getLineRow() {
    const row = document.createElement('tr');
    const blank = document.createElement('td');

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

  initSelectOptions() {
    const loadedStations = localStorage.getItem(STATIONS_LS);
    const stations = loadedStations ? JSON.parse(loadedStations) : [];
    const lineStartSelect = LINE_START_STATION_SELECTOR;
    const lineEndSelect = LINE_END_STATION_SELECTOR;

    if (stations.length == 0) {
      this.renderSelectOption(NONE_K, lineStartSelect, lineEndSelect);

      return;
    }
    stations.forEach(station => {
      this.renderSelectOption(station, lineStartSelect, lineEndSelect);
    });
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
  }
}
