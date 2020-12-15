import {
  hasValidOrder,
  hasValidOption,
} from "../../utility/input-check-utility.js";
import { DELETE_CONFIRM_MESSAGE } from "../../utility/share-constant-utility.js";
import { SELECTOR_DEFAULT_TEMPLATE } from "../../utility/share-constant-utility.js";
import { contentsUI } from "./contents-ui.js";

export default class SectionManagerUI extends contentsUI {
  constructor(contentsID, subwayINFOManager) {
    super(contentsID, subwayINFOManager);
    this._sectionRegisterUI = null;
    this.setContentsHTML(INITIAL_TEMPLATE);
  }
  setContentsHTML(initialTemplate) {
    super.setContentsHTML(initialTemplate);
    this._updateLineButtons();
  }

  _updateLineButtons() {
    const buttonDiv = document.getElementById(SECTION_LINE_MENU_DIV_ID);
    const lines = this._lineINFOManager.getAllLines();
    let buttonDivInnerHTML = "";
    lines.forEach(({ name }) => {
      buttonDivInnerHTML += this._makeNewSelectLineButtonHTML(name);
    });
    buttonDiv.innerHTML = buttonDivInnerHTML;
    this._addEventToSelectLineButton();
  }
  _addEventToSelectLineButton() {
    const buttons = this._getAllElementsByClass(SECTION_LINE_MENU_BUTTON_CLASS);
    Array.prototype.forEach.call(buttons, (button) => {
      button.addEventListener("click", (e) => {
        this._sectionRegisterUI = new SectionRegisterUI(
          SECTION_REGISTER_DIV_ID,
          this._subwayINFOManager,
          e.target.dataset.name
        );
      });
    });
  }
  _makeNewSelectLineButtonHTML(name) {
    return `
    <button class="${SECTION_LINE_MENU_BUTTON_CLASS}" data-name="${name}">${name}</button>
    `;
  }
}

class SectionRegisterUI extends contentsUI {
  constructor(contentsID, subwayINFOManager, lineName) {
    super(contentsID, subwayINFOManager);
    this._lineName = lineName;
    this.setContentsHTML(SECTION_REGISTER_TEMPLATE);
  }
  setContentsHTML(initialTemplate) {
    initialTemplate = this._makeTitleHTML(this._lineName) + initialTemplate;
    super.setContentsHTML(initialTemplate);
    this._addEventToSectionAddButton();
    this.updateAllContents();
  }
  updateAllContents() {
    this._setComboboxOption();
    this.updateLineStationsTable();
  }
  updateLineStationsTable() {
    const table = document.getElementById(SECTION_REGISTER_TABLE_ID);
    const myLine = this._lineINFOManager.getAllLinesByCondition((line) => {
      return line.name === this._lineName;
    })[0];
    let tableInnerHTML = TABLE_HEADER_TEMPLATE;
    myLine.stationsOfLine.forEach((station, order) => {
      tableInnerHTML += this._makeNewTableRowHTML(order, station);
    });
    table.innerHTML = tableInnerHTML;
    this._addEventToAllDeleteButtons();
  }

  _addEventToAllDeleteButtons() {
    this._addClickEventToAllButtonByClassName(
      SECTION_DELETE_BUTTON_CLASS,
      this._callbackOfDeleteButton
    );
  }
  _addEventToSectionAddButton() {
    this._addClickEventToButtonByID(
      SECTION_ADD_BUTTON_ID,
      this._callbackOfSectionAddButton
    );
  }
  _callbackOfDeleteButton(event) {
    if (!confirm(DELETE_CONFIRM_MESSAGE)) {
      return;
    }
    const targetStationName = event.target.dataset.name;
    this._lineINFOManager.deleteSection(targetStationName, this._lineName);
    this.updateAllContents();
  }
  _callbackOfSectionAddButton() {
    const orderToRegister = this._getInputTextByID(SECTION_ORDER_INPUT_ID);
    const stationName = this._getSelectedOptionByID(
      SECTION_STATION_SELECTOR_ID
    );
    if (!this._hasValidSectionAddInput(orderToRegister, stationName)) {
      return;
    }
    this._lineINFOManager.registerStationToLine(
      this._lineName,
      orderToRegister,
      stationName
    );
    this.updateAllContents();
  }
  _hasValidSectionAddInput(orderToRegister, stationName) {
    const isValidOrder = hasValidOrder(orderToRegister);
    const isValidOption = hasValidOption([stationName]);
    return isValidOrder && isValidOption;
  }
  _setComboboxOption() {
    const seletor = document.getElementById(SECTION_STATION_SELECTOR_ID);
    const optionNames = this._stationINFOManager.getAllStationNames();
    const currentLine = this._lineINFOManager.getOneLineByName(this._lineName);
    currentLine.stationsOfLine.forEach((stationName) => {
      const index = optionNames.findIndex((name) => name === stationName);
      optionNames.splice(index, 1);
    });
    let seletorInnerHTML = SELECTOR_DEFAULT_TEMPLATE;
    optionNames.forEach((optionName) => {
      seletorInnerHTML += this._makeNewOptionHTML(optionName);
    });
    seletor.innerHTML = seletorInnerHTML;
  }
  _makeNewOptionHTML(name) {
    return `
    <option value="${name}">${name}</option>
    `;
  }
  _makeTitleHTML(name) {
    return `<h2>${name} 관리<h2>`;
  }
  _makeNewTableRowHTML(order, name) {
    return `
    <tr>
      <td>${order}</td>
      <td>${name}</td>
      <td>
        <button class="${SECTION_DELETE_BUTTON_CLASS}" data-name="${name}">노선에서 제거</button>
      </td>
    </tr>
    `;
  }
}

const SECTION_REGISTER_DIV_ID = "section-register-div";
const SECTION_STATION_SELECTOR_ID = "section-station-selector";
const SECTION_REGISTER_TABLE_ID = "section-register-table";
const SECTION_ORDER_INPUT_ID = "section-order-input";
const SECTION_ADD_BUTTON_ID = "section-add-button";
const SECTION_DELETE_BUTTON_CLASS = "section-delete-button";
const SECTION_LINE_MENU_DIV_ID = "section-line-menu-div";
const SECTION_LINE_MENU_BUTTON_CLASS = "section-line-menu-button";

const INITIAL_TEMPLATE = `
<h2>구간을 수정할 노선을 선택해주세요.</h2>
<div id="${SECTION_LINE_MENU_DIV_ID}">
</div>
<div id="${SECTION_REGISTER_DIV_ID}">
<div>
`;
const TABLE_HEADER_TEMPLATE = `
<th>순서</th>
<th>이름</th>
<th>설정</th>
`;
const SECTION_REGISTER_TEMPLATE = `
  <h3>구간 등록</h3>
  <p>
    <select id="${SECTION_STATION_SELECTOR_ID}">
    </select>
    <input type="number" id="${SECTION_ORDER_INPUT_ID}" placeholder="순서" />
    <button id="${SECTION_ADD_BUTTON_ID}">등록</button>
  </p>
  <table border="1" id="${SECTION_REGISTER_TABLE_ID}">
  </table>
`;
