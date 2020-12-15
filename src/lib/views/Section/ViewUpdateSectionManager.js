import InputNewSectionInfo from "./InputNewSectionInfo.js";
import Typography from "../components/Typography.js";
import Table from "../components/Table/Table.js";
import { SECTION_TAB_INDEX } from "../../common/constants.js";
import { lineSelector } from "../../store/selectors.js";

export default class ViewUpdateSectionManager extends InputNewSectionInfo {
  constructor(props) {
    super(props);
    this.tabIndex = SECTION_TAB_INDEX;
    this.lineName = props.lineName;
    this.lineDataSet = lineSelector().filter(
      ({ lineName }) => this.lineName === lineName,
    )[0].stations;
    this.element = document.createElement("div");
    this.table = new Table({
      tabIndex: SECTION_TAB_INDEX,
      lineName: this.lineName,
    });
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
