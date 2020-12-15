import section from "../service/section.service.js";

export default class MapPrintManagerView {
  constructor(parentView) {
    this.MAP_PRINT_CONTAINER_ID = "map";
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

  createMapPrintManagerViewHTML() {
    const mapPrintManagerViewHTML = `<div id=${this.MAP_PRINT_CONTAINER_ID}></div>`;
    return mapPrintManagerViewHTML;
  }

  renderLineMapView() {
    this.parentView.innerHTML = this.createMapPrintManagerViewHTML();

    const lineMapHTML = this.createLineMapHTML();
    document.getElementById(this.MAP_PRINT_CONTAINER_ID).innerHTML = lineMapHTML;
  }
}
