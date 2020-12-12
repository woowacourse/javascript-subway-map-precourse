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
  insertTableData(tableDataSetArray) {
    tableDataSetArray.forEach(([stationName, $deleteButton]) => {
      console.log(stationName, $deleteButton);
    });
  }
}
