import DomUtils from './dom_utils.js';

export default class TableUtils {
  constructor() {
    this.setPrivateVariable();
    this.setTableType();
  }

  setPrivateVariable() {
    this._privateDomUtils = new DomUtils();
  }

  setTableType() {
    this._tableType = {
      stationArticle: ['역 이름', '설정'],
      lineArticle: ['노선 이름', '상행 종점역', '하행 종점역', '설정'],
      sectionArticle: ['순서', '이름', '설정'],
    }
  }

  createTable(toIdName) {
    const table = document.createElement('table');

    this._privateDomUtils.setAttribute(table, `${toIdName}Table`);
    this.addTableStyle(table);
    this.createTitleRow(table, toIdName);
    this._privateDomUtils.appendTo(toIdName, table);
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
}