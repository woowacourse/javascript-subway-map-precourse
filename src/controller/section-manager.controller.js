import line from "../service/line.service.js";
import station from "../service/station.service.js";
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
    const savedSections = this.line.getSectionsByLineName(lineName);
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

  validateSectionExist(lineName, stationName) {
    const sectionExist = this.line.findSectionByLineAndStation(lineName, stationName);
    if (sectionExist) {
      throw new Error(DUPLICATE_SECTION_STATION);
    }
  }

  addSection(targetButton) {
    try {
      const targetLine = targetButton.dataset.line;
      const sectionStation = this.getSectionStationInput();
      const sectionOrder = this.getSectionOrderInput();

      this.validateSectionExist(targetLine, sectionStation);
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
  }
}
