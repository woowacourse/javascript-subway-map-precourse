import { clearPage, createSubmitBtn, createSelectbox, createTable } from './utils.js';

const app = document.getElementById('app');

export const initSectionManager = () => {
  clearPage();
  printGuideText();
};

const printGuideText = () => {
  const sectionHeader = document.createElement('div');
  const sectionTitle = document.createElement('h3');
  sectionTitle.innerText = '구간을 수정할 노선을 선택해주세요.';
  sectionHeader.appendChild(sectionTitle);
  createMenuButtons(sectionHeader);

  app.appendChild(sectionHeader);
};

const createMenuButtons = sectionHeader => {
  const currLines = JSON.parse(localStorage.getItem('lines'));
  if (currLines) {
    Object.keys(currLines).map(line => {
      const lineBtn = document.createElement('button');
      lineBtn.setAttribute('class', 'section-line-menu-button');
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
  const sectionInputArea = document.getElementById('section-input');
  const selectArea = document.getElementById('section-selector');
  const sectionTable = document.getElementById('section-table');

  if (sectionInputArea && selectArea && sectionTable) {
    app.removeChild(sectionInputArea);
    app.removeChild(selectArea);
    app.removeChild(sectionTable);
  }
};

const manageLineSection = line => {
  const sectionInputArea = document.createElement('div');
  sectionInputArea.setAttribute('id', 'section-input');

  const manageTitle = document.createElement('h3');
  manageTitle.innerHTML = `${line} 관리`;
  const registerText = document.createElement('b');
  registerText.innerHTML = '구간 등록';

  sectionInputArea.appendChild(manageTitle);
  sectionInputArea.appendChild(registerText);

  app.appendChild(sectionInputArea);
  createSelectArea(line);
};

const createSelectArea = line => {
  const selectArea = document.createElement('div');
  selectArea.setAttribute('id', 'section-selector');

  const currStations = JSON.parse(localStorage.getItem('stations'));
  const stationSelect = document.createElement('select');
  createSelectbox(stationSelect, 'section-station-selector', currStations);

  let selectedStation = stationSelect.options[stationSelect.selectedIndex].value;
  stationSelect.addEventListener('change', () => {
    selectedStation = stationSelect.value;
  });

  const orderInput = document.createElement('input');
  orderInput.type = 'number';
  orderInput.setAttribute('id', 'section-order-input');
  orderInput.setAttribute('placholder', '순서');

  const submitBtn = createSubmitBtn('section-add-button', '등록');
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
  const sectionTable = document.getElementById('section-table');
  app.removeChild(sectionTable);
};

const createResultArea = line => {
  const sectionTableHeaders = ['순서', '이름', '설정'];
  const sectionTable = createTable('section-table', sectionTableHeaders);
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
    deleteBtn.setAttribute('class', 'section-delete-button');
    deleteBtn.innerHTML = '노선에서 제거';
    deleteBtn.addEventListener('click', () => deleteStation(station, line));

    tableRow.appendChild(indexData);
    tableRow.appendChild(nameData);
    tableRow.appendChild(deleteBtn);

    table.appendChild(tableRow);
  });
};

const deleteStation = (station, line) => {
  const sectionTable = document.getElementById('section-table');
  const currLines = JSON.parse(localStorage.getItem('lines'));
  const currStations = currLines[line];

  if (currStations.length <= 2) {
    alert('노선에 포함된 역이 2개 이하일 때는 역을 삭제할 수 없습니다.');
    return;
  }

  if (confirm('정말 삭제하시겠습니까?')) {
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
