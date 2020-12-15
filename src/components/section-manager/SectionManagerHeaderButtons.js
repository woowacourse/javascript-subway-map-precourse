import { getLineNameButton } from "../../utils/templates.js";
export class SectionManagerHeaderButtons {
  constructor(props) {
    this.renderSectionBodyByLine = props.renderSectionBodyByLine;
    this.getLines = props.getLines;
    this.initializeDOM();
    this.initializeEvents();
  }

  initializeDOM = () => {
    this.sectionHeader = document.querySelector(
      "#section-header-buttons-container"
    );
  };

  initializeEvents = () => {
    this.sectionHeader.addEventListener("click", this.handleLineSection);
  };

  render = () => {
    let lines = this.getLines();
    let buttonsHTML = ``;

    lines.forEach((line) => {
      buttonsHTML += getLineNameButton(line.lineName);
    });
    this.sectionHeader.innerHTML = buttonsHTML;
  };

  handleLineSection = (e) => {
    if (e.target.classList.contains("section-line-menu-button")) {
      this.renderSectionBodyByLine(e.target.dataset.name);
    }
  };
}
