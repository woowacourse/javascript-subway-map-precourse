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
    console.log(lines);
    lines.forEach((line) => {
      console.log(line);
      mapHTML += printLine(line);
      console.log(mapHTML);
    });
    this.mapPrintManager.innerHTML = mapHTML;
  };
}
