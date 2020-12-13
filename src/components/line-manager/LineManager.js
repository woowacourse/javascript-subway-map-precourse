import { LineManagerInput } from "./LineManagerInput.js";
import { LineManagerList } from "./LineManagerList.js";

export class LineManager {
  constructor(props) {
    this.setLines = props.setLines;
    this.render(props);
  }

  render = ({ getStations, getLines, deleteLine }) => {
    this.lineManagerInput = new LineManagerInput({
      getStations: getStations,
      setLines: this.addNewLines,
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
    this.setLines(lineName, newLine);
    this.lineManagerList.render();
  };
}
