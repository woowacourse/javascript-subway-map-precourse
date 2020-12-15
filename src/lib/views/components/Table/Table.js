import Typography from "../Typography.js";
import Button from "../Button.js";
import { stationSelector, lineSelector } from "../../../store/selectors.js";
import {
  tableTitleList,
  tableHeaderList,
  deleteHelperText,
  deleteButtonClass,
} from "./tableSubComponents.js";
import {
  STATION_TAB_INDEX,
  LINE_TAB_INDEX,
  SECTION_TAB_INDEX,
} from "../../../common/constants.js";
import deleteStationName from "../../../action/Station/deleteStationName.js";
import deleteLineName from "../../../action/Line/deleteLineName.js";
import deleteSectionData from "../../../action/Section/deleteSectionData.js";

import { TABLE_CONTAINER_DIV, TABLE } from "../../../common/IdAndClassNames.js";

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
    return tableHeaderList[this.tabIndex].reduce(
      (trInnerHtml, headerTitle) => trInnerHtml + `<th>${headerTitle}</th>`,
      "",
    );
  }

  _getTableHead() {
    const $tableHead = document.createElement("thead");
    $tableHead.innerHTML = `<tr>${this._getTableHeaderText()}</tr>`;
    return $tableHead;
  }

  _getDeleteButton({ stationName, lineName }) {
    const $buttonContainer = document.createElement("td");
    const $deleteButton = new Button(
      deleteButtonClass[this.tabIndex],
      deleteHelperText[this.tabIndex],
      () =>
        stationName !== undefined && lineName !== undefined
          ? deleteSectionData({ stationName, lineName })
          : stationName !== undefined
          ? deleteStationName({ stationName, lineName })
          : deleteLineName({ stationName, lineName }),
    );
    $buttonContainer.appendChild($deleteButton.element);
    return $buttonContainer;
  }

  _getTextTd(elementName) {
    const $td = document.createElement("td");
    $td.innerText = elementName;
    return $td;
  }

  _getStationTableData() {
    if (this.tabIndex !== STATION_TAB_INDEX) return [];
    return stationSelector().reduce((trList, stationName) => {
      const $tr = document.createElement("tr");
      [
        this._getTextTd(stationName),
        this._getDeleteButton({ stationName }),
      ].forEach(($element) => $tr.appendChild($element));
      trList.push($tr);
      return trList;
    }, []);
  }

  // 노선 데이터 (노선 이름, 기점, 종점, 삭제) tr 배열
  _getLineTableData() {
    if (this.tabIndex !== LINE_TAB_INDEX) return [];
    return lineSelector().reduce((trList, { lineName, stations }) => {
      const $tr = document.createElement("tr");
      [
        this._getTextTd(lineName),
        this._getTextTd(stations[0]),
        this._getTextTd(stations[stations.length - 1]),
        this._getDeleteButton({ lineName }),
      ].forEach(($element) => $tr.appendChild($element));
      trList.push($tr);
      return trList;
    }, []);
  }

  // 현재 라인에 해당하는 구간 데이터 (순서, 역 이름, 노선에서 삭제) tr 배열
  _getSectionTableData() {
    if (this.tabIndex !== SECTION_TAB_INDEX) return [];
    return lineSelector()
      .filter(({ lineName }) => lineName === this.lineName)[0]
      .stations.reduce((trList, stationName, index) => {
        const $tr = document.createElement("tr");
        [
          this._getTextTd(index),
          this._getTextTd(stationName),
          this._getDeleteButton({ stationName, lineName: this.lineName }),
        ].forEach(($element) => $tr.appendChild($element));
        trList.push($tr);
        return trList;
      }, []);
  }

  _getTableData() {
    return [
      this._getStationTableData(),
      this._getLineTableData(),
      this._getSectionTableData(),
    ];
  }

  _getTableBody() {
    // 타입에 따라 다르게 리턴해주기
    const $tableBody = document.createElement("tbody");
    this._getTableData()[this.tabIndex].forEach(($tableRow) =>
      $tableBody.appendChild($tableRow),
    );
    return $tableBody;
  }

  createNewTable() {
    const $table = document.createElement("table");
    $table.id = TABLE.substring(1);
    this.element.innerHTML = "";
    [this._getTableHead(), this._getTableBody()].forEach(($element) =>
      $table.appendChild($element),
    );

    return $table;
  }

  render() {
    [this._getTitle(), this.createNewTable()].forEach(($element) =>
      this.element.appendChild($element),
    );
    return this.element;
  }
}
