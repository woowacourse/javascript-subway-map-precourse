import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";

export default class Table {
  constructor(id) {
    this.element = document.createElement("table");
    this.element.id = getComponentIdOrClassQuerySelectorName(id);
  }

  insertTableHeader(tableHeaderListArray) {
    const tableHeaderElements = tableHeaderListArray.reduce(
      (thListTag, thElement) => thListTag + `<th>${thElement}</th>`,
      "",
    );
    this.element.innerHTML = `
    <thead>
        <tr>
          ${tableHeaderElements}
        </tr>
    </thead>`;
  }

  // 데이터 삽입(인덱스, 데이터, 삭제버튼)
  _getTableRow(tableRowSet) {
    return tableRowSet.reduce(($tr, $tdData) => {
      const $td = document.createElement("td");
      if (typeof $tdData === "string") $td.innerText = $tdData;
      else $td.appendChild($tdData);
      $tr.appendChild($td);
      return $tr;
    }, document.createElement("tr"));
  }

  insertTableData(tableDataSetArray) {
    const $tbody = document.createElement("tbody");
    tableDataSetArray.forEach((tableRowSet) => {
      $tbody.appendChild(this._getTableRow(tableRowSet));
    });
    this.element.appendChild($tbody);
  }
}
