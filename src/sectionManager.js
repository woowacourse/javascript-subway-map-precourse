import { clearPage, createSubmitBtn, createSelectbox, createTable } from './utils.js';
import { getLocalStorage, setLocalStorage } from './storage.js';
import { sectionText as T } from './constants.js';

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
  sectionTitle.innerText = T.guideText;
  sectionHeader.append(sectionTitle);
  createMenuButtons(sectionHeader);

  app.append(sectionHeader);
};

const createMenuButtons = sectionHeader => {
  const lines = getLocalStorage(STORAGE_KEY_LINE);
  if (lines) {
    Object.keys(lines).map(line => {
      const menuBtn = document.createElement('button');
      menuBtn.setAttribute('class', T.menuButtonsClass);
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
  const sectionInputArea = document.getElementById(T.inputId);
  const selectArea = document.getElementById(T.selectAreaId);
  const sectionTable = document.getElementById(T.tableId);

  if (sectionInputArea && selectArea && sectionTable) {
    app.removeChild(sectionInputArea);
    app.removeChild(selectArea);
    app.removeChild(sectionTable);
  }
};

const createPage = line => {
  const sectionInputArea = document.createElement('div');
  sectionInputArea.setAttribute('id', T.inputId);

  const manageTitle = document.createElement('h3');
  manageTitle.innerHTML = `${line} ${T.manageText}`;
  const registerTitle = document.createElement('b');
  registerTitle.innerHTML = T.registerText;

  sectionInputArea.append(manageTitle, registerTitle);
  app.append(sectionInputArea);

  createSelectArea(line);
};

const createSelectArea = line => {
  const selectArea = document.createElement('div');
  selectArea.setAttribute('id', T.selectAreaId);

  const stations = getLocalStorage(STORAGE_KEY_STATION);
  const stationSelect = createSelectbox(T.selectorId, stations);

  let selectedStation = stationSelect.value;
  stationSelect.addEventListener('change', () => (selectedStation = stationSelect.value));
  const orderInput = createNumberInput();
  const submitBtn = createSubmitBtn(T.submitId, T.submitText);

  submitBtn.addEventListener('click', () => addToSection(line, selectedStation, orderInput));
  selectArea.append(stationSelect, orderInput, submitBtn);
  app.append(selectArea);
};

const createNumberInput = () => {
  const orderInput = document.createElement('input');
  orderInput.type = 'number';
  orderInput.setAttribute('id', T.orderInputId);
  orderInput.setAttribute('placholder', T.placeholder);

  return orderInput;
};

const addToSection = (line, station, orderInput) => {
  const order = orderInput.value;
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

const removeCurrResult = () => {
  const sectionTable = document.getElementById(T.tableId);
  app.removeChild(sectionTable);
};

const createResultArea = line => {
  const sectionTableHeaders = [T.tableHeader1, T.tableHeader2, T.tableHeader3];
  const sectionTable = createTable(T.tableId, sectionTableHeaders);
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
  deleteBtn.setAttribute('class', T.deleteBtnClass);
  deleteBtn.innerHTML = T.deleteBtnText;
  deleteBtn.addEventListener('click', () => deleteStation(station, line));

  return deleteBtn;
};

const deleteStation = (station, line) => {
  const currLines = getLocalStorage(STORAGE_KEY_LINE);
  const currStations = getLocalStorage(STORAGE_KEY_LINE)[line];

  if (!isAbleToDelete(currStations)) return;

  if (confirm(T.alertConfirmDelete)) {
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
    alert(T.alertStationsUnderTwo);
    return false;
  }
  return true;
};
