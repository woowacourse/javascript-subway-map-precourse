import {
  getLineTableHeader,
  addRowInListTable,
} from "../../utils/handleDom.js";

export class LineManagerList {
  constructor({ getLines }) {
    this.getLines = getLines;
    this.initializeDOM();
    this.render();
  }

  initializeDOM = () => {
    this.lineTable = document.getElementById("line-table");
  };

  render = () => {
    this.lineTable.innerHTML = getLineTableHeader();
    this.lines = this.getLines();
    this.lines.forEach((line) => {
      let lastIndex = line.stations.length - 1;

      addRowInListTable(
        this.lineTable,
        line.lineName,
        line.stations[0],
        line.stations[lastIndex]
      );
    });
  };
}
