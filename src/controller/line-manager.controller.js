import line from "../service/line.service.js";
import { createLineTableRowHTML, lineManagerViewHTML } from "../common/template.js";
import { errorMessage } from "../common/error-message.js";
const { INVALID_LENGTH_LINE_NAME, DUPLICATE_LINE_NAME, INVALID_START_END_STATION } = errorMessage;
export default class LineManager {
  constructor() {
    this.line = line;
    this.MIN_LINE_NAME_LENGTH = 3;
  }

  renderLineTable() {
    const allLines = this.line.getAllLines();

    const lineTableHTML = allLines.reduce((lineRowHTML, lineName) => {
      const sections = this.line.getSectionsByLineName(lineName);
      lineRowHTML += createLineTableRowHTML(lineName, sections[0], sections[sections.length - 1]);

      return lineRowHTML;
    }, "");

    document.getElementById("line-table").querySelector("tbody").innerHTML = lineTableHTML;
  }

  renderLineManagerView() {
    document.getElementById("content").innerHTML = lineManagerViewHTML;
    this.renderLineTable();
  }

  getLineNameInput() {
    const lineNameInputField = document.getElementById("line-name-input");
    const lineName = lineNameInputField.value;

    return lineName;
  }

  getLineStartStationInput() {
    const startStationSelector = document.getElementById("line-name-input");
    const startStationInput = startStationSelector.value;

    return startStationInput;
  }

  getLineEndStationInput() {
    const endStationSelector = document.getElementById("line-name-input");
    const endStationInput = endStationSelector.value;

    return endStationInput;
  }

  validateLineName(lineName) {
    const isValidLength = lineName.length >= this.MIN_LINE_NAME_LENGTH;
    const isUnique = !this.line.hasSameName(lineName);

    if (!isValidLength) {
      throw new Error(INVALID_LENGTH_LINE_NAME);
    }

    if (!isUnique) {
      throw new Error(DUPLICATE_LINE_NAME);
    }
  }

  validateStartEndStation(startStation, endStation) {
    if (startStation === endStation) {
      throw new Error(INVALID_START_END_STATION);
    }
  }
}
