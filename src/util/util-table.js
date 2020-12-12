import { getLocalStorageAsArray } from './util-local-storage.js';
import { appendAtEnd } from './util-ui.js';
import { TABLE } from '../configuration.js';

export const makeTable = (menu) => {
  const table = document.createElement('table');
  const tableData = getLocalStorageAsArray(menu);

  makeTableHeader(table, menu);
  tableData.forEach((item) => {
    makeOneRow(table, menu, item);
  });
  table.setAttribute('border', 1);
  return table;
};

const makeTableHeader = (table, menu) => {
  TABLE.header[menu].forEach((header) => {
    appendAtEnd('th', table, header);
  });
};

const makeOneRow = (table, menu, item) => {
  let row = appendAtEnd('tr', table);
  let makeMenuCell = {
    station: makeStationCell,
    line: makeLineCell,
    section: makeSectionCell,
  }[menu];

  makeMenuCell(row, item);
  makeDeleteButton(row, menu, item);
};

const makeStationCell = (row, item) => {
  [item.name].forEach((cell) => appendAtEnd('td', row, cell));
};

const makeLineCell = (row, item) => {
  [
    item.name,
    item.stationList[0],
    item.stationList[stationList.length - 1],
  ].forEach((cell) => appendAtEnd('td', row, cell));
};

const makeSectionCell = (row, item) => {
  [
    item.name,
    item.stationList[0],
    item.stationList[stationList.length - 1],
  ].forEach((cell) => appendAtEnd('td', row, cell));
};

const makeDeleteButton = (row, menu, item) => {
  const button = document.createElement('button');

  button.setAttribute('class', `${menu}-delete-button`);
  button.setAttribute(`data-${menu}`, item.name);
  button.innerHTML = TABLE.deleteButtonText[menu];
  return appendAtEnd('td', row, button.outerHTML);
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
