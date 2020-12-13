import { getArrayFromLocalStorage } from './util-local-storage.js';
import { appendNew, createButton } from './util-ui.js';

export const makeTable = (menu, key) => {
  const table = document.createElement('table');
  const tableData = getTableData(menu, key);

  appendTableHeader(table, menu);
  tableData.forEach((item, index) => {
    appendOneRow(table, menu, item, index);
  });
  table.setAttribute('border', 1);
  return table;
};

const getTableData = (menu, key) => {
  const DATA_LOCATION = {
    station: 'station',
    line: 'line',
    section: 'line',
  }[menu];
  let data = getArrayFromLocalStorage(DATA_LOCATION);

  if (menu && key) {
    data = data.filter((item) => item.name === key.name)[0].stationList;
  }
  return data;
};

const appendTableHeader = (table, menu) => {
  const HEADER_LIST = {
    station: ['역 이름', '설정'],
    line: ['노선 이름', '상행 종점역', '하행 종점역', '설정'],
    section: ['순서', '이름', '설정'],
  }[menu];

  HEADER_LIST.forEach((header) => {
    appendNew('th', table, header);
  });
};

const appendOneRow = (table, menu, item, index) => {
  let APPEND_CELL = {
    station: appendCellForStationManager,
    line: appendCellForLineManager,
    section: appendCellForSectionManager,
  }[menu];
  let row = appendNew('tr', table);

  APPEND_CELL(row, item, index);
  appendDeleteButton(row, menu, item);
};

const appendCellForStationManager = (row, item) => {
  appendNew('td', row, item.name);
};

const appendCellForLineManager = (row, item) => {
  const firstStation = item.stationList[0];
  const lastStation = item.stationList[item.stationList.length - 1];
  const CELLS = [item.name, firstStation, lastStation];

  CELLS.forEach((cell) => appendNew('td', row, cell));
};

const appendCellForSectionManager = (row, item, index) => {
  const CELLS = [`${index}`, item];

  CELLS.forEach((cell) => appendNew('td', row, cell));
};

const appendDeleteButton = (row, menu, item) => {
  const BUTTON_TEXT = {
    station: '삭제',
    line: '삭제',
    section: '노선에서 제거',
  }[menu];
  const className = `${menu}-delete-button`;
  const dataset = `data-${menu}`;
  const itemName = item.name || item;
  const button = createButton(className, dataset, itemName, BUTTON_TEXT);
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
