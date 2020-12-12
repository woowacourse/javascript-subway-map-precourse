import { addOptionTag, initSelector } from "../../utils/handleDom.js";

export class LineManagerInput {
  constructor({ getStations }) {
    this.getStations = getStations;
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

  handleAddLine = () => {};
}
