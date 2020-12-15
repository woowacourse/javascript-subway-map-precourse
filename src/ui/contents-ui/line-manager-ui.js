import {
  DELETE_CONFIRM_MESSAGE,
  SELECTOR_DEFAULT_TEMPLATE,
} from "../../utility/share-constant-utility.js";
import {
  hasValidLine,
  hasValidOption,
} from "../../utility/input-check-utility.js";
import { contentsUI } from "./contents-ui.js";

export default class LineManagerUI extends contentsUI {
  constructor(contentsID, subwayINFOManager) {
    super(contentsID, subwayINFOManager);
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
    const lines = this._lineINFOManager.getAllLines();
    const tableContainer = document.getElementById(TABLE_ID);
    let innerHTMLOfTable = TABLE_HEADER_TEMPLATE;
    lines.forEach((lineINFOs) => {
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
  _addEventToAllTableDeleteButton() {
    this._addClickEventToAllButtonByClassName(
      LINE_DELETE_BUTTON_CLASS,
      this._callbackOfDeleteButton
    );
  }
  _callbackLineAddButton() {
    const lineName = this._getInputTextByID(NAME_INPUT_ID);
    const startStation = this._getSelectedOptionByID(START_STATION_SELECTOR_ID);
    const endStation = this._getSelectedOptionByID(END_STATION_SELECTOR_ID);
    if (!this._hasValidLineInput(lineName, startStation, endStation)) {
      return;
    }
    this._lineINFOManager.addNewLine({
      lineName: lineName,
      startStationName: startStation,
      endStationName: endStation,
    });
    this.updateLinesTable();
  }
  _callbackOfDeleteButton(event) {
    if (!confirm(DELETE_CONFIRM_MESSAGE)) {
      return;
    }
    this._lineINFOManager.deleteLine(event.target.dataset.name);
    this.updateLinesTable();
  }
  _hasValidLineInput(lineName, startStationName, endStationName) {
    const isValidLine = hasValidLine(
      lineName,
      startStationName,
      endStationName
    );
    const isNotOverlapName = this._lineINFOManager.hasNotOverlapNameAmongLines(
      lineName
    );
    const isValidOption = hasValidOption([startStationName, endStationName]);
    return isValidLine && isNotOverlapName && isValidOption;
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
    const stationNames = this._stationINFOManager.getAllStationNames();
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
const TABLE_ID = "line-table";
const LINE_DELETE_BUTTON_CLASS = "line-delete-button";

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
const TABLE_HEADER_TEMPLATE = `
<th>노선 이름</th>
<th>상행 종점역</th>
<th>하행 종점역</th>
<th>설정</th>
`;
