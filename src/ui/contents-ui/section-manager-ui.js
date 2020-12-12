import {
  getInputTextByID,
  getAllElementsByClass,
  getSelectedOptionByID,
} from "../../utility/handle-document-utility.js";
import {
  isValidOrder,
  isValidOption,
} from "../../utility/input-check-utility.js";
import { SELECTOR_DEFAULT_TEMPLATE } from "../../utility/share-constant-utility.js";

export default class SectionManagerUI {
  constructor(contentsID, stationINFOManager) {
    this.contentsID_ = contentsID;
    this.stationINFOManager_ = stationINFOManager;
    this.sectionRegisterUI = null;
    this.setContentsHTML();
  }

  setContentsHTML() {
    document.getElementById(this.contentsID_).innerHTML = TEMPLATE;
    this.updateLineButtons_();
  }

  updateLineButtons_() {
    const buttonDiv = document.getElementById(SECTION_LINE_MENU_DIV_ID);
    const lineINFOs = this.stationINFOManager_.getLineINFOs();
    let buttonDivInnerHTML = "";
    lineINFOs.forEach(({ name }) => {
      buttonDivInnerHTML += this.makeNewSelectLineButtonHTML_(name);
    });
    buttonDiv.innerHTML = buttonDivInnerHTML;
    this.addEventToSelectLineButton_();
  }
  addEventToSelectLineButton_() {
    const buttons = getAllElementsByClass(SECTION_LINE_MENU_BUTTON_CLASS);
    Array.prototype.forEach.call(buttons, (button) => {
      button.addEventListener("click", (e) => {
        this.sectionRegisterUI = new SectionRegisterUI(
          e.target.dataset.name,
          this.stationINFOManager_
        );
      });
    });
  }
  makeNewSelectLineButtonHTML_(name) {
    return `
    <button class="${SECTION_LINE_MENU_BUTTON_CLASS}" data-name="${name}">${name}</button>
    `;
  }
}

class SectionRegisterUI {
  constructor(lineName, stationINFOManager) {
    this.lineName_ = lineName;
    this.stationINFOManager_ = stationINFOManager;
    this.setContentsHTML();
  }

  setContentsHTML() {
    const manageDiv = document.getElementById(SECTION_REGISTER_DIV_ID);
    manageDiv.innerHTML =
      this.makeTitleHTML_(this.lineName_) + SECTION_REGISTER_TEMPLATE;
    this.addEventToSectionAddButton_();
    this.updateAllContents();
  }
  updateAllContents() {
    this.setComboboxOption_();
    this.updateLineStationsTable();
  }
  updateLineStationsTable() {
    const table = document.getElementById(SECTION_REGISTER_TABLE_ID);
    const myLine = this.stationINFOManager_.getLineINFOsByCondition((line) => {
      return line.name === this.lineName_;
    })[0];
    let tableInnerHTML = TABLE_HEADER_TEMPLATE;
    myLine.stationsOfLine.forEach((station, order) => {
      tableInnerHTML += this.makeNewTableRowHTML(order, station.name);
    });
    table.innerHTML = tableInnerHTML;
  }

  //private
  addEventToSectionAddButton_() {
    const button = document.getElementById(SECTION_ADD_BUTTON_ID);
    button.addEventListener("click", () => {
      const orderToRegister = getInputTextByID(SECTION_ORDER_INPUT_ID);
      const stationName = getSelectedOptionByID(SECTION_STATION_SELECTOR_ID);
      if (!this.isValidSectionAddInput_(orderToRegister, stationName)) {
        return;
      }
      this.stationINFOManager_.registerStationToLine(
        this.lineName_,
        orderToRegister,
        stationName
      );
      this.updateAllContents();
    });
  }
  isValidSectionAddInput_(orderToRegister, stationName) {
    const condition1 = isValidOrder(orderToRegister);
    const condition2 = isValidOption([stationName]);
    let boolToReturn = true;
    if (!(condition1 && condition2)) {
      boolToReturn = false;
    }
    return boolToReturn;
  }
  
  setComboboxOption_() {
    const seletor = document.getElementById(SECTION_STATION_SELECTOR_ID);
    const optionNames = this.stationINFOManager_.getStationNamesByCondition(
      (station) => {
        return !station.linesOfStation.has(this.lineName_);
      }
    );
    let seletorInnerHTML = SELECTOR_DEFAULT_TEMPLATE;
    optionNames.forEach((optionName) => {
      seletorInnerHTML += this.makeNewOptionHTML_(optionName);
    });
    seletor.innerHTML = seletorInnerHTML;
  }
  makeNewOptionHTML_(name) {
    return `
    <option value="${name}">${name}</option>
    `;
  }
  makeTitleHTML_(name) {
    return `<h2>${name} 관리<h2>`;
  }
  makeNewTableRowHTML(order, name) {
    return `
    <tr>
      <td>${order}</td>
      <td>${name}</td>
      <td>
        <button class="${SECTION_DELETE_BUTTON_CLASS}" data-name="${name}">삭제</button>
      </td>
    <tr>
    `;
  }
}

const SECTION_REGISTER_DIV_ID = "section-register-div";
const SECTION_STATION_SELECTOR_ID = "section-station-selector";
const SECTION_REGISTER_TABLE_ID = "section-register-table";
const SECTION_DELETE_BUTTON_CLASS = "section-delete-button";
const SECTION_ORDER_INPUT_ID = "section-order-input";
const SECTION_ADD_BUTTON_ID = "section-add-button";
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
const TEMPLATE = `
<h2>구간을 수정할 노선을 선택해주세요.</h2>
<div id="${SECTION_LINE_MENU_DIV_ID}">
</div>
<div id="${SECTION_REGISTER_DIV_ID}">
<div>
`;
