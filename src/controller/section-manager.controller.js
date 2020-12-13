import line from "../service/line.service.js";
import station from "../service/station.service.js";
import {
  createSectionLineButtonHTML,
  sectionManagerViewHTML,
  createSelectedSectionLineHTML,
  createSectionRowHTML,
  insertStationOptionHTML,
} from "../common/template.js";

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

  onClickButton(event) {
    const target = event.target;

    if (target.className === "section-line-menu-button") {
      this.selectSectionLine(target);
    }
  }
}
