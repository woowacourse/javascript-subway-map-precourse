import { getMessageToCheckStationName } from "../../utility/string-check-utility.js";

export default class StationManagerUI {
  constructor({ contentsContainer, stationINFOManager }) {
    this.contentsContainer_ = contentsContainer;
    this.stationINFOManager_ = stationINFOManager;
    this.setHTML();
    this.updateStationsTable();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
    this.addEventToNameInputButton_();
  }
  updateStationsTable() {
    const stationNames = this.stationINFOManager_.getStationsNames();
    const tableContainer = this.contentsContainer_.querySelector(
      "#" + STATION_NAME_TABLE_ID
    );
    let innerHTMLOfTable = TABLE_HEADER_TEMPLATE;
    for (let name of stationNames) {
      innerHTMLOfTable += this.createNewTableRowHTML_(name);
    }
    tableContainer.innerHTML = innerHTMLOfTable;
  }

  addEventToNameInputButton_() {
    const button = this.contentsContainer_.querySelector(
      "#" + STATION_ADD_BUTTON_ID
    );
    const nameInput = this.contentsContainer_.querySelector(
      "#" + STATION_NAME_INPUT_ID
    );
    button.addEventListener("click", () => {
      const name = nameInput.value;
      const message = getMessageToCheckStationName(name);
      if (message !== "성공") {
        alert(message);
        return;
      }
      this.stationINFOManager_.addNewStation({
        name: name,
      });
      this.updateStationsTable();
    });
  }
  createNewTableRowHTML_(name) {
    const newTableRow = `
    <tr>
      <td>${name}</td>
      <td>
        <button class="${STATION_DELETE_BUTTON_CLASS}">삭제</button>
      </td>
    </tr>
    `;
    return newTableRow;
  }
}
const STATION_NAME_INPUT_ID = "station-name-input";
const STATION_ADD_BUTTON_ID = "station-add-button";
const STATION_DELETE_BUTTON_CLASS = "station-delete-button";
const STATION_NAME_TABLE_ID = "station-name-table";
const TEMPLATE = `
역 이름<br>
<input type="text" placeholder="역 이름을 입력해주세요." id="${STATION_NAME_INPUT_ID}"/>
<button id="${STATION_ADD_BUTTON_ID}">역 추가</button>
<h2>🚉 지하철 역 목록</h2>
<table border="1" id="${STATION_NAME_TABLE_ID}">
</table>
`;
const TABLE_HEADER_TEMPLATE = `
<th>역 이름</th>
<th>설정</th>
`;
