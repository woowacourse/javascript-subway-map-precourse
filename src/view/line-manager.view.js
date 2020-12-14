import line from "../service/line.service.js";
import station from "../service/station.service.js";
import section from "../service/section.service.js";
import {
  createLineTableRowHTML,
  lineManagerViewHTML,
  insertStationOptionHTML,
} from "./template.view.js";

export default class LineManagerView {
  constructor(parentView) {
    this.line = line;
    this.station = station;
    this.section = section;

    this.parentView = parentView;
  }

  renderLineStationSelector() {
    const allStations = this.station.getAllStations();
    const startStationSelectBox = document.getElementById("line-start-station-selector");
    const endStationSelectBox = document.getElementById("line-end-station-selector");

    allStations.forEach((station) => {
      insertStationOptionHTML(startStationSelectBox, station);
      insertStationOptionHTML(endStationSelectBox, station);
    });
  }

  renderLineTable() {
    const allLines = this.line.getAllLines();

    const lineTableHTML = allLines.reduce((lineRowHTML, lineName) => {
      const sections = this.section.getSectionsByLineName(lineName);
      lineRowHTML += createLineTableRowHTML(lineName, sections[0], sections[sections.length - 1]);

      return lineRowHTML;
    }, "");

    document.getElementById("line-table").querySelector("tbody").innerHTML = lineTableHTML;
  }

  renderLineManagerView() {
    this.parentView.innerHTML = lineManagerViewHTML;
    this.renderLineStationSelector();
    this.renderLineTable();
  }

  accessLineNameInputField() {
    return document.getElementById("line-name-input");
  }

  accessLineStartStationSelector() {
    return document.getElementById("line-start-station-selector");
  }

  accessLineEndStationSelector() {
    return document.getElementById("line-end-station-selector");
  }

  resetLineNameInputField() {
    const lineNameInputField = this.accessLineNameInputField();
    lineNameInputField.value = "";
  }
}
