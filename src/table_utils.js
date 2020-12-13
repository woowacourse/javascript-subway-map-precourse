import DomUtils from './dom_utils.js';
import EventUtils from './event_utils.js';

export default class TableUtils {
  constructor() {
    this.setPrivateVariable();
    this.setTableType();
    this.setConst();
  }

  setPrivateVariable() {
    this._privateDomUtils = new DomUtils();
    this._privateEventUtils = new EventUtils();
  }

  setTableType() {
    this._tableType = {
      stationArticle: ['역 이름', '설정'],
      lineArticle: ['노선 이름', '상행 종점역', '하행 종점역', '설정'],
      sectionArticle: ['순서', '이름', '설정'],
    }
  }

  setConst() {
    this.DELETE_BUTTON_FLAG = 'delete';
    this.DELETE_BUTTON_TEXT = '삭제';
    this.ID_ATTRIBUTE = 'id';
  }

  initTable(toIdName) {
    const table = document.createElement('table');

    this._privateDomUtils.setAttribute(this.ID_ATTRIBUTE, table, `${toIdName}Table`);
    this.addTableStyle(table);
    this.createTitleRow(table, toIdName);
    this.add
    this._privateDomUtils.appendToIdName(toIdName, table);
  }

  addTableStyle(table) {
    table.style.border = '1px solid black';
  }

  createTitleRow(table, tableType) {
    const titleRow = table.insertRow(0);

    this._tableType[tableType].forEach((text, i) => {
      const cell = this.addCell(titleRow, i);
      this.addTitleCellStyle(cell, text);
   })
  }

  addCell(titleRow, i) {
    return titleRow.insertCell(i);
  }

  addTitleCellStyle(cell, text) {
    cell.innerHTML = text;
    cell.style.border = '1px solid black';
    cell.style.fontWeight = 'bold';
    cell.style.textAlign = 'center';
  }

  addRow(rowArray, tableType) {
    const table = document.getElementById(`${tableType}Table`);
    const row = table.insertRow();

    this.addDataAttribute(row, rowArray);
    this.addCellsAndButton(tableType, row, rowArray);
  }

  addDataAttribute(tag, trackingData) {
    tag.setAttribute('data-tracking', trackingData);
  }

  addCellStyle(cell, text) {
    cell.innerHTML = text;
    cell.style.border = '1px solid black';
  }

  addCellsAndButton(tableType, row, rowArray) {
    this._tableType[tableType].forEach((v, i) => {
      if (rowArray[i] === this.DELETE_BUTTON_FLAG) {
        const cell = row.insertCell();

        this.addDeleteButton(cell, rowArray);
      }
      else {
        const cell = this.addCell(row, i);
        this.addCellStyle(cell, rowArray[i]);
      }
    })
  }

  addDeleteButton(cell, rowArray) {
    const deleteButton = document.createElement('button');

    this.addDataAttribute(deleteButton, rowArray);
    this._privateDomUtils.setInnerHtml(deleteButton, this.DELETE_BUTTON_TEXT);
    this._privateDomUtils.appendToVarName(cell, deleteButton);
    this._privateEventUtils.addEventToButton(deleteButton);
  }
}