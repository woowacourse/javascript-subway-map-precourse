import { LineManagerInput } from "./LineManagerInput.js";
import { LineManagerList } from "./LineManagerList.js";

export class LineManager {
  constructor({ getStations }) {
    this.getStations = getStations;
    this.render();
  }

  render = () => {
    new LineManagerInput({ getStations: this.getStations });
    new LineManagerList();
  };
}
