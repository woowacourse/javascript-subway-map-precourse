import section from "../service/section.service.js";
import { mapPrintManagerViewHTML } from "./template.view.js";

export default class MapPrintManagerView {
  constructor(parentView) {
    this.parentView = parentView;

    this.section = section;
  }

  createLineSectionHTML(lineName, sections) {
    const sectionItemHTML = sections.reduce((itemHTML, station) => {
      itemHTML += `<li>${station}</li>`;
      return itemHTML;
    }, "");

    const lineSectionHTML = `
      <h3> ${lineName} </h3>
      <ul> ${sectionItemHTML} </ul>
    `;

    return lineSectionHTML;
  }

  createLineMapHTML() {
    const allLines = this.section.getAllLines();

    const lineMapHTML = allLines.reduce((lineSectionHTML, lineName) => {
      const sections = this.section.getSectionsByLineName(lineName);
      lineSectionHTML += this.createLineSectionHTML(lineName, sections);

      return lineSectionHTML;
    }, "");

    return lineMapHTML;
  }

  renderLineMapView() {
    this.parentView.innerHTML = mapPrintManagerViewHTML;

    const lineMapHTML = this.createLineMapHTML();
    document.getElementById("map").innerHTML = lineMapHTML;
  }
}
