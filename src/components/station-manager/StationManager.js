import { StationManagerInput } from "./StationManagerInput.js";
export class StationManager {
  constructor(props) {
    this.render(props);
  }

  render = (props) => {
    new StationManagerInput(props);
  };
}
