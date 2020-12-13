import { isValidStation } from "../../utility/input-check-utility.js";
import { contentsUI } from "./contents-ui.js";

export default class StationManagerUI extends contentsUI {
  constructor(contentsID, stationINFOManager) {
    super(contentsID, stationINFOManager);

    this.setContentsHTML(INITIAL_TEMPLATE);
  }
  setContentsHTML(initialTemplate) {
    super.setContentsHTML(initialTemplate);
    this._addEventToNameInputButton();
    this.updateStationsTable();
  }
  updateStationsTable() {
    const stationsNames = this._stationINFOManager.getStationsNames();
    const tableContainer = document.getElementById(STATION_NAME_TABLE_ID);
    let innerHTMLOfTable = TABLE_HEADER_TEMPLATE;
    for (let name of stationsNames) {
      innerHTMLOfTable += this._makeNewTableRowHTML(name);
    }
    tableContainer.innerHTML = innerHTMLOfTable;
    this._addEventToAllTableDeleteButton();
  }

  _addEventToNameInputButton() {
    this._addClickEventToButtonByID(
      STATION_ADD_BUTTON_ID,
      this._callbackOfNameInputButton
    );
  }
  _callbackOfNameInputButton() {
    const name = this._getInputTextByID(STATION_NAME_INPUT_ID);
    if (!this._isValidStationInput(name)) {
      return;
    }
    this._stationINFOManager.addNewStation({
      name: name,
    });
    this.updateStationsTable();
  }

  _addEventToAllTableDeleteButton() {
    this._addClickEventToAllButtonByClassName(
      STATION_DELETE_BUTTON_CLASS,
      this._callbackOfTableDeleteButton
    );
  }
  _callbackOfTableDeleteButton(event) {
    if (!confirm(DELETE_CONFIRM_MESSAGE)) {
      return;
    }
    this._stationINFOManager.deleteStation(event.target.dataset.name);
    this.updateStationsTable();
  }
  _isValidStationInput(name) {
    const condition1 = isValidStation(name);
    const condition2 = this._stationINFOManager.hasNotOverlapNameAmongStations(
      name
    );
    let boolToReturn = true;
    if (!(condition1 && condition2)) {
      boolToReturn = false;
    }
    return boolToReturn;
  }
  _makeNewTableRowHTML(name) {
    const newTableRow = `
    <tr>
      <td>${name}</td>
      <td>
        <button class="${STATION_DELETE_BUTTON_CLASS}" data-name="${name}">삭제</button>
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
const DELETE_CONFIRM_MESSAGE = "정말로 삭제하시겠습니까?";
const INITIAL_TEMPLATE = `
<span>역 이름</span><br>
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
