import InputNewSectionInfo from "./InputNewSectionInfo.js";
import Typography from "../components/Typography.js";
import Table from "../components/Table.js";
import { lineSelector } from "../../_store/selectors.js";
import getNewSectionRowSet from "./getNewSectionRowSet.js";

import { SECTION_LIST } from "../../common/IdAndClassNames.js";

export default class ViewUpdateSectionManager extends InputNewSectionInfo {
  constructor(props) {
    super(props);
    this.lineName = props.lineName;
    this.lineDataSet = lineSelector().filter(
      ({ lineName }) => this.lineName === lineName,
    )[0].stations;
    this.isEmptyLine = this.lineDataSet.length === 0;
    this.element = document.createElement("div");
  }

  _getTitle() {
    const $viewTable = new Typography(`${this.lineName} 관리`, "h3");
    return $viewTable.element;
  }

  _getSectionListTable() {
    const $sectionListDataTable = new Table(SECTION_LIST);
    $sectionListDataTable.insertTableHeader(["순서", "이름", "설정"]);
    $sectionListDataTable.insertTableData(
      getNewSectionRowSet(this.lineName, this.lineDataSet),
      this.isEmptyLine,
    );
    return $sectionListDataTable.element;
  }

  render() {
    [
      this._getTitle(),
      super.render(),
      this._getSectionListTable(),
    ].forEach(($element) => this.element.appendChild($element));
    return this.element;
  }
}
