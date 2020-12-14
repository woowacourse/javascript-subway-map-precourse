import Role from './role.js';
import { roleInterface } from './role_interface.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import { lineValidator } from '../util/validator/line_validator.js';
import {
  LINE_MANAGER,
  LINE_MANAGER_BUTTON,
  LINE_MANAGER_K,
  LINE_START_STATION_SELECTOR,
  LINE_END_STATION_SELECTOR,
  LINE_NAME_INPUT,
  LINES_LS,
  LINE_NAMES,
  LINE_TABLE,
  LINE_HEADER,
  LINE,
  LINE_DELETE_BUTTON,
  DELETE_K,
  LINE_ROW,
  LINE_CONFIRM,
  SECTION_LINE_MENU_BUTTON,
} from '../library/constant/constant.js';
import SectionManager from './section_manager.js';
import MapPrintManager from './map_print_manager.js';

export default class LineManager extends Role {
  constructor() {
    super(LINE_MANAGER, LINE_MANAGER_BUTTON, LINE_MANAGER_K);
  }

  initialize() {
    roleInterface.clearNode(LINE_TABLE);
    this.renderLines();
    roleInterface.clickButtons(
      LINE_DELETE_BUTTON,
      this.onClickDeleteButton,
      this
    );
  }

  renderLines() {
    for (const lineInfo of this._lineInfos) {
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
    const table = nodeSelector.selectId(LINE_TABLE);
    const row = roleInterface.getRow(LINE_ROW, LINE_HEADER);
    const button = roleInterface.getButton(LINE_DELETE_BUTTON, DELETE_K);

    button.dataset.line = line;
    row.childNodes[0].className = LINE;
    row.childNodes[0].append(line);
    row.childNodes[1].append(lineStart);
    row.childNodes[2].append(lineEnd);
    row.childNodes[3].append(button);
    table.append(row);
  }

  onClickAddButton() {
    const input = nodeSelector.selectId(LINE_NAME_INPUT);
    const lineStart = nodeSelector.selectId(LINE_START_STATION_SELECTOR);
    const lineEnd = nodeSelector.selectId(LINE_END_STATION_SELECTOR);

    if (
      lineValidator.checkValidInput(input) &&
      lineValidator.checkValidOptions(this._lineInfos, lineStart, lineEnd)
    ) {
      this.addLine(input, lineStart, lineEnd);
      this.initialize();
      this.updateData();
    }
  }

  addLine(input, lineStart, lineEnd) {
    const lineInfo = {};
    const line = input.value;
    const index = LINE_NAMES.indexOf(line);

    input.value = '';
    lineInfo[line] = [lineStart.value, lineEnd.value];
    this._lineInfos[index] = lineInfo;
    localStorage.setItem(LINES_LS, JSON.stringify(this._lineInfos));
  }

  updateData() {
    const sectionManager = new SectionManager();
    const mapPrintManager = new MapPrintManager();

    sectionManager.renderLineMenuButtons();
    roleInterface.clickButtons(
      SECTION_LINE_MENU_BUTTON,
      sectionManager.onClickLineMenuButton,
      sectionManager
    );
    mapPrintManager.printMap();
  }

  onClickDeleteButton(event) {
    const target = event.target.dataset.line;

    if (confirm(LINE_CONFIRM)) {
      this.deleteLine(target);
      this.initialize();
      this.updateData();
    }
  }

  deleteLine(target) {
    for (let i = 0; i < this._lineInfos.length; i++) {
      const lineInfo = this._lineInfos[i] ?? {};

      if (lineInfo.hasOwnProperty(target)) {
        this._lineInfos.splice(i, 1);
        localStorage.setItem(LINES_LS, JSON.stringify(this._lineInfos));

        return;
      }
    }
  }
}
