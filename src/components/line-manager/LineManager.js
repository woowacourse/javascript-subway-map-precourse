import { LineManagerInput } from "./LineManagerInput.js";
import { LineManagerList } from "./LineManagerList.js";
import { display } from "../../utils/handleDom.js";

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
    display(props.isShow, this.manager);
  };

  updateStations = () => {
    this.lineManagerInput.render();
  };

  updateLines = () => {
    this.lineManagerList.render();
  };

  addNewLines = (lineName, newStations) => {
    let lines = this.getLines();
    let newLine = { lineName: lineName, stations: newStations };

    lines.push(newLine);
    this.setLines(lines);
    this.lineManagerList.render();
  };

  deleteLine = (lineName) => {
    let lines = this.getLines();
    let newLines = lines.filter((line) => {
      return line.lineName != lineName;
    });

    this.setLines(newLines);
  };
}
