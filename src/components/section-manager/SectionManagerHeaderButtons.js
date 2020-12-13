import { getLineNameButton } from "../../utils/templates.js";
export class SectionManagerHeaderButtons {
  constructor(props) {
    this.initializeDOM();
    this.initializeEvents();
    this.render(props);
  }

  initializeDOM = () => {
    this.sectionHeader = document.getElementById(
      "section-header-buttons-container"
    );
  };

  initializeEvents = () => {
    document
      .querySelector("#section-header-buttons-container")
      .addEventListener("click", this.handleLineSection);
  };

  render = ({ lines }) => {
    let buttonsHTML = ``;

    lines.forEach((line) => {
      buttonsHTML += getLineNameButton(line.lineName);
    });
    this.sectionHeader.innerHTML = buttonsHTML;
  };

  handleLineSection = (e) => {
    if (e.target.classList.contains("section-line-menu-button")) {
      console.log(e.target.dataset.name);
    }
  };
}
