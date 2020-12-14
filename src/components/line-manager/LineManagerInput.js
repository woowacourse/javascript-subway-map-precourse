import { addOptionTag, initSelector } from "../../utils/handleDom.js";
import { isValidLineInfo } from "../../utils/validation.js";

export class LineManagerInput {
  constructor({ getStations, setNewLine }) {
    this.getStations = getStations;
    this.setNewLine = setNewLine;
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

    this.initInputStatus();
    if (!isValidLineInfo(lineName, start, end)) {
      return;
    }
    let newLine = [start, end];
    this.setNewLine(lineName, newLine);
  };

  initInputStatus = () => {
    this.lineNameInput.value = "";
    this.lineStartSelector.selectedIndex = 0;
    this.lineEndSelector.selectedIndex = 0;
  };
}
