import { getLocalStorageAsArray } from './util-local-storage.js';
import { TABLE_HEADER } from '../configuration.js';

export const makeTable = (index, menu) => {
  const tableData = getLocalStorageAsArray(menu);
  const header = makeHeader(index).join('');
  const rowMakers = [makeRowStation, makeRowLine, makeRowSection];
  let rows = rowMakers[index](tableData, `data-${menu}`)?.join('');

  rows = rows === undefined ? '' : rows;
  return `<table border="1">
            ${header}
            ${rows}
          </table>`;
};

const makeHeader = (index) => {
  return TABLE_HEADER[index].map((header) => `<th>${header}</th>`);
};

const makeRowStation = (tableData, dataset) => {
  console.log(tableData);

  return tableData?.map(
    (station) =>
      `<tr>
        <td>${station.name}</td>
        <td>
          <button class=station-delete-button ${dataset}=${station.name}>
            삭제
          </button>
        </td>
      </tr>`
  );
};

const makeRowLine = (tableData, dataset) => {
  return tableData?.map(
    (line) =>
      `<tr>
      <td>${line.name}</td>
      <td>${line.stationList[0]}</td>
      <td>${stationList[stationList.length - 1]}</td>
      <td>
        <button class=line-delete-button ${dataset}=${line.name}>
          삭제
        </button>
      </td>
    </tr>`
  );
};

const makeRowSection = (tableData, dataset) => {
  return tableData?.map(
    (line, index) =>
      `<tr>
        <td>${index}</td>
        <td>${line[index]}</td>
        <td>
          <button class=section-delete-button ${dataset}=${line[index]}}>
            노선에서 제거
          </button>
        </td>
      </tr>`
  );
};

export const refreshTable = (index, menu, addEventListeners) => {
  const tableElement = document.getElementById(`${menu}-list`);
  const newTable = makeTable(index, menu);

  tableElement.innerHTML = newTable;
  addEventListeners(index, menu);
};
