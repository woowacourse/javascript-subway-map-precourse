import { addRowInListTable } from "../../utils/handleDom.js";
import { getLineTableHeader } from "../../utils/templates.js";
import { MESSAGE, FIELD } from "../../constants/constants.js";

export class LineManagerList {
  constructor({ getLines, deleteLine }) {
    this.getLines = getLines;
    this.deleteLine = deleteLine;
    this.initializeDOM();
    this.initializeEvents();
    this.render();
  }

  initializeDOM = () => {
    this.lineTable = document.getElementById("line-table");
  };

  initializeEvents = () => {
    document
      .querySelector("#line-table")
      .addEventListener("click", this.handleDeleteLine);
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
        line.stations[lastIndex],
        FIELD.LINE
      );
    });
  };

  handleDeleteLine = (e) => {
    let confirmDelete = confirm(MESSAGE.DELETE_DOUBLE_CHECK);
    if (confirmDelete) {
      this.deleteLine(e.target.dataset.line);
      this.render();
    }
  };
}
