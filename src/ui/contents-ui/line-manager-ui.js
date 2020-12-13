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
    this.setStationSelector_(START_STATION_SELECTOR_ID);
    this.setStationSelector_(END_STATION_SELECTOR_ID);
    this.addEventToLineAddButton_();
    this.updateLinesTable();
  }

  updateLinesTable() {
    const liness = this.stationINFOManager_.getLines();
    const tableContainer = document.getElementById(TABLE_ID);
    let innerHTMLOfTable = TABLE_HEADER_TEMPLATE;
    liness.forEach((lineINFOs) => {
      innerHTMLOfTable += this.makeNewTableRowHTML_(lineINFOs);
    });
    tableContainer.innerHTML = innerHTMLOfTable;
    this.addEventToAllTableDeleteButton_();
  }

  //private
  setStationSelector_(selectorID) {
    const selector = document.getElementById(selectorID);
    selector.innerHTML = this.makeSelectorInnerHTML_();
  }
  addEventToLineAddButton_() {
    this.addClickEventToButtonByID_(
      LINE_ADD_BUTTON_ID,
      this.callbackLineAddButton
    );
  }
  callbackLineAddButton() {
    const lineName = this.getInputTextByID(NAME_INPUT_ID);
    const startStationName = this.getSelectedOptionByID(
      START_STATION_SELECTOR_ID
    );
    const endStationName = this.getSelectedOptionByID(END_STATION_SELECTOR_ID);
    if (!this.isValidLineInput_(lineName, startStationName, endStationName)) {
      return;
    }
    this.stationINFOManager_.addNewLine({
      lineName: lineName,
      startStationName: startStationName,
      endStationName: endStationName,
    });
    this.updateLinesTable();
  }

  addEventToAllTableDeleteButton_() {
    this.addClickEventToAllButtonByClassName(
      LINE_DELETE_BUTTON_CLASS,
      this.callbackOfDeleteButton_
    );
  }
  callbackOfDeleteButton_(event) {
    if (!confirm(DELETE_CONFIRM_MESSAGE)) {
      return;
    }
    this.stationINFOManager_.deleteLine(event.target.dataset.name);
    this.updateLinesTable();
  }

  isValidLineInput_(lineName, startStationName, endStationName) {
    const condition1 = isValidLine(lineName, startStationName, endStationName);
    const condition2 = this.stationINFOManager_.isNotOverlapNameInLinesArray(
      lineName
    );
    const condition3 = isValidOption([startStationName, endStationName]);
    let boolToReturn = true;
    if (!(condition1 && condition2 && condition3)) {
      boolToReturn = false;
    }
    return boolToReturn;
  }
  makeNewTableRowHTML_({ name, stationsOfLine }) {
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
  makeSelectorInnerHTML_() {
    const stationNames = this.stationINFOManager_.getStationsNames();
    let selectorInnerHTML = SELECTOR_DEFAULT_TEMPLATE;
    stationNames.forEach((name) => {
      selectorInnerHTML += this.makeNewSelectorOptionHTML_(name);
    });
    return selectorInnerHTML;
  }
  makeNewSelectorOptionHTML_(name) {
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
