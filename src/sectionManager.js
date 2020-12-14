import { clearPage, createSubmitBtn, createSelectbox, createTable } from './utils.js';
import { sectionText as T } from './constants.js';

const app = document.getElementById('app');

export const initSectionManager = () => {
  clearPage();
  printGuideText();
};

const printGuideText = () => {
  const sectionHeader = document.createElement('div');
  const sectionTitle = document.createElement('h3');
  sectionTitle.innerText = T.guideText;
  sectionHeader.appendChild(sectionTitle);
  createMenuButtons(sectionHeader);

  app.appendChild(sectionHeader);
};

const createMenuButtons = sectionHeader => {
  const currLines = JSON.parse(localStorage.getItem('lines'));
  if (currLines) {
    Object.keys(currLines).map(line => {
      const lineBtn = document.createElement('button');
      lineBtn.setAttribute('class', T.menuButtonsClass);
      lineBtn.innerHTML = line;
      lineBtn.style.margin = '2px';
      lineBtn.addEventListener('click', () => {
        clearInputs();
        manageLineSection(line);
        createResultArea(line);
      });
      sectionHeader.appendChild(lineBtn);
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

const manageLineSection = line => {
  const sectionInputArea = document.createElement('div');
  sectionInputArea.setAttribute('id', T.inputId);

  const manageTitle = document.createElement('h3');
  manageTitle.innerHTML = `${line} ${T.manageText}`;
  const registerTitle = document.createElement('b');
  registerTitle.innerHTML = T.registerText;

  sectionInputArea.appendChild(manageTitle);
  sectionInputArea.appendChild(registerTitle);

  app.appendChild(sectionInputArea);
  createSelectArea(line);
};

const createSelectArea = line => {
  const selectArea = document.createElement('div');
  selectArea.setAttribute('id', T.selectAreaId);

  const currStations = JSON.parse(localStorage.getItem('stations'));
  const stationSelect = document.createElement('select');
  createSelectbox(stationSelect, T.selectorId, currStations);

  let selectedStation = stationSelect.options[stationSelect.selectedIndex].value;
  stationSelect.addEventListener('change', () => {
    selectedStation = stationSelect.value;
  });

  const orderInput = document.createElement('input');
  orderInput.type = 'number';
  orderInput.setAttribute('id', T.orderInputId);
  orderInput.setAttribute('placholder', T.placeholder);

  const submitBtn = createSubmitBtn(T.submitId, T.submitText);
  submitBtn.addEventListener('click', () => addToSection(line, selectedStation, orderInput));

  [stationSelect, orderInput, submitBtn].map(elem => {
    selectArea.appendChild(elem);
  });

  app.appendChild(selectArea);
};

const addToSection = (line, station, orderInput) => {
  const order = orderInput.value;
  orderInput.value = '';

  const currLines = JSON.parse(localStorage.getItem('lines'));
  const currStations = currLines[line];
  console.log(currStations);

  currStations.splice(order, 0, station);
  const updatedLines = currLines;
  updatedLines[line] = currStations;
  localStorage.setItem('lines', JSON.stringify(updatedLines));
  console.log(JSON.parse(localStorage.getItem('lines')));

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
  app.appendChild(sectionTable);

  const currLines = JSON.parse(localStorage.getItem('lines'));
  if (currLines) {
    const currStations = currLines[line];
    addTableData(sectionTable, line, currStations);
  }

  app.appendChild(sectionTable);
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
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', T.deleteBtnClass);
    deleteBtn.innerHTML = T.deleteBtnText;
    deleteBtn.addEventListener('click', () => deleteStation(station, line));

    tableRow.appendChild(indexData);
    tableRow.appendChild(nameData);
    tableRow.appendChild(deleteBtn);

    table.appendChild(tableRow);
  });
};

const deleteStation = (station, line) => {
  const sectionTable = document.getElementById(T.tableId);
  const currLines = JSON.parse(localStorage.getItem('lines'));
  const currStations = currLines[line];

  if (currStations.length <= 2) {
    alert(T.alertStationsUnderTwo);
    return;
  }

  if (confirm(T.alertConfirmDelete)) {
    currStations.splice(currStations.indexOf(station), 1);
    const updatedLines = currLines;
    updatedLines[line] = currStations;
    localStorage.setItem('lines', JSON.stringify(updatedLines));
    console.log(JSON.parse(localStorage.getItem('lines')));

    const rowToBeDeleted = sectionTable.querySelector(`[data-station=${station}]`);
    sectionTable.removeChild(rowToBeDeleted);

    removeCurrResult();
    createResultArea(line);
  }
};
