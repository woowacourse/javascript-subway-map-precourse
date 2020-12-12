import { StationManagerInput } from "./StationManagerInput.js";
import { StationManagerList } from "./StationManagerList.js";
export class StationManager {
  constructor(props) {
    this.render(props);
  }

  render = (props) => {
    new StationManagerInput(props);
    new StationManagerList(props);
  };
}
