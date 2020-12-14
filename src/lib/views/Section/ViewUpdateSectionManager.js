import InputNewSectionInfo from "./InputNewSectionInfo.js";
import Typography from "../components/Typography.js";
import Table from "../components/Table/Table.js";
import { lineSelector } from "../../_store/selectors.js";

export default class ViewUpdateSectionManager extends InputNewSectionInfo {
  constructor(props) {
    super(props);
    this.tabIndex = 2;
    this.lineName = props.lineName;
    this.lineDataSet = lineSelector().filter(
      ({ lineName }) => this.lineName === lineName,
    )[0].stations;
    this.element = document.createElement("div");
    this.table = new Table({ tabIndex: 2, lineName: this.lineName });
  }

  _getTitle() {
    const $viewTable = new Typography(`${this.lineName} 관리`, "h3");
    return $viewTable.element;
  }

  render() {
    [
      this._getTitle(),
      super.render(),
      this.table.render(),
    ].forEach(($element) => this.element.appendChild($element));
    return this.element;
  }
}
