import { getMessageToCheckLineInput } from "../../utility/string-check-utility.js";
import { getInputTextByID } from "../../utility/handle-document-utility.js";

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
    this.updateLinesTable_();
  }

  setStationSelector_(selectorID) {
    const selector = document.getElementById(selectorID);
    selector.innerHTML = this.createSelectorInnerHTML_();
  }
  createSelectorInnerHTML_() {
    const stationNames = this.stationINFOManager_.getStationsNames();
    let selectorInnerHTML = SELECTOR_TEMPLATE;
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
    const button = document.getElementById(ADD_BUTTON_ID);
    button.addEventListener("click", () => {
      const lineName = getInputTextByID(NAME_INPUT_ID);
      const message = getMessageToCheckLineInput(lineName);
      if (message !== "성공") {
        alert(message);
        return;
      }
      this.stationINFOManager_.addNewLine({
        lineName: lineName,
        startStationName: this.getSelectedOptionInSelector_(
          START_STATION_SELECTOR_ID
        ),
        endStationName: this.getSelectedOptionInSelector_(
          END_STATION_SELECTOR_ID
        ),
      });
      this.updateLinesTable_();
    });
  }
  getSelectedOptionInSelector_(id) {
    const selector = document.getElementById(id);
    return selector[selector.selectedIndex].value;
  }
  updateLinesTable_() {
    const linesINFOs = this.stationINFOManager_.getLinesNames();
    const tableContainer = document.getElementById(TABLE_ID);
    let innerHTMLOfTable = TABLE_HEADER_TEMPLATE;
    linesINFOs.forEach((lineINFOs) => {
      innerHTMLOfTable += this.createNewTableRowHTML_(lineINFOs);
    });
    tableContainer.innerHTML = innerHTMLOfTable;
  }
  createNewTableRowHTML_({ name, startStationName, endStationName }) {
    return `
    <tr>
    <td>${name}</td>
    <td>${startStationName}</td>
    <td>${endStationName}</td>
    <td>
      <button class="${DELETE_BUTTON_CLASS}">삭제</button>
    </td>
    <tr>
    `;
  }
}
const NAME_INPUT_ID = "line-name-input";
const START_STATION_SELECTOR_ID = "line-start-station-selector";
const END_STATION_SELECTOR_ID = "line-end-station-selector";
const ADD_BUTTON_ID = "line-add-button";
const DELETE_BUTTON_CLASS = "line-delete-button";
const TABLE_ID = "line-table";

const SELECTOR_TEMPLATE = `<option value="none">--선택--</option>`;
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
<button id="${ADD_BUTTON_ID}">노선추가</button>
<h2>🚉 지하철 노선 목록</h2>
<table border="1" id="${TABLE_ID}">
</table>
`;
