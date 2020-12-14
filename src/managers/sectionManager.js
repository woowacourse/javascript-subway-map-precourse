import { DOMs, DOMCtrl, DOMStrings, strings } from '../doms.js';
import { dataStrings, saveData } from '../index.js';
import { isValidSection, isEndSection, isStartSection, isValidSectionDeletion } from '../valid.js';

export default class SectionManager {
  constructor(stations, lines) {
    this.stations = stations;
    this.lines = lines;

    this.setSectionEventListeners();
  }

  setSectionEventListeners() {
    DOMs.SECTION_MANAGER_BUTTON.addEventListener('click', this.openSectionManager.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.selectLine.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.addSectionByClick.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('keydown', this.addSectionByEnterKey.bind(this));
    DOMs.MANAGER_CONTAINER.addEventListener('click', this.deleteSectionButtonClick.bind(this));
  }

  addSectionByClick(event) {
    const {
      target: { id },
    } = event;
    if (id === DOMStrings.SECTION_ADD_BUTTON) {
      this.addSection();
    }
  }

  addSectionByEnterKey(event) {
    const {
      key,
      target: { id },
    } = event;
    if (key === 'Enter') {
      if (id === DOMStrings.SECTION_ORDER_INPUT) {
        this.addSection();
      }
    }
  }

  addSection() {
    const targetLineName = document.getElementById(DOMStrings.SECTION_HEADER).dataset[dataStrings.DATA_TARGET];
    const targetLineIndex = this.lines.findIndex(line => line.lineName === targetLineName);
    const targetLine = this.lines[targetLineIndex];
    const stationOrder = +document.getElementById(DOMStrings.SECTION_ORDER_INPUT).value.trim();
    const stationName = document.getElementById(DOMStrings.SECTION_STATION_SELECTOR).value;
    if (isValidSection(targetLine.stations, stationName, stationOrder)) {
      this.changeLineListAfterAddition(targetLine, stationOrder, stationName);
      targetLine.stations = targetLine.stations
        .slice(0, stationOrder)
        .concat(stationName, targetLine.stations.slice(stationOrder));
      saveData(dataStrings.DATA_LINES, JSON.stringify(this.lines));
      this.openSectionManager.bind(this)();
      this.openSection.bind(this)(targetLineName, targetLineIndex);
    }
  }

  changeLineListAfterAddition(targetLine, stationOrder, stationName) {
    if (isEndSection(targetLine.stations, stationOrder, strings.VALID_ADDITION)) {
      targetLine.end = stationName;
    } else if (isStartSection(stationOrder)) {
      targetLine.start = stationName;
    }
  }

  deleteSectionButtonClick(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.SECTION_DELETE_BUTTON) {
      if (confirm(strings.CONFIRM_DELETE_FROM_LINE)) {
        const targetSectionIndex = +event.target.dataset[dataStrings.DATA_INDEX];
        this.deleteSection(targetSectionIndex);
      }
    }
  }

  deleteSection(targetSectionIndex) {
    const targetLineName = document.getElementById(DOMStrings.SECTION_HEADER).dataset[dataStrings.DATA_TARGET];
    const targetLineIndex = this.lines.findIndex(line => line.lineName === targetLineName);
    const targetLine = this.lines[targetLineIndex];
    if (isValidSectionDeletion(targetLine.stations)) {
      this.changeLineListAfterDeletion(targetLine, targetSectionIndex);
      targetLine.stations.splice(targetSectionIndex, 1);
      saveData(dataStrings.DATA_LINES, JSON.stringify(this.lines));
      this.openSectionManager.bind(this)();
      this.openSection.bind(this)(targetLineName, targetLineIndex);
    }
  }

  changeLineListAfterDeletion(targetLine, targetSectionIndex) {
    if (isEndSection(targetLine.stations, targetSectionIndex, strings.VALID_DELETION)) {
      targetLine.end = targetLine.stations[targetSectionIndex - 1];
    } else if (isStartSection(targetSectionIndex)) {
      targetLine.start = targetLine.stations[targetSectionIndex + 1];
    }
  }

  selectLine(event) {
    const {
      target: { className },
    } = event;
    if (className === DOMStrings.SECTION_LINE_MENU_BUTTON) {
      const lineSelect = event.target.dataset['line'];
      const lineIndex = this.lines.findIndex(line => line.lineName === lineSelect);
      this.openSection.bind(this)(lineSelect, lineIndex);
    }
  }

  openSectionManager() {
    const sectionContainer = `
      <div id="${DOMStrings.SECTION_CONTAINER}"><h2>${strings.SECTION_SELECT_TITLE}</h2>
        ${this.lines
          .map(
            line =>
              `<button class="${DOMStrings.SECTION_LINE_MENU_BUTTON}" 
              data-${dataStrings.DATA_LINE}="${line.lineName}">${line.lineName}</button>`
          )
          .join(' ')}
        <div id="${DOMStrings.SECTION_MANAGER}"></div>
      </div>
    `;
    DOMCtrl.clearManagerContainer();
    DOMs.MANAGER_CONTAINER.innerHTML = sectionContainer;
  }

  openSection(lineSelect, lineIndex) {
    const sectionManager = `
      <h2 id="${DOMStrings.SECTION_HEADER}" data-${dataStrings.DATA_TARGET}="${lineSelect}">
        ${lineSelect} ${strings.MANAGE}</h2>
      <h3>${strings.SECTION_ADD_TITLE}</h3>
      ${this.getSectionSelector(this.stations)}
      <input type="number" id="${DOMStrings.SECTION_ORDER_INPUT}" placeholder="${strings.ORDER}">
      <button id="${DOMStrings.SECTION_ADD_BUTTON}">${strings.ADD}</button><br><br><br>
      ${this.getSectionList(this.lines[lineIndex].stations)}
    `;
    document.getElementById(DOMStrings.SECTION_MANAGER).innerHTML = sectionManager;
  }

  getSectionSelector(stations) {
    return `
      <select id="${DOMStrings.SECTION_STATION_SELECTOR}">
        ${stations.map(station => `<option>${station}</option>`).join('')}
      </select>
    `;
  }

  getSectionList(stations) {
    return `
      <table id="${DOMStrings.SECTION_LIST_TABLE}">
        ${this.getSectionListHeader()}
        ${stations.map((station, index) => this.getSectionListContent(station, index)).join('')}
      </table>
    `;
  }

  getSectionListHeader() {
    return `
      <tr>
        <th><b>${strings.ORDER}</b></th>
        <th><b>${strings.NAME}</b></th>
        <th><b>${strings.SETTING}</b></th>
      </tr>
    `;
  }

  getSectionListContent(station, index) {
    return `
      <tr>
        <td>${index}</td>
        <td>${station}</td>
        <td><button class="${DOMStrings.SECTION_DELETE_BUTTON}" data-${dataStrings.DATA_INDEX}="${index}">
          ${strings.SECTION_DELETE}</button></td>
      </tr>
    `;
  }
}
