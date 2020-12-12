import { LineManagerInput } from "./LineManagerInput.js";
import { LineManagerList } from "./LineManagerList.js";

export class LineManager {
  constructor({ getStatons }) {
    this.getStatons = getStatons;
    this.render();
  }

  render = (props) => {
    new LineManagerInput({ getStations: this.getStatons });
    new LineManagerList();
  };
}
