import {
  getMessageToCheckLineInput,
  getMessageToCheckNotEquality,
} from "../../utility/string-check-utility.js";
import {
  getInputTextByID,
  getAllElementsByClass,
} from "../../utility/handle-document-utility.js";

export default class SectionManagerUI {
  constructor(contentsID, stationINFOManager) {
    this.contentsID_ = contentsID;
    this.stationINFOManager_ = stationINFOManager;
    this.setContentsHTML();
  }

  setContentsHTML() {
    document.getElementById(this.contentsID_).innerHTML = TEMPLATE;
    this.setStationSelector_(START_STATION_SELECTOR_ID);
    this.setStationSelector_(END_STATION_SELECTOR_ID);
    this.addEventToLineAddButton_();
    this.updateLinesTable();
  }
  updateLinesTable() {
    const linesINFOs = this.stationINFOManager_.getLinesNames();
    const tableContainer = document.getElementById(TABLE_ID);
    let innerHTMLOfTable = TABLE_HEADER_TEMPLATE;
    linesINFOs.forEach((lineINFOs) => {
      innerHTMLOfTable += this.createNewTableRowHTML_(lineINFOs);
    });
    tableContainer.innerHTML = innerHTMLOfTable;
    this.addEventToAllTableDeleteButton_();
  }

  setStationSelector_(selectorID) {
    const selector = document.getElementById(selectorID);
    selector.innerHTML = this.createSelectorInnerHTML_();
  }
  createSelectorInnerHTML_() {
    const stationNames = this.stationINFOManager_.getStationsNames();
    let selectorInnerHTML = "";
    stationNames.forEach((name) => {
      selectorInnerHTML += this.createNewSelectorOptionHTML_(name);
    });
    return selectorInnerHTML;
  }
  createNewSelectorOptionHTML_(name) {
    return `
    <option value="${name}">${name}</option>
    `;
  }
  addEventToLineAddButton_() {
    const button = document.getElementById(LINE_ADD_BUTTON_ID);
    button.addEventListener("click", () => {
      const lineName = getInputTextByID(NAME_INPUT_ID);
      const startStationName = this.getSelectedOptionInSelector_(
        START_STATION_SELECTOR_ID
      );
      const endStationName = this.getSelectedOptionInSelector_(
        END_STATION_SELECTOR_ID
      );
      if (!this.isLineINFOValid_(lineName, startStationName, endStationName)) {
        return;
      }
      this.stationINFOManager_.addNewLine({
        lineName: lineName,
        startStationName: startStationName,
        endStationName: endStationName,
      });
      this.updateLinesTable();
    });
  }
  isLineINFOValid_(lineName, startStationName, endStationName) {
    const lineNameCheckMessage = getMessageToCheckLineInput(lineName);
    const equalityCheckMessage = getMessageToCheckNotEquality(
      startStationName,
      endStationName
    );
    let ret_bool = true;
    if (lineNameCheckMessage !== "성공") {
      alert(lineNameCheckMessage);
      ret_bool = false;
    }
    if (equalityCheckMessage !== "성공") {
      alert(equalityCheckMessage);
      ret_bool = false;
    }
    return ret_bool;
  }
  getSelectedOptionInSelector_(id) {
    const selector = document.getElementById(id);
    return selector[selector.selectedIndex].value;
  }
  addEventToAllTableDeleteButton_() {
    const deleteButtons = getAllElementsByClass(LINE_DELETE_BUTTON_CLASS);
    Array.prototype.forEach.call(deleteButtons, (deleteButton) => {
      deleteButton.addEventListener("click", (e) => {
        if (!confirm(DELETE_CONFIRM_MESSAGE)) {
          return;
        }
        this.stationINFOManager_.deleteLine(e.target.dataset.name);
        this.updateLinesTable();
      });
    });
  }
  createNewTableRowHTML_({ name, startStationName, endStationName }) {
    return `
    <tr>
    <td>${name}</td>
    <td>${startStationName}</td>
    <td>${endStationName}</td>
    <td>
      <button class="${LINE_DELETE_BUTTON_CLASS}" data-name="${name}">삭제</button>
    </td>
    <tr>
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

const TEMPLATE = `
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
