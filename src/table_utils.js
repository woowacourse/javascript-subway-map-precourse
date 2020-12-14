import DomUtils from './dom_utils.js';
import EventUtils from './event_utils.js';
import CommonUtils from './common_utils.js';

export default class TableUtils {
  constructor() {
    this.setPrivateVariable();
    this.setTableType();
    this.setConst();
  }

  setPrivateVariable() {
    this._privateDomUtils = new DomUtils();
    this._privateEventUtils = new EventUtils();
    this._privateCommonUtils = new CommonUtils();
  }

  setTableType() {
    this._tableType = {
      stationArticle: ['역 이름', '설정'],
      lineArticle: ['노선 이름', '상행 종점역', '하행 종점역', '설정'],
      sectionArticle: ['순서', '이름', '설정'],
    }
  }

  setConst() {
    this.DELETE_BUTTON_TEXT = '삭제';
    this.ID_ATTRIBUTE = 'id';
    this.IS_VALID = true;
    this.IS_NOT_VALID = false;
  }

  initTable(toIdName) {
    const table = document.createElement('table');

    this._privateDomUtils.setAttribute(this.ID_ATTRIBUTE, table, `${toIdName}Table`);
    this.addTableStyle(table);
    this.createTitleRow(table, toIdName);
    this._privateDomUtils.appendToIdName(toIdName, table);
    this.initTableData(toIdName);
  }

  initTableData(articleName) {
    if (articleName === 'stationArticle') {
      this.initStationTableData(articleName);
    }
    else if (articleName === 'lineArticle') {
      this.initArticleTableData(articleName);
    }
  }

  initStationTableData(articleName) {
    const stationList = this._privateCommonUtils.getLocalStorageStation();

    for (const station in stationList) {
      const rowArray = [station, this.DELETE_BUTTON_TEXT];
      this.addRow(rowArray, articleName);
    }
  }

  initArticleTableData(articleName) {
    const lineList = this._privateCommonUtils.getLocalStorageLine();

    for (const line in lineList) {
      const lineLen = lineList[line].length;
      const rowArray = [line, lineList[line][0], lineList[line][lineLen - 1], this.DELETE_BUTTON_TEXT];
      this.addRow(rowArray, articleName);
    }
  }

  // refreshStationTable(articleName) {
  //   const stationList = this._privateCommonUtils.getLocalStorageStation();

  //   for (const station in stationList) {
  //     const rowArray = this.createRowArray(station, this.DELETE_BUTTON_TEXT);
  //     this.addRow(rowArray, articleName);
  //   }
  // }

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

    this._privateDomUtils.addDataAttribute(row, rowArray);
    this.addCellsAndButton(tableType, row, rowArray);
  }


  addCellStyle(cell, text) {
    cell.innerHTML = text;
    cell.style.border = '1px solid black';
  }

  addCellsAndButton(tableType, row, rowArray) {
    this._tableType[tableType].forEach((v, i) => {
      if (rowArray[i] === this.DELETE_BUTTON_TEXT) {
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

    this._privateDomUtils.addDataAttribute(deleteButton, rowArray);
    this._privateDomUtils.setAttribute('class', deleteButton, 'station-delete-button')
    this._privateDomUtils.setInnerHtml(deleteButton, this.DELETE_BUTTON_TEXT);
    this._privateDomUtils.appendToVarName(cell, deleteButton);
    this.addEventToDeleteButton(deleteButton);
  }

  addEventToDeleteButton(button) {
    button.addEventListener('click', () => {
      if (this.ifOkay() === this.IS_VALID) {
        this.deleteRowAndData(button);
      }
    });
  }

  ifOkay() {
    if (confirm('정말로 삭제하시겠습니까?')) {
      return this.IS_VALID;
    }
    else {
      return this.IS_NOT_VALID;
    }
  }

  deleteRowAndData(button) {
    const dataset = this.getDataAttribute(button);
    const datasetArray = dataset.split(',');
    const row = document.querySelector(`[data-tracking="${dataset}"]`);

    this.updateDeleteToLocalStorage(button, datasetArray);
    this.deleteTableRow(row);
  }

  getDataAttribute(button) {
    return button.dataset.tracking;
  }

  updateDeleteToLocalStorage(button, datasetArray) {
    const stationList = this._privateCommonUtils.getLocalStorageStation();
    const lineList = this._privateCommonUtils.getLocalStorageLine();

    if (this.checkTableId(button) === 'stationArticleTable') {
      const station = datasetArray[0];

      stationList = this.removeFromObject(stationList, station);
      this._privateCommonUtils.saveToLocalStorage('stationList', stationList);
    }
    else if (this.checkTableId(button) === 'lineArticleTable') {
      const line = datasetArray[0];

      this.removeStationFromLine(line, lineList, stationList);
      this.removeFromObject(lineList, line);
      this._privateCommonUtils.saveToLocalStorage('stationList', stationList);
      this._privateCommonUtils.saveToLocalStorage('lineList', lineList);
    }
  }

  checkTableId(button) {
    return button.parentNode.parentNode.parentNode.parentNode.id;
  }

  removeStationFromLine(line, lineList, stationList) {
    for (const station of lineList[line]) {
      this.removeFromArray(stationList[station], line);
    }
  }

  removeFromObject(object, name) {
    delete object[name];

    return object;
  }

  removeFromArray(array, name) {
    const index = array.indexOf(name);

    array.splice(index, 1);

    return array;
  }

  deleteTableRow(row) {
    row.remove();
  }
}