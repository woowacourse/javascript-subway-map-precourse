import { clearPage } from './utils.js';

const app = document.getElementById('app');

export const initSectionManager = () => {
  clearPage();
  createInputArea();
};

const createInputArea = () => {
  const sectionHeader = document.createElement('div');
  const sectionTitle = document.createElement('h3');
  sectionTitle.innerText = '구간을 수정할 노선을 선택해주세요.';
  sectionHeader.appendChild(sectionTitle);

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

  app.appendChild(sectionHeader);
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
  stationSelect.setAttribute('id', 'section-station-selector');
  currStations.map(station => {
    const option = document.createElement('option');
    option.value = station;
    option.text = station;
    stationSelect.options.add(option);
  });

  let selectedStation = stationSelect.options[stationSelect.selectedIndex].value;
  stationSelect.addEventListener('change', () => {
    selectedStation = stationSelect.value;
  });

  const orderInput = document.createElement('input');
  orderInput.type = 'number';
  orderInput.setAttribute('id', 'section-order-input');

  const sectionSubmit = document.createElement('button');
  sectionSubmit.setAttribute('id', 'section-add-button');
  sectionSubmit.innerHTML = '등록';
  sectionSubmit.addEventListener('click', () => addToSection(line, selectedStation, orderInput));

  selectArea.appendChild(stationSelect);
  selectArea.appendChild(orderInput);
  selectArea.appendChild(sectionSubmit);

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
  const sectionTable = document.createElement('table');
  sectionTable.setAttribute('border', 1);
  sectionTable.setAttribute('id', 'section-table');
  sectionTable.style.marginTop = '20px';

  const sectionOrder = document.createElement('th');
  sectionOrder.innerHTML = '순서';
  const sectionName = document.createElement('th');
  sectionName.innerHTML = '이름';
  const sectionSettingHeader = document.createElement('th');
  sectionSettingHeader.innerHTML = '설정';

  sectionTable.appendChild(sectionOrder);
  sectionTable.appendChild(sectionName);
  sectionTable.appendChild(sectionSettingHeader);

  app.appendChild(sectionTable);

  const currLines = JSON.parse(localStorage.getItem('lines'));
  if (currLines) {
    const currStations = currLines[line];
    currStations.map((station, idx) => {
      const tableRow = document.createElement('tr');
      tableRow.setAttribute('data-line', line);
      tableRow.setAttribute('data-station', station);

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

      sectionTable.appendChild(tableRow);
    });
  }

  app.appendChild(sectionTable);
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
