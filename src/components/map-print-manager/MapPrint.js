import { printLine } from "../../utils/templates.js";
export class MapPrint {
  constructor({ getLines }) {
    this.getLines = getLines;
    this.initializeDOM();
    this.render();
  }

  initializeDOM = () => {
    this.mapPrintManager = document.getElementById(
      "map-print-manager-container"
    );
  };

  render = () => {
    let lines = this.getLines();
    let mapHTML = ``;
    lines.forEach((line) => {
      mapHTML += printLine(line);
    });
    this.mapPrintManager.innerHTML = mapHTML;
  };
}
