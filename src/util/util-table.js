import { getArrayFromLocalStorage } from './util-local-storage.js';
import { appendNew, createButton } from './util-ui.js';
import { TABLE } from '../configuration.js';

export const makeTable = (menu) => {
  const table = document.createElement('table');
  const tableData = getArrayFromLocalStorage(menu);

  appendTableHeader(table, menu);
  tableData.forEach((item) => {
    appendOneRow(table, menu, item);
  });
  table.setAttribute('border', 1);
  return table;
};

const appendTableHeader = (table, menu) => {
  TABLE.header[menu].forEach((header) => {
    appendNew('th', table, header);
  });
};

const appendOneRow = (table, menu, item) => {
  let row = appendNew('tr', table);
  let appendCell = {
    station: appendCellForStationManager,
    line: appendCellForLineManager,
    section: appendCellForSectionManager,
  }[menu];

  appendCell(row, item);
  appendDeleteButton(row, menu, item);
};

const appendCellForStationManager = (row, item) => {
  appendNew('td', row, item.name);
};

const appendCellForLineManager = (row, item) => {
  const firstStation = item.stationList[0];
  const lastStation = item.stationList[item.stationList.length - 1];
  const cells = [item.name, firstStation, lastStation];

  cells.forEach((cell) => appendNew('td', row, cell));
};

const appendCellForSectionManager = (row, item) => {
  [
    item.name,
    item.stationList[0],
    item.stationList[stationList.length - 1],
  ].forEach((cell) => appendNew('td', row, cell));
};

const appendDeleteButton = (row, menu, item) => {
  const className = `${menu}-delete-button`;
  const dataset = `data-${menu}`;
  const button = createButton(className, dataset, item.name);

  button.innerHTML = TABLE.deleteButtonText[menu];
  return appendNew('td', row, button.outerHTML);
};

// 신규 역, 노선, 구간 추가 시 사용
export const addItemToTable = (menu, item) => {
  const table = document.getElementsByTagName('tbody')[0];

  appendOneRow(table, menu, item);
};

// 기존 역, 노선, 구간 삭제 시 사용
export const deleteItemFromTable = (button) => {
  const cell = button.parentNode;
  const row = cell.parentNode;

  row.remove();
};
