import line from "../service/line.service.js";
import { errorMessage } from "../common/error-message.js";
const {
  INVALID_LENGTH_LINE_NAME,
  DUPLICATE_LINE_NAME,
  INVALID_START_END_STATION,
  CONFIRM_DELETE,
} = errorMessage;

export default class LineManager {
  constructor(view) {
    this.line = line;
    this.view = view;

    this.MIN_LINE_NAME_LENGTH = 3;
  }

  getLineNameInput() {
    const lineNameInputField = this.view.accessLineNameInputField();
    return lineNameInputField.value;
  }

  getLineStartStationInput() {
    const startStationSelector = this.view.accessLineStartStationSelector();
    return startStationSelector.value;
  }

  getLineEndStationInput() {
    const endStationSelector = this.view.accessLineEndStationSelector();
    return endStationSelector.value;
  }

  validateLineName(lineName) {
    const isValidLength = lineName.length >= this.MIN_LINE_NAME_LENGTH;
    const isExistName = this.line.findLineByName(lineName).length;

    if (!isValidLength) {
      throw new Error(INVALID_LENGTH_LINE_NAME);
    }

    if (isExistName) {
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
      this.view.renderLineTable();
    } catch (error) {
      alert(error);
      this.view.resetLineNameInputField();
    }
  }

  deleteLine(targetButton) {
    const targetRow = targetButton.parentNode.parentNode;
    const targetLine = targetRow.dataset.line;
    this.line.deleteLine(targetLine);
    this.view.renderLineTable();
  }

  onClickButton(event) {
    const target = event.target;

    if (target.id === "line-add-button") {
      this.addLine();
    }
    if (target.className === "line-delete-button") {
      if (confirm(CONFIRM_DELETE)) {
        this.deleteLine(target);
      }
    }
  }
}
