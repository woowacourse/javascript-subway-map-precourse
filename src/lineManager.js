import {
  clearPage,
  createTextInput,
  createSubmitBtn,
  createSelectbox,
  createTable,
} from './utils.js';
import { getLocalStorage, setLocalStorage } from './storage.js';
import { lineText as T } from './constants.js';

const app = document.getElementById('app');
const STORAGE_KEY_STATION = 'stations';
const STORAGE_KEY_LINE = 'lines';
const DATA_KEY_LINE = 'line';

export const initLineManager = () => {
  clearPage();
  createPage();
};

const createPage = () => {
  createTextInput(T.inputLabel, T.inputId, T.placeholder);
  createSelectArea();
  const submitBtn = createSubmitBtn(T.submitId, T.submitText);
  handleSubmit(submitBtn);
  createResultArea();
};

const createSelectArea = () => {
  const selectArea = document.createElement('div');
  const stations = getLocalStorage(STORAGE_KEY_STATION);

  const upwardSelect = createSelectbox(T.startSelectorId, stations);
  const upwardLabel = document.createElement('b');
  upwardLabel.innerHTML = T.startSelectorText;

  const downwardSelect = createSelectbox(T.endSelectorId, stations);
  const downwardLabel = document.createElement('b');
  downwardLabel.innerHTML = T.endSelectorText;

  selectArea.append(upwardLabel, upwardSelect, document.createElement('br'));
  selectArea.append(downwardLabel, downwardSelect);

  app.append(selectArea);
};

const handleSubmit = submitBtn => {
  app.append(document.createElement('br'), submitBtn);

  const inputText = document.getElementById(T.inputId);
  const upwardSelect = document.getElementById(T.startSelectorId);
  const downwardSelect = document.getElementById(T.endSelectorId);

  let startStation = upwardSelect.value;
  let endStation = downwardSelect.value;
  upwardSelect.addEventListener('change', () => (startStation = upwardSelect.value));
  downwardSelect.addEventListener('change', () => (endStation = downwardSelect.value));

  submitBtn.addEventListener('click', () => {
    addLine(inputText.value, startStation, endStation);
    inputText.value = '';
  });
};

const addLine = (line, start, end) => {
  if (!validateName(line)) return;

  const currLines = getLocalStorage(STORAGE_KEY_LINE);
  const updatedLines = currLines ? currLines : {};
  updatedLines[line] = [start, end];
  setLocalStorage(STORAGE_KEY_LINE, updatedLines);
  addToTable(line, start, end);
};

const validateName = lineName => {
  const lines = getLocalStorage(STORAGE_KEY_LINE);
  if (lines && Object.keys(lines).includes(lineName)) {
    alert(T.alertDuplicateName);
    return false;
  }
  return true;
};

const createResultArea = () => {
  const tableName = document.createElement('h2');
  tableName.innerHTML = T.resultTitle;
  app.append(tableName);

  const lineTableHeaders = [T.tableHeader1, T.tableHeader2, T.tableHeader3, T.tableHeader4];
  const lineTable = createTable(T.tableId, lineTableHeaders);
  const lines = getLocalStorage(STORAGE_KEY_LINE);
  if (lines) {
    addTableData(lineTable, lines);
  }

  app.append(lineTable);
};

const addTableData = (table, lines) => {
  Object.entries(lines).map(([line, stations]) => {
    const tableRow = addTableRow(line, stations[0], stations[stations.length - 1]);
    table.append(tableRow);
  });
};

const addTableRow = (line, upwardEnd, downwardEnd) => {
  const tableRow = document.createElement('tr');
  tableRow.dataset[DATA_KEY_LINE] = `_${line}`;

  const nameData = document.createElement('td');
  nameData.innerHTML = line;
  const upwardEndData = document.createElement('td');
  upwardEndData.innerHTML = upwardEnd;
  const downwardEndData = document.createElement('td');
  downwardEndData.innerHTML = downwardEnd;
  const deleteBtn = createDeleteBtn(line);

  tableRow.append(nameData, upwardEndData, downwardEndData, deleteBtn);
  return tableRow;
};

const addToTable = (line, start, end) => {
  const lineTable = document.getElementById(T.tableId);
  const newRow = addTableRow(line, start, end);
  lineTable.append(newRow);
};

const createDeleteBtn = line => {
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', T.deleteBtnClass);
  deleteBtn.innerHTML = T.deleteBtnText;
  deleteBtn.addEventListener('click', () => deleteLine(line));

  return deleteBtn;
};

const deleteLine = line => {
  if (confirm(T.alertConfirmDelete)) {
    const lineTable = document.getElementById(T.tableId);
    const currLines = getLocalStorage(STORAGE_KEY_LINE);
    delete currLines[line];
    setLocalStorage(STORAGE_KEY_LINE, currLines);
    const rowToBeDeleted = lineTable.querySelector(`[data-${DATA_KEY_LINE}=_${line}]`);
    lineTable.removeChild(rowToBeDeleted);
  }
};
