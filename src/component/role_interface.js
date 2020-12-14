import {
  ACTIVE,
  HIDE,
  LINES_LS,
  LINE_MENU_BUTTON_SECTION,
  NONE_K,
  SECTION_LINE,
  SECTION_LINE_MENU_BUTTON,
  SECTION_ROW,
  SECTION_TABLE,
  SECTION_HEADER,
  SELECTORS,
  STATIONS_LS,
  SECTION_DELETE_BUTTON,
  SECTION_DELETE_K,
  SECTION_LINE_TITLE,
  MANAGE_K,
  MAP_PRINT_MANAGER,
  MAP,
} from '../library/constant/constant.js';
import { nodeSelector } from '../util/selector/node_selector.js';

class RoleInterface {
  // get datas in local storage
  getStations() {
    const loadedStations = localStorage.getItem(STATIONS_LS);
    const stations = loadedStations ? JSON.parse(loadedStations) : [];

    return stations;
  }

  getLineInfos() {
    const loadedLines = localStorage.getItem(LINES_LS);
    const lines = loadedLines ? JSON.parse(loadedLines) : [];

    return lines;
  }

  destructureLineInfo(lineInfo) {
    const line = Object.keys(lineInfo)[0];
    const sections = Object.values(lineInfo)[0];

    return { line: line, sections: sections };
  }

  // display contents
  displayContent(targetName, status) {
    const target =
      nodeSelector.selectId(targetName) ?? nodeSelector.selectClass(targetName);

    if (!target) {
      return;
    }
    status === ACTIVE && target.classList.remove(HIDE);
    status === HIDE && target.classList.add(HIDE);
  }

  displayContents(targetClass, status) {
    const targets = nodeSelector.selectClassAll(targetClass);

    if (!targets) {
      return;
    }
    targets.forEach(target => {
      status === ACTIVE && target.classList.remove(HIDE);
      status === HIDE && target.classList.add(HIDE);
    });
  }

  // clear
  clearNode(targetId) {
    const target = nodeSelector.selectId(targetId);

    target.innerHTML = '';
  }

  // handle button event
  clickButton(buttonId, onEvent, binder) {
    const button = nodeSelector.selectId(buttonId);

    button.addEventListener('click', onEvent.bind(binder));
  }

  clickButtons(buttonClass, onEvent, binder) {
    const buttons = nodeSelector.selectClassAll(buttonClass);

    buttons.forEach(button => {
      button.addEventListener('click', onEvent.bind(binder));
    });
  }

  // selector renderer
  renderSelectors() {
    SELECTORS.forEach(selectorId => {
      this.clearNode(selectorId);
      this.renderSelectOptions(selectorId);
    });
  }

  renderSelectOptions(selectorId) {
    const selector = nodeSelector.selectId(selectorId);
    const stations = this.getStations();

    if (stations.length === 0) {
      this.renderSelectOption(selector, NONE_K);

      return;
    }
    for (const station of stations) {
      this.renderSelectOption(selector, station);
    }
  }

  renderSelectOption(selector, value) {
    const option = document.createElement('option');

    option.value = value;
    option.append(value);
    selector.append(option);
  }

  // line menu button renderer
  renderLineMenuButtons() {
    const section = nodeSelector.selectId(LINE_MENU_BUTTON_SECTION);
    const lineInfos = this.getLineInfos();

    this.clearNode(LINE_MENU_BUTTON_SECTION);
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

  // handle line menu button event
  onClickLineMenuButton(event) {
    const target = event.target.dataset.sectionLine;
    const title = nodeSelector.selectId(SECTION_LINE_TITLE);

    title.innerHTML = `${target} ${MANAGE_K}`;
    this.renderSectionLine(target);
  }

  renderSectionLine(target) {
    this.clearNode(SECTION_TABLE);
    this.fillSectionLine(target);
    this.displayContent(SECTION_LINE, ACTIVE);
  }

  fillSectionLine(target) {
    const table = nodeSelector.selectId(SECTION_TABLE);
    const sections = this.getSectionLine(target) ?? [];

    sections.forEach((section, idx) => {
      const row = this.getRow(SECTION_ROW, SECTION_HEADER);
      const button = this.getButton(SECTION_DELETE_BUTTON, SECTION_DELETE_K);

      button.dataset.section = section;
      row.childNodes[0].append(idx);
      row.childNodes[1].append(section);
      row.childNodes[2].append(button);
      table.append(row);
    });
  }

  getSectionLine(line) {
    const lineInfos = this.getLineInfos();

    for (const lineInfo of lineInfos) {
      if (!lineInfo) {
        continue;
      }
      if (lineInfo.hasOwnProperty(line)) {
        return lineInfo[line];
      }
    }
  }

  // map printer
  printMap() {
    this.clearNode(MAP_PRINT_MANAGER);
    for (const lineInfo of this.getLineInfos()) {
      if (!lineInfo) {
        continue;
      }
      const mapSection = nodeSelector.selectId(MAP_PRINT_MANAGER);
      const { line, sections } = this.destructureLineInfo(lineInfo);
      const map = this.getMap(line, sections);

      mapSection.append(map);
    }
    roleInterface.displayContent(MAP, ACTIVE);
  }

  getMap(line, sections) {
    const map = document.createElement('div');
    const heading = document.createElement('h3');
    const list = this.getSectionList(sections);

    map.className = MAP;
    heading.append(line);
    map.append(heading, list);

    return map;
  }

  getSectionList(sections) {
    const list = document.createElement('ul');
    const item = document.createElement('li');

    sections.forEach(section => {
      item.innerHTML = section;
      list.append(item.cloneNode(true));
    });

    return list;
  }

  // table contents getter
  getRow(className, headerClass) {
    const tableHeaders = nodeSelector.selectClassAll(headerClass);
    const row = document.createElement('tr');
    const blank = document.createElement('td');
    let columnLength = tableHeaders.length;

    row.className = className;
    while (columnLength--) {
      row.append(blank.cloneNode(true));
    }

    return row;
  }

  getButton(className, content) {
    const button = document.createElement('button');

    button.className = className;
    button.append(content);

    return button;
  }
}

export const roleInterface = new RoleInterface();
