import line from "../service/line.service.js";
import {
  createSectionLineButtonHTML,
  sectionManagerViewHTML,
  createSelectedSectionLineHTML,
} from "../common/template.js";

export default class SectionManager {
  constructor() {
    this.line = line;
  }

  renderSectionLineMenu() {
    const savedLines = this.line.getAllLines();
    const sectionLineMenuHTML = savedLines.reduce((menuHTML, lineName) => {
      menuHTML += createSectionLineButtonHTML(lineName);
      return menuHTML;
    }, "");

    document.getElementById("section-line-menu").innerHTML = sectionLineMenuHTML;
  }

  renderSelectedSectionLineView(selectedLine) {
    const selectedLineSectionHTML = createSelectedSectionLineHTML(selectedLine);

    document.getElementById("selected-section-line-container").innerHTML = selectedLineSectionHTML;
  }

  selectSectionLine(targetButton) {
    const targetLineName = targetButton.dataset.line;
    this.renderSelectedSectionLineView(targetLineName);
  }

  renderSectionManagerView() {
    document.getElementById("content").innerHTML = sectionManagerViewHTML;
    this.renderSectionLineMenu();
  }

  onClickButton(event) {
    const target = event.target;

    if (target.className === "section-line-menu-button") {
      this.selectSectionLine(target);
    }
  }
}
