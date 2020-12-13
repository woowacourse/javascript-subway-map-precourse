import InputNewSectionInfo from "./InputNewSectionInfo.js";
import Typography from "../components/Typography.js";
import { lineSelector } from "../../_store/selectors.js";

export default class ViewUpdateSectionManager extends InputNewSectionInfo {
  constructor(props) {
    const { lineName } = props;
    super(props);
    this.lineName = lineName;
    this.element = document.createElement("div");
  }

  _getTitle() {
    const $viewTable = new Typography(`${this.lineName} 관리`, "h3");
    return $viewTable.element;
  }

  render() {
    console.log(super.render());
    [this._getTitle(), super.render()].forEach(($element) =>
      this.element.appendChild($element),
    );
    return this.element;
  }
}
