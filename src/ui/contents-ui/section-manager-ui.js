import {
  isValidOrder,
  isValidOption,
} from "../../utility/input-check-utility.js";
import { SELECTOR_DEFAULT_TEMPLATE } from "../../utility/share-constant-utility.js";
import { contentsUI } from "./contents-ui.js";

export default class SectionManagerUI extends contentsUI {
  constructor(contentsID, stationINFOManager) {
    super(contentsID, stationINFOManager);

    this._sectionRegisterUI = null;
    this.setContentsHTML(INITIAL_TEMPLATE);
  }
  setContentsHTML(initialTemplate) {
    super.setContentsHTML(initialTemplate);
    this._updateLineButtons();
  }

  _updateLineButtons() {
    const buttonDiv = document.getElementById(SECTION_LINE_MENU_DIV_ID);
    const lines = this._stationINFOManager.getLines();
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
          this._stationINFOManager,
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
  constructor(contentsID, stationINFOManager, lineName) {
    super(contentsID, stationINFOManager);
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
    const myLine = this._stationINFOManager.getAllLinesByCondition((line) => {
      return line.name === this._lineName;
    })[0];
    let tableInnerHTML = TABLE_HEADER_TEMPLATE;
    myLine.stationsOfLine.forEach((station, order) => {
      tableInnerHTML += this._makeNewTableRowHTML(order, station);
    });
    table.innerHTML = tableInnerHTML;
    this._addEventToAllDeleteButtons();
  }

  //private
  _addEventToAllDeleteButtons() {
    this._addClickEventToAllButtonByClassName(
      SECTION_DELETE_BUTTON_CLASS,
      this._callbackOfDeleteButton
    );
  }
  _callbackOfDeleteButton(event) {
    if (!confirm(DELETE_CONFIRM_MESSAGE)) {
      return;
    }
    const targetStationName = event.target.dataset.name;
    this._stationINFOManager.deleteSection(targetStationName, this._lineName);
    this.updateAllContents();
  }

  _addEventToSectionAddButton() {
    this._addClickEventToButtonByID(
      SECTION_ADD_BUTTON_ID,
      this._callbackOfSectionAddButton
    );
  }
  _callbackOfSectionAddButton() {
    const orderToRegister = this._getInputTextByID(SECTION_ORDER_INPUT_ID);
    const stationName = this._getSelectedOptionByID(
      SECTION_STATION_SELECTOR_ID
    );
    if (!this._isValidSectionAddInput(orderToRegister, stationName)) {
      return;
    }
    this._stationINFOManager.registerStationToLine(
      this._lineName,
      orderToRegister,
      stationName
    );
    this.updateAllContents();
  }
  _isValidSectionAddInput(orderToRegister, stationName) {
    const hasValidOrder = isValidOrder(orderToRegister);
    const hasValidOption = isValidOption([stationName]);
    return hasValidOrder && hasValidOption;
  }
  _setComboboxOption() {
    const seletor = document.getElementById(SECTION_STATION_SELECTOR_ID);
    const optionNames = this._stationINFOManager.getStationNamesByCondition(
      (station) => {
        return !station.linesOfStation.has(this._lineName);
      }
    );
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
const SECTION_DELETE_BUTTON_CLASS = "section-delete-button";
const SECTION_ORDER_INPUT_ID = "section-order-input";
const SECTION_ADD_BUTTON_ID = "section-add-button";
const DELETE_CONFIRM_MESSAGE = "정말로 노선에서 제거하시겠습니까?";
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

const SECTION_LINE_MENU_DIV_ID = "section-line-menu-div";
const SECTION_LINE_MENU_BUTTON_CLASS = "section-line-menu-button";
const INITIAL_TEMPLATE = `
<h2>구간을 수정할 노선을 선택해주세요.</h2>
<div id="${SECTION_LINE_MENU_DIV_ID}">
</div>
<div id="${SECTION_REGISTER_DIV_ID}">
<div>
`;
