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
    table.setAttribute('id', `${toIdName}Table`);
    // this._tableType[toIdName].forEach(col => {
    //   console.log(col)
    // })
    const row1 = table.insertRow(0);
    const row2 = table.insertRow(1);

    const row1cell1 = row1.insertCell(0);
    const row1cell2 = row1.insertCell(1);

    row1cell1.innerHTML = '역 이름';
    row1cell2.innerHTML = '설정';


    const row2cell1 = row2.insertCell(0);
    const row2cell2 = row2.insertCell(1);

    row2cell1.innerHTML = '신촌';
    const row2button = document.createElement('button');
    row2button.innerHTML = '삭제';
    row2cell2.appendChild(row2button);

    table.style.border = '1px solid black';
    row1cell2.style.textAlign = 'center';

    row1cell1.style.fontWeight = 'bold';
    row1cell2.style.fontWeight = 'bold';

    row1cell1.style.border = '1px solid black';
    row1cell2.style.border = '1px solid black';
    row2cell1.style.border = '1px solid black';
    row2cell2.style.border = '1px solid black';
    this._privateDomUtils.appendTo(toIdName, table);
  }

  addRow() {

  }
}