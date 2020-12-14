import { DOMs, DOMStrings, dataStrings, strings } from '../doms.js';
import { saveData } from '../index.js';
import { isValidSection, isEndSection, isStartSection, isValidSectionDeletion } from '../valid.js';
import SectionManagerUI from '../views/sectionManagerUI.js';

export default class SectionManager {
  constructor(stations, lines) {
    this.stations = stations;
    this.lines = lines;
    this.UIController = new SectionManagerUI();

    this.setSectionEventListeners();
  }

  setSectionEventListeners() {
    DOMs.SECTION_MANAGER_BUTTON.addEventListener('click', () => {
      this.UIController.openSectionManager(this.lines);
    });
    DOMs.MANAGER_CONTAINER.addEventListener('click', event => {
      this.UIController.selectLine(event, this.stations, this.lines);
    });
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
    try {
      isValidSection(targetLine.stations, stationName, stationOrder);
      this.changeLineListWithAddition(targetLine, stationOrder, stationName);
      this.addSectionInLine(targetLine, stationOrder, stationName);
      saveData(dataStrings.DATA_LINES, this.lines);
      this.UIController.refreshSectionManager(this.stations, this.lines, targetLineName);
    } catch (error) {
      alert(error);
    }
  }

  // 'line list'는 line manager의 노선 목록을 의미함.
  // 노선 목록의 '상행 종점역'과 '하행 종점역'에 변경 사항을 반영하는 메소드
  changeLineListWithAddition(targetLine, stationOrder, stationName) {
    if (isEndSection(targetLine.stations, stationOrder, strings.VALID_ADDITION)) {
      targetLine.end = stationName;
    } else if (isStartSection(stationOrder)) {
      targetLine.start = stationName;
    }
  }

  // 실질적으로 노선 배열에 역(구간)을 추가하는 메소드
  addSectionInLine(targetLine, stationOrder, stationName) {
    targetLine.stations = targetLine.stations
      .slice(0, stationOrder)
      .concat(stationName, targetLine.stations.slice(stationOrder));
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
    try {
      isValidSectionDeletion(targetLine.stations);
      this.changeLineListWithDeletion(targetLine, targetSectionIndex);
      targetLine.stations.splice(targetSectionIndex, 1);
      saveData(dataStrings.DATA_LINES, this.lines);
      this.UIController.refreshSectionManager(this.stations, this.lines, targetLineName);
    } catch (error) {
      alert(error);
    }
  }

  changeLineListWithDeletion(targetLine, targetSectionIndex) {
    if (isEndSection(targetLine.stations, targetSectionIndex, strings.VALID_DELETION)) {
      targetLine.end = targetLine.stations[targetSectionIndex - 1];
    } else if (isStartSection(targetSectionIndex)) {
      targetLine.start = targetLine.stations[targetSectionIndex + 1];
    }
  }
}
