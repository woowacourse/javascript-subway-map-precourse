import { LineManagerInput } from "./LineManagerInput.js";
import { LineManagerList } from "./LineManagerList.js";

export class LineManager {
  constructor({ getStations, setLines }) {
    this.getStations = getStations;
    this.setLines = setLines;
    this.render();
  }

  render = () => {
    this.LineManagerInput = new LineManagerInput({
      getStations: this.getStations,
      setLines: this.setLines,
    });
    new LineManagerList();
  };

  update = () => {
    this.LineManagerInput.render();
  };
}
