import { LineManagerInput } from "./LineManagerInput.js";
import { LineManagerList } from "./LineManagerList.js";
import { displayShow, displayHide } from "../../utils/handleDom.js";

export class LineManager {
  id = "line-manager-container";
  constructor(props) {
    this.setLines = props.setLines;
    this.getLines = props.getLines;
    this.initializeDOM(props);
  }

  initializeDOM = (props) => {
    this.manager = document.getElementById("line-manager-container");
    this.lineManagerInput = new LineManagerInput({
      ...props,
      addNewLines: this.addNewLines,
    });
    this.lineManagerList = new LineManagerList({
      ...props,
      deleteLine: this.deleteLine,
    });
  };

  render = (props) => {
    if (props.isShow) {
      displayShow(this.manager);
    } else {
      displayHide(this.manager);
    }

    this.lineManagerInput.render();
    this.lineManagerList.render();
  };

  updateStations = () => {
    this.lineManagerInput.render();
  };

  updateLines = () => {
    this.lineManagerList.render();
  };

  addNewLines = (lineName, newLine) => {
    this.setNewLine(lineName, newLine);
    this.lineManagerList.render();
  };

  setNewLine = (lineName, newLines) => {
    let lines = this.getLines();
    let newLine = { lineName: lineName, stations: newLines };

    lines.push(newLine);
    this.setLines(lines);
  };

  deleteLine = (lineName) => {
    let lines = this.getLines();
    let newLines = lines.filter((line) => {
      return line.lineName != lineName;
    });

    this.setLines(newLines);
  };
}
