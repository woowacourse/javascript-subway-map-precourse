import { getComponentIdOrClassQuerySelectorName } from "../utils/utils.js";
import addTableRow from "./subComponents/addTableRow.js";

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
    tableDataSetArray.forEach((tableRowSet) => {
      $tbody.appendChild(addTableRow(tableRowSet));
    });
    this.element.appendChild($tbody);
  }
}
