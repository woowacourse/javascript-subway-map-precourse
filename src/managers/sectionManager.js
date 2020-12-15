import { clearPage, createSubmitBtn, createSelectbox, createTable } from '../utils/utils.js';
import { getLocalStorage, setLocalStorage } from '../utils/storage.js';
import { sectionText as T } from '../utils/constants.js';

const app = document.getElementById('app');
const STORAGE_KEY_STATION = 'stations';
const STORAGE_KEY_LINE = 'lines';

export const initSectionManager = () => {
  clearPage();
  printGuideText();
};

const printGuideText = () => {
  const sectionHeader = document.createElement('div');
  const sectionTitle = document.createElement('h3');
  sectionTitle.innerText = T.GUIDE_TEXT;
  sectionHeader.append(sectionTitle);
  createMenuButtons(sectionHeader);

  app.append(sectionHeader);
};

const createMenuButtons = sectionHeader => {
  const lines = getLocalStorage(STORAGE_KEY_LINE);
  if (lines) {
    Object.keys(lines).map(line => {
      const menuBtn = document.createElement('button');
      menuBtn.setAttribute('class', T.MENU_BUTTON_CLASS);
      menuBtn.innerHTML = line;
      menuBtn.style.margin = '2px';
      menuBtn.addEventListener('click', () => {
        clearInputs();
        createPage(line);
        createResultArea(line);
      });
      sectionHeader.append(menuBtn);
    });
  }
};

const clearInputs = () => {
  const sectionInputArea = document.getElementById(T.INPUT_ID);
  const selectArea = document.getElementById(T.SELECTOR_ID);
  const sectionTable = document.getElementById(T.TABLE_ID);

  if (sectionInputArea && selectArea && sectionTable) {
    app.removeChild(sectionInputArea);
    app.removeChild(selectArea);
    app.removeChild(sectionTable);
  }
};

const createPage = line => {
  const sectionInputArea = document.createElement('div');
  sectionInputArea.setAttribute('id', T.INPUT_ID);

  const manageTitle = document.createElement('h3');
  manageTitle.innerHTML = `${line} ${T.MANAGE_TEXT}`;
  const registerTitle = document.createElement('b');
  registerTitle.innerHTML = T.REGISTER_TEXT;

  sectionInputArea.append(manageTitle, registerTitle);
  app.append(sectionInputArea);

  createSelectArea(line);
};

const createSelectArea = line => {
  const selectArea = document.createElement('div');
  selectArea.setAttribute('id', T.SELECTOR_ID);

  const stations = getLocalStorage(STORAGE_KEY_STATION);
  const stationSelect = createSelectbox(T.SELECTOR_ID, stations);

  let selectedStation = stationSelect.value;
  stationSelect.addEventListener('change', () => (selectedStation = stationSelect.value));
  const orderInput = createNumberInput();
  const submitBtn = createSubmitBtn(T.SUBMIT_ID, T.SUBMIT_TEXT);

  submitBtn.addEventListener('click', () => addToSection(line, selectedStation, orderInput));
  selectArea.append(stationSelect, orderInput, submitBtn);
  app.append(selectArea);
};

const createNumberInput = () => {
  const orderInput = document.createElement('input');
  orderInput.type = 'number';
  orderInput.setAttribute('id', T.ORDER_INPUT_ID);
  orderInput.setAttribute('placholder', T.PLACEHOLDER);

  return orderInput;
};

const addToSection = (line, station, orderInput) => {
  const order = orderInput.value;
  if (!validateOrder(line, order)) return;
  orderInput.value = '';

  const currLines = getLocalStorage(STORAGE_KEY_LINE);
  const currStations = currLines[line];

  currStations.splice(order, 0, station);
  const updatedLines = currLines;
  updatedLines[line] = currStations;
  setLocalStorage(STORAGE_KEY_LINE, updatedLines);

  removeCurrResult();
  createResultArea(line);
};

const validateOrder = (line, order) => {
  const lines = getLocalStorage(STORAGE_KEY_LINE);
  if (order < 0) {
    alert(T.ALERT_NEGATIVE_ORDER);
    return false;
  } else if (order > lines[line].length) {
    alert(T.ALERT_OVERLOAD_ORDER);
    return false;
  }
  return true;
};

const removeCurrResult = () => {
  const sectionTable = document.getElementById(T.TABLE_ID);
  app.removeChild(sectionTable);
};

const createResultArea = line => {
  const sectionTableHeaders = [T.TABLE_HEADER_1, T.TABLE_HEADER_2, T.TABLE_HEADER_3];
  const sectionTable = createTable(T.TABLE_ID, sectionTableHeaders);
  sectionTable.style.marginTop = '20px';
  app.append(sectionTable);

  const lines = getLocalStorage(STORAGE_KEY_LINE);
  if (lines) {
    const stations = lines[line];
    addTableData(sectionTable, line, stations);
  }

  app.append(sectionTable);
};

const addTableData = (table, line, stations) => {
  stations.map((station, idx) => {
    const tableRow = document.createElement('tr');
    tableRow.dataset['line'] = line;
    tableRow.dataset['station'] = station;

    const indexData = document.createElement('td');
    indexData.innerHTML = idx;
    const nameData = document.createElement('td');
    nameData.innerHTML = station;
    const deleteBtn = createDeleteBtn(station, line);

    tableRow.append(indexData, nameData, deleteBtn);
    table.append(tableRow);
  });
};

const createDeleteBtn = (station, line) => {
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', T.DELETE_BTN_CLASS);
  deleteBtn.innerHTML = T.DELETE_BTN_TEXT;
  deleteBtn.addEventListener('click', () => deleteStation(station, line));

  return deleteBtn;
};

const deleteStation = (station, line) => {
  const currLines = getLocalStorage(STORAGE_KEY_LINE);
  const currStations = getLocalStorage(STORAGE_KEY_LINE)[line];

  if (!isAbleToDelete(currStations)) return;

  if (confirm(T.ALERT_CONFIRM_DELETE)) {
    currStations.splice(currStations.indexOf(station), 1);
    const updatedLines = currLines;
    updatedLines[line] = currStations;
    setLocalStorage(STORAGE_KEY_LINE, updatedLines);
    removeCurrResult();
    createResultArea(line);
  }
};

const isAbleToDelete = stations => {
  if (stations.length <= 2) {
    alert(T.ALERT_STATION_UNDER_TWO);
    return false;
  }
  return true;
};
