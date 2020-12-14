import { LineManagerInput } from "./LineManagerInput.js";
import { LineManagerList } from "./LineManagerList.js";

export class LineManager {
  constructor(props) {
    this.setNewLine = props.setNewLine;
    this.render(props);
  }

  render = ({ getStations, getLines, deleteLine }) => {
    this.lineManagerInput = new LineManagerInput({
      getStations: getStations,
      setNewLine: this.addNewLines,
    });
    this.lineManagerList = new LineManagerList({
      getLines: getLines,
      deleteLine: deleteLine,
    });
  };

  update = () => {
    this.lineManagerInput.render();
  };

  addNewLines = (lineName, newLine) => {
    this.setNewLine(lineName, newLine);
    this.lineManagerList.render();
  };
}
