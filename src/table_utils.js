import DomUtils from './dom_utils.js';
import CommonUtils from './common_utils.js';

export default class TableUtils {
  constructor() {
    this.setPrivateVariable();
    this.setTableType();
    this.setConst();
  }

  setPrivateVariable() {
    this._privateDomUtils = new DomUtils();
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
    this.STATION_DELETE_BUTTON_TEXT = '삭제';
    this.LINE_DELETE_BUTTON_TEXT = '삭제';
    this.SECTION_DELETE_BUTTON_TEXT = '노선에서 제거';
    this.ID_ATTRIBUTE = 'id';
    this.IS_VALID = 1;
    this.IS_NOT_VALID = 0;

    this.STATION_DELETE_ERROR_MESSAGE = '노선에 등록되어 있는 역은 삭제할 수 없습니다.'

    this.STATION_TABLE_NAME = 'stationArticleTable';
    this.LINE_TABLE_NAME = 'lineArticleTable';
    this.SECTION_TABLE_NAME = 'sectionArticleTable';
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
      const rowArray = [station, this.STATION_DELETE_BUTTON_TEXT];
      this.addRow(rowArray, articleName);
    }
  }

  initArticleTableData(articleName) {
    const lineList = this._privateCommonUtils.getLocalStorageLine();

    for (const line in lineList) {
      const lineLen = lineList[line].length;
      const rowArray = [line, lineList[line][0], lineList[line][lineLen - 1], this.LINE_DELETE_BUTTON_TEXT];
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

  addCellText(cell, text) {
    cell.innerHTML = text;
  }
  
  addCellBorder(cell) {
    cell.style.border = '1px solid black';
  }

  addCellsAndButton(tableType, row, rowArray) {
    this._tableType[tableType].forEach((v, i) => {
      const typeUpper = this.getType(tableType).toUpperCase();
      const cell = row.insertCell(i);

      this.addCellBorder(cell);

      if (rowArray[i] === this[`${typeUpper}_DELETE_BUTTON_TEXT`]) {
        this.addDeleteButton(cell, rowArray, typeUpper);
      }
      else {
        this.addCellText(cell, rowArray[i]);
      }
    })
  }

  addDeleteButton(cell, rowArray, typeUpper) {
    const deleteButton = document.createElement('button');
    const type = typeUpper.toLowerCase();

    this._privateDomUtils.addDataAttribute(deleteButton, rowArray);
    this._privateDomUtils.setAttribute('class', deleteButton, `${type}-delete-button`)
    this._privateDomUtils.setInnerHtml(deleteButton, this[`${typeUpper}_DELETE_BUTTON_TEXT`]);
    this._privateDomUtils.appendToVarName(cell, deleteButton);
    this.addEventToDeleteButton(deleteButton, type);
  }

  getType(tableType) {
    let type = '';

    for (let i = 0; i < tableType.length; i++) {
      if (tableType[i] >= 'A' && tableType[i] <= 'Z') {
        return type
      }
      type += tableType[i];
    }

    return type;
  }

  addEventToDeleteButton(deleteButton, type) {
    if (type === 'station') {
      this.addEventToStationDeleteButton(deleteButton);
    }
    else if (type === 'line') {
      this.addEventToLineDeleteButton(deleteButton);
    }
  }

  addEventToStationDeleteButton(button) {
    button.addEventListener('click', () => {
      if (this.ifOkay() * this.checkDeleteValidity(button) === this.IS_VALID) {
        this.deleteRowAndData(button);
      }
      else {
        this._privateCommonUtils.alertError(this.STATION_DELETE_ERROR_MESSAGE);
      }
    });
  }

  addEventToLineDeleteButton(button) {
    button.addEventListener('click', () => {
      this.deleteRowAndData(button);
    })
  }

  ifOkay() {
    if (confirm('정말로 삭제하시겠습니까?')) {
      return this.IS_VALID;
    }
    else {
      return this.IS_NOT_VALID;
    }
  }

  checkDeleteValidity(button) {
    if (this.checkTableId(button) === this.STATION_TABLE_NAME) {
      return this.checkIfRegisteredToLine(button);
    }
  }

  checkIfRegisteredToLine(button) {
    const stationList = this._privateCommonUtils.getLocalStorageStation();
    const dataset = this.getDataAttribute(button);
    const station = dataset.split(',')[0];

    if (stationList[station][0]) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
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

    if (this.checkTableId(button) === this.STATION_TABLE_NAME) {
      const station = datasetArray[0];

      this.removeFromObject(stationList, station);
      this._privateCommonUtils.saveToLocalStorage('stationList', stationList);
    }
    else if (this.checkTableId(button) === this.LINE_TABLE_NAME) {
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