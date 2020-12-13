import { SectionManagerHeaderButtons } from "./SectionManagerHeaderButtons.js";
import { getLineTableHeader } from "../../utils/templates.js";
export class SectionManager {
  constructor({ getLines }) {
    this.getLines = getLines;
    this.render();
  }

  render = () => {
    let lines = this.getLines();
    new SectionManagerHeaderButtons({ lines: lines });
  };
}
