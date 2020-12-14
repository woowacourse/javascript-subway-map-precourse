import { addOptionTag, initSelector } from "../../utils/handleDom.js";
import { isValidLineInfo } from "../../utils/validation.js";

export class LineManagerInput {
  constructor({ getStations, setNewLine, getLines }) {
    this.getStations = getStations;
    this.setNewLine = setNewLine;
    this.getLines = getLines;
    this.initializeDOM();
    this.initializeEvents();
    this.render();
  }

  initializeDOM = () => {
    this.lineNameInput = document.getElementById("line-name-input");
    this.lineStartSelector = document.getElementById(
      "line-start-station-selector"
    );
    this.lineEndSelector = document.getElementById("line-end-station-selector");
    this.lineAddButton = document.getElementById("line-add-button");
  };

  initializeEvents = () => {
    this.lineAddButton.addEventListener("click", this.handleAddLine);
  };

  render = () => {
    const stations = this.getStations();

    initSelector(this.lineStartSelector);
    initSelector(this.lineEndSelector);

    stations.forEach((station) => {
      addOptionTag(this.lineStartSelector, station);
      addOptionTag(this.lineEndSelector, station);
    });
  };

  handleAddLine = () => {
    let lineName = this.lineNameInput.value;
    let start = this.lineStartSelector.value;
    let end = this.lineEndSelector.value;
    let lineNames = this.getLineNames(this.getLines());
    this.setEmptyInput();

    if (!isValidLineInfo(lineName, lineNames, start, end)) {
      return;
    }

    let newLine = [start, end];
    this.setNewLine(lineName, newLine);
  };

  getLineNames = (lines) => {
    return lines.map((line) => {
      return line.lineName;
    });
  };

  setEmptyInput = () => {
    this.lineNameInput.value = "";
    this.lineStartSelector.selectedIndex = 0;
    this.lineEndSelector.selectedIndex = 0;
  };
}
