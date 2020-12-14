import line from "../service/line.service.js";
import station from "../service/station.service.js";
import section from "../service/section.service.js";
import {
  createSectionLineButtonHTML,
  sectionManagerViewHTML,
  createSelectedSectionLineHTML,
  createSectionRowHTML,
  insertStationOptionHTML,
} from "./template.view.js";

export default class SectionManagerView {
  constructor(parentView) {
    this.line = line;
    this.station = station;
    this.section = section;

    this.parentView;
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

  accessSectionStationSelector() {
    return document.getElementById("section-station-selector");
  }

  accessSectionOrderInputField() {
    return document.getElementById("section-order-input");
  }

  resetSectionOrderInputField() {
    const sectionOrderInputField = this.accessSectionOrderInputField();
    sectionOrderInputField.value = "";
  }
}
