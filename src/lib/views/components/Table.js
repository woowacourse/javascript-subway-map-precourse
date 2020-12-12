import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";
import convertTableRowDataToDOM from "./subComponents/convertTableRowDataToDOM.js";

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

  insertTableData(tableDataSetArray) {
    const $tbody = document.createElement("tbody");
    this.element.appendChild($tbody);
    if (!tableDataSetArray || tableDataSetArray.length === 0) return;
    tableDataSetArray.forEach((tableRowSet) => {
      $tbody.appendChild(convertTableRowDataToDOM(tableRowSet));
    });
  }
}
