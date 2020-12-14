import { printLine } from "../../utils/templates.js";
import { displayShow, displayHide } from "../../utils/handleDom.js";
export class MapPrint {
  id = "map-print-manager-container";
  constructor(props) {
    this.getLines = props.getLines;
    this.initializeDOM();
  }

  initializeDOM = () => {
    this.mapPrintManager = document.getElementById(
      "map-print-manager-container"
    );
  };

  render = (props) => {
    let lines = this.getLines();
    let mapHTML = ``;
    if (props.isShow) {
      displayShow(this.mapPrintManager);
    } else {
      displayHide(this.mapPrintManager);
    }

    lines.forEach((line) => {
      mapHTML += printLine(line);
    });
    this.mapPrintManager.innerHTML = mapHTML;
  };
}
