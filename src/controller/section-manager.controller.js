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

  addSection(targetButton) {
    try {
      const targetLine = targetButton.dataset.line;
      const sectionStation = this.getSectionStationInput();
      const sectionOrder = this.getSectionOrderInput();
      this.view.resetSectionOrderInputField();

      this.validateSectionOrder(targetLine, sectionOrder);
      this.validateSectionExist(targetLine, sectionStation);

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

  deleteSection(targetButton) {
    try {
      const targetRow = targetButton.parentNode.parentNode;
      const targetLine = targetRow.dataset.line;
      const targetStation = targetRow.dataset.station;
      this.validateDeleteSectionCount(targetLine);

      this.section.removeSection(targetLine, targetStation);

      this.view.renderSectionTable(targetLine);
    } catch (error) {
      alert(error);
    }
  }

  onClickButton(event) {
    const target = event.target;
    if (target.className === "section-line-menu-button") {
      this.selectSectionLine(target);
    }

    if (target.id === "section-add-button") {
      this.addSection(target);
    }

    if (target.className === "section-delete-button") {
      if (confirm(CONFIRM_DELETE)) {
        this.deleteSection(target);
      }
    }
  }
}
