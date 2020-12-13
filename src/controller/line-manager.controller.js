import line from "../service/line.service.js";
import station from "../service/station.service.js";
import {
  createLineTableRowHTML,
  lineManagerViewHTML,
  insertStationOptionHTML,
} from "../common/template.js";
import { errorMessage } from "../common/error-message.js";
const { INVALID_LENGTH_LINE_NAME, DUPLICATE_LINE_NAME, INVALID_START_END_STATION } = errorMessage;
export default class LineManager {
  constructor() {
    this.line = line;
    this.station = station;
    this.MIN_LINE_NAME_LENGTH = 3;
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
      const sections = this.line.getSectionsByLineName(lineName);
      lineRowHTML += createLineTableRowHTML(lineName, sections[0], sections[sections.length - 1]);

      return lineRowHTML;
    }, "");

    document.getElementById("line-table").querySelector("tbody").innerHTML = lineTableHTML;
  }

  renderLineManagerView() {
    document.getElementById("content").innerHTML = lineManagerViewHTML;
    this.renderLineStationSelector();
    this.renderLineTable();
  }

  getLineNameInput() {
    const lineNameInputField = document.getElementById("line-name-input");
    const lineName = lineNameInputField.value;

    return lineName;
  }

  resetlineNameInputField() {
    const lineNameInputField = document.getElementById("line-name-input");
    lineNameInputField.value = "";
  }

  getLineStartStationInput() {
    const startStationSelector = document.getElementById("line-start-station-selector");
    const startStationInput = startStationSelector.value;

    return startStationInput;
  }

  getLineEndStationInput() {
    const endStationSelector = document.getElementById("line-end-station-selector");
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

  addLine() {
    const lineName = this.getLineNameInput();
    const startStation = this.getLineStartStationInput();
    const endStation = this.getLineEndStationInput();

    try {
      this.validateLineName(lineName);
      this.validateStartEndStation(startStation, endStation);
      this.line.createLine(lineName, startStation, endStation);
      this.renderLineTable();
    } catch (message) {
      alert(message);
      this.resetLineNameInput();
    }
  }

  onClickButton(event) {
    const target = event.target;

    if (target.id === "line-add-button") {
      this.addLine();
    }
  }
}
