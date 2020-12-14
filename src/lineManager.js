import {
  clearPage,
  createTextInput,
  createSubmitBtn,
  createSelectbox,
  createTable,
} from './utils.js';
import { lineText as T } from './constants.js';

const app = document.getElementById('app');

export const initLineManager = () => {
  clearPage();
  createPage();
  // createResultArea();
};

const createPage = () => {
  createTextInput(T.inputLabel, T.inputId, T.placeholder);
  const submitBtn = createSubmitBtn(T.submitId, T.submitText);
  createSelectArea();
  handleSubmit(submitBtn);
  createResultArea();
};

const createSelectArea = () => {
  const lineSelectArea = document.createElement('div');
  const currStations = JSON.parse(localStorage.getItem('stations'));

  const upwardSelect = document.createElement('select');
  createSelectbox(upwardSelect, T.startSelectorId, currStations);
  const upwardLabel = document.createElement('b');
  upwardLabel.innerHTML = T.startSelectorText;

  const downwardSelect = document.createElement('select');
  createSelectbox(downwardSelect, T.endSelectorId, currStations);
  const downwardLabel = document.createElement('b');
  downwardLabel.innerHTML = T.endSelectorText;

  [upwardLabel, upwardSelect, document.createElement('br'), downwardLabel, downwardSelect].map(
    elem => {
      lineSelectArea.appendChild(elem);
    },
  );

  app.appendChild(lineSelectArea);
};

const handleSubmit = submitBtn => {
  app.appendChild(document.createElement('br'));
  app.appendChild(submitBtn);

  const inputText = document.getElementById(T.inputId);
  const upwardSelect = document.getElementById(T.startSelectorId);
  const downwardSelect = document.getElementById(T.endSelectorId);

  let startStation = upwardSelect.options[upwardSelect.selectedIndex].value;
  let endStation = downwardSelect.options[downwardSelect.selectedIndex].value;
  upwardSelect.addEventListener('change', () => {
    startStation = upwardSelect.value;
  });
  downwardSelect.addEventListener('change', () => {
    endStation = downwardSelect.value;
  });

  submitBtn.addEventListener('click', () => {
    let lineName = inputText.value;
    addLine(lineName, inputText, startStation, endStation);
  });
};

const addLine = (lineName, lineInput, start, end) => {
  if (!validateName(lineName)) return;

  lineInput.value = '';

  const currLines = JSON.parse(localStorage.getItem('lines'));
  const updatedLines = currLines ? currLines : {};
  updatedLines[lineName] = [start, end];
  localStorage.setItem('lines', JSON.stringify(updatedLines));

  addTable(lineName, start, end);
};

const validateName = lineName => {
  const currLines = JSON.parse(localStorage.getItem('lines'));
  if (currLines && Object.keys(currLines).includes(lineName)) {
    alert(T.alertDuplicateName);
    return false;
  }
  return true;
};

const createResultArea = () => {
  const tableName = document.createElement('h2');
  tableName.innerHTML = T.resultTitle;
  app.appendChild(tableName);

  const lineTableHeaders = [T.tableHeader1, T.tableHeader2, T.tableHeader3, T.tableHeader4];
  const lineTable = createTable(T.tableId, lineTableHeaders);

  const lines = JSON.parse(localStorage.getItem('lines'));
  if (lines) {
    addTableData(lineTable, lines);
  }

  app.appendChild(lineTable);
};

const addTableData = (table, lines) => {
  Object.entries(lines).map(([line, stations]) => {
    const tableRow = document.createElement('tr');
    tableRow.dataset['line'] = `_${line}`;

    const nameData = document.createElement('td');
    nameData.innerHTML = line;
    const upwardEndData = document.createElement('td');
    upwardEndData.innerHTML = stations[0];
    const downwardEndData = document.createElement('td');
    downwardEndData.innerHTML = stations[stations.length - 1];

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', T.deleteBtnClass);
    deleteBtn.innerHTML = T.deleteBtnText;
    deleteBtn.addEventListener('click', () => deleteLine(line));

    [nameData, upwardEndData, downwardEndData, deleteBtn].map(data => {
      tableRow.appendChild(data);
    });

    table.appendChild(tableRow);
  });
};

const addTable = (lineName, start, end) => {
  const lineTable = document.getElementById(T.tableId);
  const newRow = document.createElement('tr');
  newRow.dataset['line'] = `_${lineName}`;

  const newData = document.createElement('td');
  newData.innerHTML = lineName;
  const upwardEndData = document.createElement('td');
  upwardEndData.innerHTML = start;
  const downwardEndData = document.createElement('td');
  downwardEndData.innerHTML = end;
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', T.deleteBtnClass);
  deleteBtn.innerHTML = T.deleteBtnText;
  deleteBtn.addEventListener('click', () => deleteLine(lineName));

  newRow.appendChild(newData);
  newRow.appendChild(upwardEndData);
  newRow.appendChild(downwardEndData);
  newRow.appendChild(deleteBtn);

  lineTable.appendChild(newRow);
};

const deleteLine = lineName => {
  if (confirm(T.alertConfirmDelete)) {
    const lineTable = document.getElementById(T.tableId);
    const currLines = JSON.parse(localStorage.getItem('lines'));
    delete currLines[lineName];
    localStorage.setItem('lines', JSON.stringify(currLines));
    const rowToBeDeleted = lineTable.querySelector(`[data-line=_${lineName}]`);
    lineTable.removeChild(rowToBeDeleted);
  }
};
