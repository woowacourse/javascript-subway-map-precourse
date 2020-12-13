import { SELECTOR_DEFAULT_TEMPLATE } from "../../utility/share-constant-utility.js";
import {
  isValidLine,
  isValidOption,
} from "../../utility/input-check-utility.js";
import { contentsUI } from "./contents-ui.js";

export default class LineManagerUI extends contentsUI {
  constructor(contentsID, stationINFOManager) {
    super(contentsID, stationINFOManager);
    this.setContentsHTML(INITIAL_TEMPLATE);
  }
  setContentsHTML(initialTemplate) {
    super.setContentsHTML(initialTemplate);
    this._setStationSelector(START_STATION_SELECTOR_ID);
    this._setStationSelector(END_STATION_SELECTOR_ID);
    this._addEventToLineAddButton();
    this.updateLinesTable();
  }

  updateLinesTable() {
    const liness = this._stationINFOManager.getLines();
    const tableContainer = document.getElementById(TABLE_ID);
    let innerHTMLOfTable = TABLE_HEADER_TEMPLATE;
    liness.forEach((lineINFOs) => {
      innerHTMLOfTable += this._makeNewTableRowHTML(lineINFOs);
    });
    tableContainer.innerHTML = innerHTMLOfTable;
    this._addEventToAllTableDeleteButton();
  }

  _setStationSelector(selectorID) {
    const selector = document.getElementById(selectorID);
    selector.innerHTML = this._makeSelectorInnerHTML();
  }
  _addEventToLineAddButton() {
    this._addClickEventToButtonByID(
      LINE_ADD_BUTTON_ID,
      this._callbackLineAddButton
    );
  }
  _callbackLineAddButton() {
    const lineName = this._getInputTextByID(NAME_INPUT_ID);
    const startStationName = this._getSelectedOptionByID(
      START_STATION_SELECTOR_ID
    );
    const endStationName = this._getSelectedOptionByID(END_STATION_SELECTOR_ID);
    if (!this._isValidLineInput(lineName, startStationName, endStationName)) {
      return;
    }
    this._stationINFOManager.addNewLine({
      lineName: lineName,
      startStationName: startStationName,
      endStationName: endStationName,
    });
    this.updateLinesTable();
  }
  _addEventToAllTableDeleteButton() {
    this._addClickEventToAllButtonByClassName(
      LINE_DELETE_BUTTON_CLASS,
      this._callbackOfDeleteButton
    );
  }
  _callbackOfDeleteButton(event) {
    if (!confirm(DELETE_CONFIRM_MESSAGE)) {
      return;
    }
    this._stationINFOManager.deleteLine(event.target.dataset.name);
    this.updateLinesTable();
  }
  _isValidLineInput(lineName, startStationName, endStationName) {
    const condition1 = isValidLine(lineName, startStationName, endStationName);
    const condition2 = this._stationINFOManager.hasNotOverlapNameAmongLines(
      lineName
    );
    const condition3 = isValidOption([startStationName, endStationName]);
    let boolToReturn = true;
    if (!(condition1 && condition2 && condition3)) {
      boolToReturn = false;
    }
    return boolToReturn;
  }
  _makeNewTableRowHTML({ name, stationsOfLine }) {
    return `
    <tr>
      <td>${name}</td>
      <td>${stationsOfLine[0]}</td>
      <td>${stationsOfLine[stationsOfLine.length - 1]}</td>
      <td>
        <button class="${LINE_DELETE_BUTTON_CLASS}" data-name="${name}">삭제</button>
      </td>
    </tr>
    `;
  }
  _makeSelectorInnerHTML() {
    const stationNames = this._stationINFOManager.getStationsNames();
    let selectorInnerHTML = SELECTOR_DEFAULT_TEMPLATE;
    stationNames.forEach((name) => {
      selectorInnerHTML += this._makeNewSelectorOptionHTML(name);
    });
    return selectorInnerHTML;
  }
  _makeNewSelectorOptionHTML(name) {
    return `
    <option value="${name}">${name}</option>
    `;
  }
}
const NAME_INPUT_ID = "line-name-input";

const START_STATION_SELECTOR_ID = "line-start-station-selector";
const END_STATION_SELECTOR_ID = "line-end-station-selector";

const LINE_ADD_BUTTON_ID = "line-add-button";
const LINE_DELETE_BUTTON_CLASS = "line-delete-button";

const DELETE_CONFIRM_MESSAGE = "정말로 삭제하시겠습니까?";

const TABLE_ID = "line-table";
const TABLE_HEADER_TEMPLATE = `
<th>노선 이름</th>
<th>상행 종점역</th>
<th>하행 종점역</th>
<th>설정</th>
`;

const INITIAL_TEMPLATE = `
<span>노선 이름</span><br>
<input type="text" id="${NAME_INPUT_ID}" placeholder="노선 이름을 입력해주세요."/>
<p></p>
<span>상행 종점</span>
<select id="${START_STATION_SELECTOR_ID}">
</select><br>
<span>하행 종점</span>
<select id="${END_STATION_SELECTOR_ID}">
</select>
<p></p>
<button id="${LINE_ADD_BUTTON_ID}">노선추가</button>
<h2>🚉 지하철 노선 목록</h2>
<table border="1" id="${TABLE_ID}">
</table>
`;
