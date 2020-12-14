import Typography from "../Typography.js";
import { lineSelector, stationSelector } from "../../../_store/selectors.js";
import { tableTitleList, tableHeaderList } from "./tableSubComponents.js";
import {
  TABLE_CONTAINER_DIV,
  TABLE,
  DELETE_STATION_INPUT,
  DELETE_LINE_BUTTON,
  DELETE_SECTION_BUTTON,
} from "../../../common/IdAndClassNames.js";

export default class Table {
  constructor(props) {
    const { tabIndex, lineName } = props;
    this.tabIndex = tabIndex;
    this.lineName = lineName;
    this.element = document.createElement("div");
    this.element.id = TABLE_CONTAINER_DIV.substring(1);
  }

  _getTitle() {
    const $title = new Typography(tableTitleList[this.tabIndex], "h2");
    return $title.element;
  }

  _getTableHeaderText() {
    return tableHeaderList[this.tabIndex].reduce((trInnerHtml, headerTitle) => {
      trInnerHtml += `<th>${headerTitle}</th>`;
      return trInnerHtml;
    }, "");
  }

  _getTableHead() {
    const $tableHead = document.createElement("thead");
    $tableHead.innerHTML = `<tr>${this._getTableHeaderText()}</tr>`;
    return $tableHead;
  }

  _getTableBody() {
    // 타입에 따라 다르게 리턴해주기
    const $tableBody = document.createElement("tbody");

    return $tableBody;
  }

  createNewTable() {
    const $table = document.createElement("table");
    $table.id = TABLE.substring(1);
    [this._getTableHead(), this._getTableBody()].forEach(($element) =>
      $table.appendChild($element),
    );

    return $table;
  }

  render() {
    console.log(this.lineName);
    [this._getTitle(), this.createNewTable()].forEach(($element) =>
      this.element.appendChild($element),
    );
    return this.element;
  }
}
