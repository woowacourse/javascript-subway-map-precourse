import { LineManagerInput } from "./LineManagerInput.js";
import { LineManagerList } from "./LineManagerList.js";

export class LineManager {
  constructor(props) {
    this.setLines = props.setLines;
    this.render(props);
  }

  render = ({ getStations, getLines, setLines }) => {
    this.lineManagerInput = new LineManagerInput({
      getStations: getStations,
      setLines: this.addNewLines,
    });
    this.lineManagerList = new LineManagerList({ getLines: getLines });
  };

  update = () => {
    this.lineManagerInput.render();
  };

  addNewLines = (lineName, newLine) => {
    this.setLines(lineName, newLine);
    this.lineManagerList.render();
  };
}
