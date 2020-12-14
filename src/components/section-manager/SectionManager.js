import { SectionManagerHeaderButtons } from "./SectionManagerHeaderButtons.js";
import { getLineTableHeader } from "../../utils/templates.js";
import { SectionManagerInput } from "./SectionManagerInput.js";
export class SectionManager {
  constructor({ getLines, getStations }) {
    this.getLines = getLines;
    this.getStations = getStations;
    this.render();
  }

  render = () => {
    this.renderHeader();
  };

  renderHeader = () => {
    this.sectionHeader = new SectionManagerHeaderButtons({
      getLines: this.getLines,
      renderSectionManagerByLine: this.renderSectionManagerByLine,
    });
  };

  renderSectionManagerByLine = (lineName) => {
    let line = this.getLineMatchedWith(lineName);
    new SectionManagerInput({
      getStations: this.getStations,
      lineName: lineName,
    });
    // new SectionManagerList({ line: line });
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
}
