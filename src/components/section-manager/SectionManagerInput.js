import { addOptionTag, initSelector } from "../../utils/handleDom.js";
import { isValidSectionInfo } from "../../utils/validation.js";
export class SectionManagerInput {
  constructor({ getStations, addStationInLine, getLines }) {
    this.getStations = getStations;
    this.addStationInLine = addStationInLine;
    this.getLines = getLines;
    this.initializeDOM();
    this.initializeEvents();
  }

  initializeDOM = () => {
    this.sectionStationSelector = document.getElementById(
      "section-station-selector"
    );
    this.header = document.getElementById("line-name-header");
    this.sectionAddButton = document.getElementById("section-add-button");
    this.sectionInput = document.getElementById("section-order-input");
  };

  initializeEvents = () => {
    this.sectionAddButton.addEventListener(
      "click",
      this.handleAddStaionByOrder
    );
  };

  render = ({ lineName }) => {
    this.lineName = lineName;
    this.header.innerHTML = `${lineName} 관리`;

    this.updateStations();
  };

  updateStations = () => {
    this.stations = this.getStations();
    console.log("fddfsdfss");
    initSelector(this.sectionStationSelector);
    this.stations.forEach((station) => {
      addOptionTag(this.sectionStationSelector, station);
    });
  };

  handleAddStaionByOrder = () => {
    let order = this.sectionInput.value;
    let station = this.sectionStationSelector.value;
    let line = this.getLines().filter((line) => {
      return line.lineName === this.lineName;
    })[0];

    if (!isValidSectionInfo(order, station, line.stations)) {
      return;
    }
    this.addStationInLine(order, station, this.lineName);
  };
}
