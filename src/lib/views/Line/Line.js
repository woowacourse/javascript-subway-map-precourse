import Typography from "../components/Typography.js";
import Table from "../components/Table.js";
import Div from "../components/Div.js";
import InputNewLineInfo from "./InputNewLineInfo.js";
import getNewLineDataRowSet from "./getNewLineDataRowSet.js";
import { lineSelector } from "../../_store/selectors.js";

import {
  LINE_DIV,
  LINE_LIST_VIEW_CONTAINER_ID,
  LINE_LIST,
} from "../../common/IdAndClassNames.js";

export default class Line {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = LINE_DIV.substring(1);
    this.lineDataList = lineSelector();
    this.lineDataListIsEmpty = lineSelector().length === 0;
  }

  _getLineInfoInputFormContainer() {
    const $lineInfoInputFormContainer = new InputNewLineInfo();
    return $lineInfoInputFormContainer.render();
  }

  _getLineListViewContainerChildNodes() {
    const $title = new Typography("🚉 지하철 노선 목록", "h2");
    const $lineDataListTable = new Table(LINE_LIST);
    $lineDataListTable.insertTableHeader([
      "노선 이름",
      "상행 종점역",
      "하행 종점역",
      "설정",
    ]);
    $lineDataListTable.insertTableData(
      getNewLineDataRowSet(this.lineDataList),
      this.lineDataListIsEmpty,
    );
    return [$title, $lineDataListTable];
  }

  _getLineListViewContainer() {
    const $lineListViewContainer = new Div(LINE_LIST_VIEW_CONTAINER_ID);
    this._getLineListViewContainerChildNodes().forEach(({ element }) => {
      $lineListViewContainer.element.appendChild(element);
    });
    return $lineListViewContainer.element;
  }

  render() {
    [
      this._getLineInfoInputFormContainer(),
      this._getLineListViewContainer(),
    ].forEach(($element) => this.element.appendChild($element));
    return this.element;
  }
}
