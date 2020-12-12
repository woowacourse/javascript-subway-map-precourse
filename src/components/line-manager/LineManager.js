import { LineManagerInput } from "./LineManagerInput.js";
import { LineManagerList } from "./LineManagerList.js";

export class LineManager {
  constructor(props) {
    this.render(props);
  }

  render = (props) => {
    new LineManagerInput(props);
    new LineManagerList();
  };
}
