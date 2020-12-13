import { getArrayFromLocalStorage } from './util-local-storage.js';
import { appendNew, createButton } from './util-ui.js';
import { TABLE } from '../configuration.js';

export const makeTable = (menu) => {
  const table = document.createElement('table');
  const tableData = getArrayFromLocalStorage(menu);

  makeTableHeader(table, menu);
  tableData.forEach((item) => {
    makeOneRow(table, menu, item);
  });
  table.setAttribute('border', 1);
  return table;
};

const makeTableHeader = (table, menu) => {
  TABLE.header[menu].forEach((header) => {
    appendNew('th', table, header);
  });
};

const makeOneRow = (table, menu, item) => {
  let row = appendNew('tr', table);
  let makeMenuCell = {
    station: makeStationCell,
    line: makeLineCell,
    section: makeSectionCell,
  }[menu];

  makeMenuCell(row, item);
  makeDeleteButton(row, menu, item);
};

const makeStationCell = (row, item) => {
  appendNew('td', row, item.name);
};

const makeLineCell = (row, item) => {
  const firstStation = item.stationList[0];
  const lastStation = item.stationList[item.stationList.length - 1];
  const cells = [item.name, firstStation, lastStation];

  cells.forEach((cell) => appendNew('td', row, cell));
};

const makeSectionCell = (row, item) => {
  [
    item.name,
    item.stationList[0],
    item.stationList[stationList.length - 1],
  ].forEach((cell) => appendNew('td', row, cell));
};

const makeDeleteButton = (row, menu, item) => {
  const className = `${menu}-delete-button`;
  const dataset = `data-${menu}`;
  const button = createButton(className, dataset, item.name);

  button.innerHTML = TABLE.deleteButtonText[menu];
  return appendNew('td', row, button.outerHTML);
};

export const addItemToTable = (menu, item) => {
  const table = document.getElementsByTagName('tbody')[0];

  makeOneRow(table, menu, item);
};

export const deleteItemFromTable = (button) => {
  const cell = button.parentNode;
  const row = cell.parentNode;

  row.remove();
};
