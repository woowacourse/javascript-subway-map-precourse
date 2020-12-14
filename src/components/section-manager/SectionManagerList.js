import { addRowInSectionTable } from "../../utils/handleDom.js";
import { getSectionTableHeader } from "../../utils/templates.js";
import { FIELD, MESSAGE } from "../../constants/constants.js";

export class SectionManagerList {
  constructor({ getLines, deleteStationInLine }) {
    this.getLines = getLines;
    this.deleteStationInLine = deleteStationInLine;
    this.initializeDOM();
    this.initializeEvents();
  }

  initializeDOM = () => {
    this.sectionTable = document.querySelector("#section-table");
  };
  initializeEvents = () => {
    this.sectionTable.addEventListener("click", this.handleDeleteStation);
  };

  render = ({ lineName }) => {
    this.sectionTable.innerHTML = getSectionTableHeader();
    this.lineName = lineName;
    let lines = this.getLines();

    lines.forEach((line) => {
      if (line.lineName === this.lineName) {
        this.makeTableBody(line.stations);
      }
    });
  };

  makeTableBody = (stations) => {
    for (let i = 0; i < stations.length; i++) {
      addRowInSectionTable(this.sectionTable, i, stations[i], FIELD.SECTION);
    }
  };

  handleDeleteStation = (e) => {
    let confirm = confirm(MESSAGE.DELETE_DOUBLE_CHECK);
    if (confirm) {
      let order = e.target.dataset.section;
      this.deleteStationInLine(order);
    }
  };
}
