import { clearPage, createSubmitBtn, createTextInput, createTable } from '../utils/utils.js';
import { getLocalStorage, setLocalStorage } from '../utils/storage.js';
import { stationText as T } from '../utils/constants.js';

const app = document.getElementById('app');
const STORAGE_KEY_STATION = 'stations';
const DATA_KEY_STATION = 'station';
const STORAGE_KEY_LINE = 'lines';

export const initStationManager = () => {
  clearPage();
  createPage();
};

const createPage = () => {
  createTextInput(T.INPUT_LABEL, T.INPUT_ID, T.PLACEHOLDER);
  const submitBtn = createSubmitBtn(T.SUBMIT_ID, T.SUBMIT_TEXT);
  handleSubmit(submitBtn);
  createResultArea();
};

const handleSubmit = submitBtn => {
  const inputArea = document.getElementById(T.INPUT_CONTAINER);
  inputArea.append(submitBtn);
  const inputText = document.getElementById(T.INPUT_ID);

  inputText.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      addStation(inputText.value);
      inputText.value = '';
    }
  });

  submitBtn.addEventListener('click', () => {
    addStation(inputText.value);
    inputText.value = '';
  });
};

const addStation = name => {
  if (!validateName(name)) return;

  const currStations = getLocalStorage(STORAGE_KEY_STATION);
  const updatedStations = currStations ? [...currStations, name] : [name];
  setLocalStorage(STORAGE_KEY_STATION, updatedStations);
  addToTable(name);
};

const validateName = name => {
  const stations = getLocalStorage(STORAGE_KEY_STATION);
  if (stations && stations.includes(name)) {
    alert(T.ALERT_DUPLICATE_NAME);
    return false;
  } else if (name.length < 2) {
    alert(T.ALERT_NAME_UNDER_TWO);
    return false;
  }
  return true;
};

const createResultArea = () => {
  const tableName = document.createElement('h2');
  tableName.innerHTML = T.RESULT_TITLE;

  const stationTableHeaders = [T.TABLE_HEADER_1, T.TABLE_HEADER_2];
  const stationTable = createTable(T.TABLE_ID, stationTableHeaders);

  const stations = getLocalStorage(STORAGE_KEY_STATION);
  if (stations) {
    addTableData(stationTable, stations);
  }

  app.append(tableName, stationTable);
};

const addTableData = (table, stations) => {
  stations.map(station => {
    const tableRow = addTableRow(station);
    table.append(tableRow);
  });
};

const addTableRow = station => {
  const tableRow = document.createElement('tr');
  tableRow.dataset[DATA_KEY_STATION] = station;
  const nameData = document.createElement('td');
  nameData.innerHTML = station;
  const deleteBtn = createDeleteBtn(station);

  tableRow.append(nameData, deleteBtn);
  return tableRow;
};

const addToTable = name => {
  const stationTable = document.getElementById(T.TABLE_ID);
  const newRow = addTableRow(name);
  stationTable.append(newRow);
};

const createDeleteBtn = station => {
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', T.DELETE_BTN_CLASS);
  deleteBtn.innerHTML = T.DELETE_BTN_TEXT;
  deleteBtn.addEventListener('click', () => deleteStation(station));

  return deleteBtn;
};

const deleteStation = name => {
  if (!isAbleToDelete(name)) return;

  if (confirm(T.ALERT_CONFIRM_DELETE)) {
    const stationTable = document.getElementById(T.TABLE_ID);
    const currStations = getLocalStorage(STORAGE_KEY_STATION);
    const updatedStations = currStations.filter(station => station !== name);
    setLocalStorage(STORAGE_KEY_STATION, updatedStations);
    const rowToBeDeleted = stationTable.querySelector(`[data-${DATA_KEY_STATION}=${name}]`);
    stationTable.removeChild(rowToBeDeleted);
  }
};

const isAbleToDelete = name => {
  const lines = getLocalStorage(STORAGE_KEY_LINE);
  for (let stations of Object.values(lines)) {
    if (stations.includes(name)) {
      alert(T.ALERT_STATION_IN_LINE);
      return false;
    }
  }
  return true;
};
