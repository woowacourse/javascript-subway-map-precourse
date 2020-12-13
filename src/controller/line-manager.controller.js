import line from "../service/line.service.js";
import { createLineTableRowHTML, lineManagerViewHTML } from "../common/template.js";

export default class LineManager {
  constructor() {
    this.line = line;
  }

  renderLineTable() {
    const allLines = this.line.getAllLines();

    const lineTableHTML = allLines.reduce((lineRowHTML, lineName) => {
      const sections = this.line.getSectionsByLineName(lineName);
      lineRowHTML += createLineTableRowHTML(lineName, sections[0], sections[sections.length - 1]);

      return lineRowHTML;
    }, "");

    document.getElementById("line-table").querySelector("tbody").innerHTML = lineTableHTML;
  }

  renderLineManagerView() {
    document.getElementById("content").innerHTML = lineManagerViewHTML;
    this.renderLineTable();
  }
}
