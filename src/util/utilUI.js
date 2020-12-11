import { TABLE_HEADER } from '../configuration.js';

export const appendAtEnd = (tagName, parentElement, content, id, className) => {
  const newElement = document.createElement(tagName);

  if (parentElement) parentElement.append(newElement);
  if (content) newElement.innerHTML = content;
  if (id) {
    id = id[0] === '#' ? id.slice(1) : id;
    newElement.setAttribute('id', id);
  }
  if (className) {
    className = className[0] === '.' ? className.slice(1) : className;
    newElement.setAttribute('className', className);
  }
  return newElement;
};

export const emptyElement = (elem) => {
  if (elem.tagName === 'DIV') {
    return (elem.innerHTML = '');
  }
  if (elem.tagName === 'INPUT') {
    return (elem.value = '');
  }
};

export const makeTable = (index, tableData) => {
  const header = makeTableHeader(index).join('');
  const makeRowList = [makeRowStation, makeRowLine, makeRowSection];
  const datasetList = ['station', 'line', 'section'];
  let rows = makeRowList[index](tableData, datasetList[index])?.join('');

  rows = rows === undefined ? '' : rows;
  return `<table border="1">
            ${header}
            ${rows}
          </table>`;
};

const makeTableHeader = (index) => {
  return TABLE_HEADER[index].map((header) => `<th>${header}</th>`);
};

const makeRowStation = (tableData, dataset) => {
  console.log(tableData);
  return tableData?.map(
    (station) =>
      `<tr>
        <td>${station.name}</td>
        <td><button class=station-delete-button ${dataset}=${station.name}>삭제</button></td>
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
      <td><button class=line-delete-button ${dataset}=${
        line.name
      }>삭제</button></td>
    </tr>`
  );
};

const makeRowSection = (tableData, dataset) => {
  return tableData?.map(
    (line, index) =>
      `<tr>
        <td>${index}</td>
        <td>${line[index]}</td>
        <td><button class=section-delete-button ${dataset}=${line[index]}}>노선에서 제거</button></td>
      </tr>`
  );
};

export const getLocalStorageByKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
};
