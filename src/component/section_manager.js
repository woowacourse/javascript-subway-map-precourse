import Role from './role.js';
import { nodeSelector } from '../util/selector/node_selector.js';
import {
  SECTION_LINE_MENU_BUTTON,
  SECTION_LINE,
  SECTION_MANAGER,
  SECTION_MANAGER_BUTTON,
  SECTION_MANAGER_K,
  LINE_MENU_BUTTON_SECTION,
  SECTION_TABLE,
  HIDE,
  SECTION_ROW,
  SECTION_DELETE_BUTTON,
  SECTION_DELETE_K,
} from '../library/constant/constant.js';

export default class SectionManager extends Role {
  constructor() {
    super(SECTION_MANAGER, SECTION_MANAGER_BUTTON, SECTION_MANAGER_K);
    this._lines = this.getSections();
    this.initialize();
  }

  initialize() {
    this.renderLineMenuButtons();
    this.clickButtons(
      SECTION_LINE_MENU_BUTTON,
      this.onClickLineMenuButton,
      this
    );
    this.hideSection();
  }

  renderLineMenuButtons() {
    const section = nodeSelector.selectId(LINE_MENU_BUTTON_SECTION);
    const lines = this.getLines();

    lines.forEach(line => {
      const lineMenubutton = this.getLineMenuButton(line);

      section.append(lineMenubutton);
    });
  }

  getLines() {
    const lines = [];

    this._lines.forEach(
      lineInfo => lineInfo && lines.push(Object.keys(lineInfo)[0])
    );

    return lines;
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

    this.clearTable(SECTION_TABLE);
    this.fillSection(target);
    this.displaySection();
  }

  fillSection(target) {
    const table = nodeSelector.selectId(SECTION_TABLE);
    const section = this.getLineSection(target);

    section.forEach((station, idx) => {
      const row = this.getStationRow();
      const sectionDeleteButton = this.getSectionDeleteButton(station);

      row.childNodes[0].append(idx);
      row.childNodes[1].append(station);
      row.childNodes[2].append(sectionDeleteButton);
      table.append(row);
    });
  }

  getLineSection(line) {
    for (const lineInfo of this._lines) {
      if (!lineInfo) {
        continue;
      }
      if (lineInfo.hasOwnProperty(line)) {
        return lineInfo[line];
      }
    }
  }

  getStationRow() {
    const row = document.createElement('tr');
    const blank = document.createElement('td');

    row.className = SECTION_ROW;
    row.append(blank, blank.cloneNode(true), blank.cloneNode(true));

    return row;
  }

  getSectionDeleteButton(section) {
    const button = document.createElement('button');

    button.className = SECTION_DELETE_BUTTON;
    button.dataset.section = section;
    button.append(SECTION_DELETE_K);

    return button;
  }

  displaySection() {
    const section = nodeSelector.selectId(SECTION_LINE);

    section.classList.remove(HIDE);
  }

  hideSection() {
    const section = nodeSelector.selectId(SECTION_LINE);

    section.classList.add(HIDE);
  }
}
