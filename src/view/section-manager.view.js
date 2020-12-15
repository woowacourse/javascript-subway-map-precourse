import { line } from "../service/line.service.js";
import station from "../service/station.service.js";
import section from "../service/section.service.js";
import SectionManagerTemplate from "./template/section-manager-template.js";

export default class SectionManagerView extends SectionManagerTemplate {
  constructor(parentView) {
    super();
    this.parentView = parentView;

    this.line = line;
    this.station = station;
    this.section = section;
    this.FIRST_ITEM_INDEX = 0;
  }

  accessSectionStationSelector() {
    return document.getElementById(this.SECTION_STATION_SELECTOR_ID);
  }

  accessSectionOrderInputField() {
    return document.getElementById(this.SECTION_ORDER_INPUT_ID);
  }

  renderSectionLineMenu() {
    const savedLines = this.line.getAllLines();
    const sectionLineMenuHTML = savedLines.reduce((menuHTML, lineName) => {
      menuHTML += this.createSectionLineButtonHTML(lineName);
      return menuHTML;
    }, "");

    document.getElementById(this.SECTION_LINE_MENU_CONTAINER_ID).innerHTML = sectionLineMenuHTML;
  }

  renderSectionManagerView() {
    this.parentView.innerHTML = this.createSectionManagerViewHTML();
    this.renderSectionLineMenu();
  }

  renderSelectedSectionLineView(selectedLine) {
    const selectedLineSectionHTML = this.createSelectedSectionLineHTML(selectedLine);

    document.getElementById(
      this.SECTION_LINE_CONTENT_CONTAINER_ID
    ).innerHTML = selectedLineSectionHTML;
  }

  renderSectionTable(lineName) {
    const savedSections = this.section.getSectionsByLineName(lineName);

    const sectionTableHTML = savedSections.reduce((sectionRowHTML, stationName, index) => {
      sectionRowHTML += this.createSectionRowHTML(lineName, stationName, index);
      return sectionRowHTML;
    }, "");

    document
      .getElementById(this.SECTION_TABLE_ID)
      .querySelector("tbody").innerHTML = sectionTableHTML;
  }

  renderSectionStationSelector() {
    const allStations = this.station.getAllStations();
    const sectionStationSelector = this.accessSectionStationSelector();

    allStations.forEach((station) => {
      this.insertStationOptionHTML(sectionStationSelector, station);
    });
  }

  resetSectionOrderInputField() {
    const sectionOrderInputField = this.accessSectionOrderInputField();
    sectionOrderInputField.value = "";
  }

  resetSectionStationSelector() {
    const sectionStationSelector = this.accessSectionStationSelector();
    sectionStationSelector.selectedIndex = this.FIRST_ITEM_INDEX;
  }

  resetSectionInput() {
    this.resetSectionOrderInputField();
    this.resetSectionStationSelector();
  }
}
