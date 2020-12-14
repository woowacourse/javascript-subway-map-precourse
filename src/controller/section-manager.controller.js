import line from "../service/line.service.js";
import station from "../service/station.service.js";
import section from "../service/section.service.js";
import {
  createSectionLineButtonHTML,
  sectionManagerViewHTML,
  createSelectedSectionLineHTML,
  createSectionRowHTML,
  insertStationOptionHTML,
} from "../common/template.js";
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
  constructor() {
    this.line = line;
    this.station = station;
    this.section = section;
  }

  renderSectionLineMenu() {
    const savedLines = this.line.getAllLines();
    const sectionLineMenuHTML = savedLines.reduce((menuHTML, lineName) => {
      menuHTML += createSectionLineButtonHTML(lineName);
      return menuHTML;
    }, "");

    document.getElementById("section-line-menu").innerHTML = sectionLineMenuHTML;
  }

  renderSectionManagerView() {
    document.getElementById("content").innerHTML = sectionManagerViewHTML;
    this.renderSectionLineMenu();
  }

  renderSelectedSectionLineView(selectedLine) {
    const selectedLineSectionHTML = createSelectedSectionLineHTML(selectedLine);

    document.getElementById("selected-section-line-container").innerHTML = selectedLineSectionHTML;
  }

  renderSectionTable(lineName) {
    const savedSections = this.section.getSectionsByLineName(lineName);
    const sectionTableHTML = savedSections.reduce((sectionRowHTML, stationName, index) => {
      sectionRowHTML += createSectionRowHTML(lineName, stationName, index);
      return sectionRowHTML;
    }, "");

    document.getElementById("section-table").querySelector("tbody").innerHTML = sectionTableHTML;
  }

  renderSectionStationSelector() {
    const allStations = this.station.getAllStations();
    const sectionStationSelector = document.getElementById("section-station-selector");

    allStations.forEach((station) => {
      insertStationOptionHTML(sectionStationSelector, station);
    });
  }

  selectSectionLine(targetButton) {
    const targetLineName = targetButton.dataset.line;
    this.renderSelectedSectionLineView(targetLineName);
    this.renderSectionTable(targetLineName);
    this.renderSectionStationSelector();
  }

  getSectionStationInput() {
    const sectionStationSelector = document.getElementById("section-station-selector");
    const selectedStation = sectionStationSelector.value;

    return selectedStation;
  }

  getSectionOrderInput() {
    const sectionOrderInputField = document.getElementById("section-order-input");
    const sectionOrder = sectionOrderInputField.value;

    return sectionOrder;
  }

  resetSectionOrderInput() {
    const sectionOrderInputField = document.getElementById("section-order-input");
    sectionOrderInputField.value = "";
  }

  validateSectionExist(lineName, stationName) {
    const sectionExist = this.section.findSectionByLineAndStationName(lineName, stationName);
    if (sectionExist) {
      throw new Error(DUPLICATE_SECTION_STATION);
    }
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

  addSection(targetButton) {
    try {
      const targetLine = targetButton.dataset.line;
      const sectionStation = this.getSectionStationInput();
      const sectionOrder = this.getSectionOrderInput();

      this.validateSectionExist(targetLine, sectionStation);
      this.validateSectionOrder(targetLine, sectionOrder);

      this.section.addSection(targetLine, sectionStation, sectionOrder);
      this.renderSectionTable(targetLine);
    } catch (error) {
      this.resetSectionOrderInput();
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

      this.renderSectionTable(targetLine);
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
