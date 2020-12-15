import section from "../service/section.service.js";
import { convertStringToNumber, isPositiveInteger } from "../common/util.js";
import { errorMessage } from "../common/error-message.js";
const {
  INVALID_NUMBER_SECTION_ORDER,
  INVALID_RANGE_SECTION_ORDER,
  DUPLICATE_SECTION_STATION,
  INVALID_DELETE_MIN_SECTION,
  CONFIRM_DELETE,
} = errorMessage;

export default class SectionManager {
  constructor(view) {
    this.section = section;

    this.view = view;
  }

  selectSectionLine(targetButton) {
    const targetLineName = targetButton.dataset.line;
    this.view.renderSelectedSectionLineView(targetLineName);
    this.view.renderSectionTable(targetLineName);
    this.view.renderSectionStationSelector();
  }

  getSectionStationInput() {
    const sectionStationSelector = this.view.accessSectionStationSelector();
    return sectionStationSelector.value;
  }

  getSectionOrderInput() {
    const sectionOrderInputField = this.view.accessSectionOrderInputField();
    return sectionOrderInputField.value;
  }

  validateSectionOrder(lineName, sectionOrder) {
    const sectionOrderNumber = convertStringToNumber(sectionOrder);
    const isValidNumber = isPositiveInteger(sectionOrderNumber);
    const isValidRange = sectionOrderNumber <= this.section.getSectionsByLineName(lineName).length;

    if (!isValidNumber) {
      throw new Error(INVALID_NUMBER_SECTION_ORDER);
    }

    if (!isValidRange) {
      throw new Error(INVALID_RANGE_SECTION_ORDER);
    }
  }

  validateSectionExist(lineName, stationName) {
    const sectionExist = this.section.findSectionByLineAndStationName(lineName, stationName);

    if (sectionExist) {
      throw new Error(DUPLICATE_SECTION_STATION);
    }
  }

  validateSectionInput(lineName, order, stationName) {
    this.validateSectionOrder(lineName, order);
    this.validateSectionExist(lineName, stationName);
  }

  addSection(targetButton) {
    try {
      const targetLine = targetButton.dataset.line;
      const sectionStation = this.getSectionStationInput();
      const sectionOrder = this.getSectionOrderInput();
      this.view.resetSectionInput();
      this.validateSectionInput(targetLine, sectionOrder, sectionStation);

      this.section.addSection(targetLine, sectionStation, sectionOrder);
      this.view.renderSectionTable(targetLine);
    } catch (error) {
      alert(error);
    }
  }

  validateDeleteSectionCount(lineName) {
    const isValidSectionCount = !this.section.hasMinStationCount(lineName);
    if (!isValidSectionCount) {
      throw new Error(INVALID_DELETE_MIN_SECTION);
    }
  }

  deleteSection(lineName, stationName) {
    if (!confirm(CONFIRM_DELETE)) {
      return;
    }

    try {
      this.validateDeleteSectionCount(lineName);
      this.section.removeSection(lineName, stationName);
      this.view.renderSectionTable(lineName);
    } catch (error) {
      alert(error);
    }
  }

  onClickButton(event) {
    const target = event.target;
    if (target.className === this.view.SECTION_LINE_MENU_BUTTON_CLASSNAME) {
      this.selectSectionLine(target);
    }

    if (target.id === this.view.SECTION_ADD_BUTTON_ID) {
      this.addSection(target);
    }

    if (target.className === this.view.SECTION_DELETE_BUTTON_CLASSNAME) {
      const { line, station } = target.parentNode.parentNode.dataset;
      this.deleteSection(line, station);
    }
  }
}
