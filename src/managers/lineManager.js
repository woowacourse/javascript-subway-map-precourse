import {
  clearPage,
  createTextInput,
  createSubmitBtn,
  createSelectbox,
  createTable,
} from '../utils/utils.js';
import { getLocalStorage, setLocalStorage } from '../utils/storage.js';
import { lineText as T } from '../utils/constants.js';

const app = document.getElementById('app');
const STORAGE_KEY_STATION = 'stations';
const STORAGE_KEY_LINE = 'lines';
const DATA_KEY_LINE = 'line';

export const initLineManager = () => {
  clearPage();
  createPage();
};

const createPage = () => {
  createTextInput(T.INPUT_LABEL, T.INPUT_ID, T.PLACEHOLDER);
  createSelectArea();
  const submitBtn = createSubmitBtn(T.SUBMIT_ID, T.SUBMIT_TEXT);
  handleSubmit(submitBtn);
  createResultArea();
};

const createSelectArea = () => {
  const selectArea = document.createElement('div');
  const stations = getLocalStorage(STORAGE_KEY_STATION);

  const upwardSelect = createSelectbox(T.START_SELECTOR_ID, stations);
  const upwardLabel = document.createElement('b');
  upwardLabel.innerHTML = T.START_SELECTOR_TEXT;

  const downwardSelect = createSelectbox(T.END_SELECTOR_ID, stations);
  const downwardLabel = document.createElement('b');
  downwardLabel.innerHTML = T.END_SELECTOR_TEXT;

  selectArea.append(upwardLabel, upwardSelect, document.createElement('br'));
  selectArea.append(downwardLabel, downwardSelect);

  app.append(selectArea);
};

const handleSubmit = submitBtn => {
  app.append(document.createElement('br'), submitBtn);

  const inputText = document.getElementById(T.INPUT_ID);
  const upwardSelect = document.getElementById(T.START_SELECTOR_ID);
  const downwardSelect = document.getElementById(T.END_SELECTOR_ID);

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
    alert(T.ALERT_DUPLICATE_NAME);
    return false;
  }
  return true;
};

const createResultArea = () => {
  const tableName = document.createElement('h2');
  tableName.innerHTML = T.RESULT_TITLE;
  app.append(tableName);

  const lineTableHeaders = [T.TABLE_HEADER_1, T.TABLE_HEADER_2, T.TABLE_HEADER_3, T.TABLE_HEADER_4];
  const lineTable = createTable(T.TABLE_ID, lineTableHeaders);
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
  const lineTable = document.getElementById(T.TABLE_ID);
  const newRow = addTableRow(line, start, end);
  lineTable.append(newRow);
};

const createDeleteBtn = line => {
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', T.DELETE_BTN_CLASS);
  deleteBtn.innerHTML = T.DELETE_BTN_TEXT;
  deleteBtn.addEventListener('click', () => deleteLine(line));

  return deleteBtn;
};

const deleteLine = line => {
  if (confirm(T.ALERT_CONFIRM_DELETE)) {
    const lineTable = document.getElementById(T.TABLE_ID);
    const currLines = getLocalStorage(STORAGE_KEY_LINE);
    delete currLines[line];
    setLocalStorage(STORAGE_KEY_LINE, currLines);
    const rowToBeDeleted = lineTable.querySelector(`[data-${DATA_KEY_LINE}=_${line}]`);
    lineTable.removeChild(rowToBeDeleted);
  }
};
