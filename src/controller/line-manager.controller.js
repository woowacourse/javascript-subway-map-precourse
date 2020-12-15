import { line } from "../service/line.service.js";
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

    this.minLineNameLength = line.MIN_NAME_LENGTH;
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
    const isValidLength = lineName.length >= this.minLineNameLength;
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

  validateLineInput(lineName, startStation, endStation) {
    this.validateLineName(lineName);
    this.validateStartEndStation(startStation, endStation);
  }

  addLine() {
    try {
      const lineName = this.getLineNameInput();
      const startStation = this.getLineStartStationInput();
      const endStation = this.getLineEndStationInput();
      this.view.resetLineInput();
      this.validateLineInput(lineName, startStation, endStation);

      this.line.createLine(lineName, startStation, endStation);
      this.view.renderLineTable();
    } catch (error) {
      alert(error);
    }
  }

  deleteLine(lineName) {
    if (!confirm(CONFIRM_DELETE)) {
      return;
    }

    this.line.deleteLine(lineName);
    this.view.renderLineTable();
  }

  onClickButton(event) {
    const target = event.target;

    if (target.id === this.view.LINE_ADD_BUTTON_ID) {
      this.addLine();
    }

    if (target.className === this.view.LINE_DELETE_BUTTON_CLASSNAME) {
      const line = target.parentNode.parentNode.dataset.line;
      this.deleteLine(line);
    }
  }
}
