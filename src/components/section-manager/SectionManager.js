import { SectionManagerHeaderButtons } from "./SectionManagerHeaderButtons.js";
import { showDOM } from "../../utils/handleDom.js";
import { SectionManagerInput } from "./SectionManagerInput.js";
import { SectionManagerList } from "./SectionManagerList.js";
export class SectionManager {
  constructor({ getLines, getStations, setLines }) {
    this.getLines = getLines;
    this.getStations = getStations;
    this.setLines = setLines;
    this.render();
  }

  render = () => {
    this.sectionManagerContaionerByLines = document.getElementById(
      "section-inputs-container-by-lines"
    );
    this.sectionManagerListContainer = document.getElementById(
      "section-manager-list-container"
    );
    this.renderHeader();
    this.renderInputContainer();
  };

  renderHeader = () => {
    this.sectionHeader = new SectionManagerHeaderButtons({
      getLines: this.getLines,
      updateSectionManagerByLine: this.updateSectionManagerByLine,
    });
  };

  renderInputContainer = () => {
    this.sectionManagerInput = new SectionManagerInput({
      getStations: this.getStations,
      addStationInLine: this.addStationInLine,
      getLines: this.getLines,
    });
    this.sectionManagerList = new SectionManagerList({
      deleteStationInLine: this.deleteStationInLine,
      getLines: this.getLines,
    });
  };

  updateSectionManagerByLine = (lineName) => {
    // let line = this.getLineMatchedWith(lineName);
    showDOM(this.sectionManagerContaionerByLines);
    showDOM(this.sectionManagerListContainer);
    this.sectionManagerInput.render({ lineName: lineName });
    this.sectionManagerList.render({ lineName: lineName });
  };

  getLineMatchedWith = (lineName) => {
    let lines = this.getLines();
    return lines.filter((line) => {
      line.lineName === lineName;
    });
  };

  updateHeaderButtons = () => {
    this.sectionHeader.render();
  };

  updateStationsInInput = () => {
    this.sectionManagerInput.updateStations();
  };

  addStationInLine = (order, station, lineName) => {
    let lines = this.getLines();

    lines.forEach((line) => {
      if (line.lineName === lineName) {
        let newStations = line.stations;
        newStations.splice(order, 0, station);
        line.stations = newStations;
      }
    });
    this.setLines(lines);
  };

  deleteStationInLine = (order, lineName) => {
    let lines = this.getLines();

    lines.forEach((line) => {
      if (line.lineName === lineName) {
        let newStations = line.stations;
        newStations.splice(order, 1);
        line.stations = newStations;
      }
    });
    this.setLines(lines);
  };
}
