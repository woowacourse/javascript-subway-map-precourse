import { SectionManagerHeaderButtons } from "./SectionManagerHeaderButtons.js";
import { getLineTableHeader } from "../../utils/templates.js";
import { showDOM } from "../../utils/handleDom.js";
import { SectionManagerInput } from "./SectionManagerInput.js";
export class SectionManager {
  constructor({ getLines, getStations }) {
    this.getLines = getLines;
    this.getStations = getStations;
    this.render();
  }

  render = () => {
    this.sectionManagerBody = document.getElementById(
      "section-inputs-container-by-lines"
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
    // new SectionManagerList({ line: line });
  };

  updateSectionManagerByLine = (lineName) => {
    let line = this.getLineMatchedWith(lineName);
    showDOM(this.sectionManagerBody);
    this.sectionManagerInput.render({ lineName: lineName });
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

  addStationInLine = (order, station, lineName) => {
    let line = this.getLines().filter((line) => {
      return line.lineName === lineName;
    });

    let newLine = line.stations.splice(order, 0, station);
    console.log(newLine);
  };
}
