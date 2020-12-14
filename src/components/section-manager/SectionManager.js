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
    let lines = this.getLines();
    new SectionManagerHeaderButtons({
      lines: lines,
      handleSectionManagerByLine: this.handleSectionManagerByLine,
    });
  };

  handleSectionManagerByLine = (lineName) => {
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
}
