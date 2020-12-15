import Role from './role.js';
import { roleInterface } from './role_interface.js';
import { sectionValidator } from '../util/validator/section_validator.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import {
  ACTIVE,
  LINES_LS,
  LINE_MENU_BUTTON_SECTION,
  MANAGE_K,
  SECTION_ADD_BUTTON,
  SECTION_CONFIRM,
  SECTION_DELETE_BUTTON,
  SECTION_DELETE_K,
  SECTION_HEADER,
  SECTION_LINE,
  SECTION_LINE_MENU_BUTTON,
  SECTION_LINE_TITLE,
  SECTION_MANAGER,
  SECTION_MANAGER_BUTTON,
  SECTION_MANAGER_K,
  SECTION_ORDER_INPUT,
  SECTION_ROW,
  SECTION_STAION_SELECTOR,
  SECTION_TABLE,
} from '../library/constant/constant.js';
import MapPrintManager from './map_print_manager.js';

export default class SectionManager extends Role {
  constructor() {
    super(SECTION_MANAGER, SECTION_MANAGER_BUTTON, SECTION_MANAGER_K);
  }

  initialize() {
    this.renderLineMenuButtons();
    roleInterface.clickButtons(
      SECTION_LINE_MENU_BUTTON,
      this.onClickLineMenuButton,
      this
    );
  }

  renderLineMenuButtons() {
    const section = nodeSelector.selectId(LINE_MENU_BUTTON_SECTION);
    const lineInfos = roleInterface.getLineInfos();

    roleInterface.clearNode(LINE_MENU_BUTTON_SECTION);
    for (const lineInfo of lineInfos) {
      if (!lineInfo) {
        continue;
      }
      const line = Object.keys(lineInfo)[0];
      const button = this.getLineMenuButton(line);

      section.append(button);
    }
  }

  getLineMenuButton(line) {
    const button = document.createElement('button');

    button.className = SECTION_LINE_MENU_BUTTON;
    button.dataset.sectionLine = line;
    button.append(line);

    return button;
  }

  onClickLineMenuButton(event) {
    const target = event.target.dataset.sectionLine;
    const title = nodeSelector.selectId(SECTION_LINE_TITLE);

    title.innerHTML = `${target} ${MANAGE_K}`;
    this.initializeSectionLine(target);
  }

  initializeSectionLine(sectionLine) {
    this.renderSectionLine(sectionLine);
    this.clickDeleteButton();
  }

  renderSectionLine(target) {
    const table = nodeSelector.selectId(SECTION_TABLE);
    const sections = this.getSectionLine(target) ?? [];

    roleInterface.clearNode(SECTION_TABLE);
    this.fillSectionLine(table, sections);
    roleInterface.displayContent(SECTION_LINE, ACTIVE);
  }

  fillSectionLine(table, sections) {
    sections.forEach((section, idx) => {
      const row = roleInterface.getRow(SECTION_ROW, SECTION_HEADER);
      const button = roleInterface.getButton(
        SECTION_DELETE_BUTTON,
        SECTION_DELETE_K
      );

      button.dataset.section = section;
      row.childNodes[0].append(idx);
      row.childNodes[1].append(section);
      row.childNodes[2].append(button);
      table.append(row);
    });
  }

  getSectionLine(line) {
    const lineInfos = roleInterface.getLineInfos();

    for (const lineInfo of lineInfos) {
      if (!lineInfo) {
        continue;
      }
      if (lineInfo.hasOwnProperty(line)) {
        return lineInfo[line];
      }
    }
  }

  clickAddButton() {
    roleInterface.clickButton(SECTION_ADD_BUTTON, this.onClickAddButton, this);
  }

  onClickAddButton() {
    const input = nodeSelector.selectId(SECTION_ORDER_INPUT);
    const selector = nodeSelector.selectId(SECTION_STAION_SELECTOR);
    const lineTitle = nodeSelector.selectId(SECTION_LINE_TITLE);
    const line = lineTitle.innerHTML.split(' ')[0];

    if (
      sectionValidator.checkValidInput(input, line) &&
      sectionValidator.checkValidOption(selector, line)
    ) {
      this.addSection(input, selector, line);
      this.initializeSectionLine(line);
      this.updateData(line);
    }
  }

  addSection(input, selector, line) {
    const index = input.value;
    const station = selector.value;
    const lineInfos = roleInterface.getLineInfos();

    input.value = '';
    for (const lineInfo of lineInfos) {
      if (!lineInfo) {
        continue;
      }
      lineInfo.hasOwnProperty(line) && lineInfo[line].splice(index, 0, station);
    }
    localStorage.setItem(LINES_LS, JSON.stringify(lineInfos));
  }

  updateData() {
    const mapPrintManager = new MapPrintManager();

    mapPrintManager.printMap();
  }

  clickDeleteButton() {
    roleInterface.clickButtons(
      SECTION_DELETE_BUTTON,
      this.onClickDeleteButton,
      this
    );
  }

  onClickDeleteButton(event) {
    const target = event.target.dataset.section;
    const lineTitle = nodeSelector.selectId(SECTION_LINE_TITLE);
    const line = lineTitle.innerHTML.split(' ')[0];

    if (!sectionValidator.canDelete(line)) {
      return;
    }
    if (confirm(SECTION_CONFIRM)) {
      this.deleteSection(target, line);
      this.initializeSectionLine(line);
      this.updateData();
    }
  }

  deleteSection(target, line) {
    const lineInfos = roleInterface.getLineInfos();

    for (const lineInfo of lineInfos) {
      if (!lineInfo) {
        continue;
      }
      if (lineInfo.hasOwnProperty(line)) {
        lineInfo[line] = lineInfo[line].filter(station => station !== target);
      }
    }
    localStorage.setItem(LINES_LS, JSON.stringify(lineInfos));
  }
}
