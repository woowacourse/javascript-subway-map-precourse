import { clearPage, createSubmitBtn, createTextInput, createTable } from './utils.js';
import { getLocalStorage, setLocalStorage } from './storage.js';
import { stationText as T } from './constants.js';

const app = document.getElementById('app');
const STORAGE_KEY_STATION = 'stations';

export const initStationManager = () => {
  clearPage();
  createPage();
};

const createPage = () => {
  createTextInput(T.inputLabel, T.inputId, T.placeholder);
  const submitBtn = createSubmitBtn(T.submitId, T.submitText);
  handleSubmit(submitBtn);
  createResultArea();
};

const handleSubmit = submitBtn => {
  const inputArea = document.getElementById(T.inputContainer);
  inputArea.appendChild(submitBtn);
  const inputText = document.getElementById(T.inputId);

  inputText.addEventListener('keypress', e => {
    let name = inputText.value;
    if (e.key === 'Enter') {
      addStation(name, inputText);
    }
  });

  submitBtn.addEventListener('click', () => {
    let name = inputText.value;
    addStation(name, inputText);
  });
};

const addStation = (name, nameInput) => {
  if (!validateName(name)) return;
  nameInput.value = '';
  const currStations = getLocalStorage(STORAGE_KEY_STATION);
  const updatedStations = currStations ? [...currStations, name] : [name];
  setLocalStorage(STORAGE_KEY_STATION, updatedStations);
  addTable(name);
};

const validateName = name => {
  const currStations = getLocalStorage(STORAGE_KEY_STATION);
  if (currStations && currStations.includes(name)) {
    alert(T.alertDuplicateName);
    return false;
  } else if (name.length < 2) {
    alert(T.alertNameUnderTwo);
    return false;
  }
  return true;
};

const createResultArea = () => {
  const tableName = document.createElement('h2');
  tableName.innerHTML = T.resultTitle;
  app.appendChild(tableName);

  const stationTableHeaders = [T.tableHeader1, T.tableHeader2];
  const stationTable = createTable(T.tableId, stationTableHeaders);

  const stations = getLocalStorage(STORAGE_KEY_STATION);
  if (stations) {
    addTableData(stationTable, stations);
  }

  app.appendChild(stationTable);
};

const addTableData = (table, stations) => {
  stations.map(station => {
    const tableRow = document.createElement('tr');
    tableRow.dataset['station'] = station;
    const nameData = document.createElement('td');
    nameData.innerHTML = station;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', T.deleteBtnClass);
    deleteBtn.innerHTML = T.deleteBtnText;
    deleteBtn.addEventListener('click', () => deleteStation(station));

    tableRow.appendChild(nameData);
    tableRow.appendChild(deleteBtn);

    table.appendChild(tableRow);
  });
};

const addTable = name => {
  const stationTable = document.getElementById(T.tableId);
  const newRow = document.createElement('tr');
  newRow.dataset['station'] = name;
  const newData = document.createElement('td');
  newData.innerHTML = name;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', T.deleteBtnClass);
  deleteBtn.innerHTML = T.deleteBtnText;
  deleteBtn.addEventListener('click', () => deleteStation(name));

  newRow.appendChild(newData);
  newRow.appendChild(deleteBtn);

  stationTable.appendChild(newRow);
};

const deleteStation = name => {
  if (confirm(T.alertConfirmDelete)) {
    const stationTable = document.getElementById(T.tableId);
    const currStations = getLocalStorage(STORAGE_KEY_STATION);
    const updatedStations = currStations.filter(station => station !== name);
    setLocalStorage(STORAGE_KEY_STATION, updatedStations);
    const rowToBeDeleted = stationTable.querySelector(`[data-station=${name}]`);
    stationTable.removeChild(rowToBeDeleted);
  }
};
