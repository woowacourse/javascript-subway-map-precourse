import { clearPage } from './utils.js';

const app = document.getElementById('app');

export const initLineManager = () => {
  clearPage();
  createInputArea();
  createSelectbox();
  createSubmitBtn();
  getInput();
  createResultArea();
};

const createInputArea = () => {
  const lineInputArea = document.createElement('p');
  const lineLabel = document.createElement('b');
  lineLabel.innerHTML = '노선 이름';

  const lineInput = document.createElement('input');
  lineInput.setAttribute('id', 'line-name-input');
  lineInput.setAttribute('placeholder', '노선 이름을 입력해주세요');

  lineInputArea.appendChild(lineLabel);
  lineInputArea.appendChild(document.createElement('br'));
  lineInputArea.appendChild(lineInput);

  app.appendChild(lineInputArea);
};

const createSelectbox = () => {
  const lineSelectArea = document.createElement('div');
  const currStations = JSON.parse(localStorage.getItem('stations'));

  const upwardSelect = document.createElement('select');
  upwardSelect.setAttribute('id', 'line-start-station-selector');
  const upwardLabel = document.createElement('b');
  upwardLabel.innerHTML = '상행 종점';

  const downwardSelect = document.createElement('select');
  downwardSelect.setAttribute('id', 'line-end-station-selector');
  const downwardLabel = document.createElement('b');
  downwardLabel.innerHTML = '하행 종점';

  currStations.map(station => {
    [upwardSelect, downwardSelect].map(select => {
      const option = document.createElement('option');
      option.value = station;
      option.text = station;
      select.options.add(option);
    });
  });

  lineSelectArea.appendChild(upwardLabel);
  lineSelectArea.appendChild(upwardSelect);
  lineSelectArea.appendChild(document.createElement('br'));
  lineSelectArea.appendChild(downwardLabel);
  lineSelectArea.appendChild(downwardSelect);

  app.appendChild(lineSelectArea);
};

const createSubmitBtn = () => {
  const lineSubmit = document.createElement('button');
  lineSubmit.setAttribute('id', 'line-add-button');
  lineSubmit.innerHTML = '노선 추가';

  app.appendChild(document.createElement('br'));
  app.appendChild(lineSubmit);
};

const getInput = () => {
  const lineInput = document.getElementById('line-name-input');
  const upwardSelect = document.getElementById('line-start-station-selector');
  let startStation = upwardSelect.options[upwardSelect.selectedIndex].value;
  upwardSelect.addEventListener('change', () => {
    startStation = upwardSelect.value;
  });
  const downwardSelect = document.getElementById('line-end-station-selector');
  let endStation = downwardSelect.options[downwardSelect.selectedIndex].value;
  downwardSelect.addEventListener('change', () => {
    endStation = downwardSelect.value;
  });

  const lineSubmit = document.getElementById('line-add-button');

  lineSubmit.addEventListener('keypress', e => {
    let lineName = lineInput.value;
    if (e.key === 'Enter') {
      addLine(lineName, lineInput, startStation, endStation);
    }
  });

  lineSubmit.addEventListener('click', () => {
    let lineName = lineInput.value;
    addLine(lineName, lineInput, startStation, endStation);
  });
};

const addLine = (lineName, lineInput, start, end) => {
  if (!validateName(lineName)) return;

  lineInput.value = '';
  console.log(lineName, start, end);

  const currLines = JSON.parse(localStorage.getItem('lines'));
  console.log(currLines);
  const updatedLines = currLines ? currLines : {};
  updatedLines[lineName] = [start, end];
  localStorage.setItem('lines', JSON.stringify(updatedLines));
  console.log(JSON.parse(localStorage.getItem('lines')));

  addTable(lineName, start, end);
};

const validateName = lineName => {
  const currLines = JSON.parse(localStorage.getItem('lines'));
  if (currLines && Object.keys(currLines).includes(lineName)) {
    alert('중복된 노선 이름이 존재합니다.');
    return false;
  }
  return true;
};

const createResultArea = () => {
  const tableName = document.createElement('h2');
  tableName.innerHTML = '🚉 지하철 노선 목록';
  app.appendChild(tableName);

  const lineTable = document.createElement('table');
  lineTable.setAttribute('border', 1);
  lineTable.setAttribute('id', 'line-table');

  const lineNameHeader = document.createElement('th');
  lineNameHeader.innerHTML = '노선 이름';
  const upwardEndStation = document.createElement('th');
  upwardEndStation.innerHTML = '상행 종점역';
  const downwardEndStation = document.createElement('th');
  downwardEndStation.innerHTML = '하행 종점역';
  const lineSettingHeader = document.createElement('th');
  lineSettingHeader.innerHTML = '설정';

  lineTable.appendChild(lineNameHeader);
  lineTable.appendChild(upwardEndStation);
  lineTable.appendChild(downwardEndStation);
  lineTable.appendChild(lineSettingHeader);

  const lines = JSON.parse(localStorage.getItem('lines'));

  if (lines) {
    Object.entries(lines).map(([line, stations]) => {
      const tableRow = document.createElement('tr');
      tableRow.setAttribute('data-line', `_${line}`);

      const nameData = document.createElement('td');
      nameData.innerHTML = line;
      const upwardEndData = document.createElement('td');
      upwardEndData.innerHTML = stations[0];
      const downwardEndData = document.createElement('td');
      downwardEndData.innerHTML = stations[1];
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '삭제';
      deleteBtn.addEventListener('click', () => deleteLine(line));

      tableRow.appendChild(nameData);
      tableRow.appendChild(upwardEndData);
      tableRow.appendChild(downwardEndData);
      tableRow.appendChild(deleteBtn);

      lineTable.appendChild(tableRow);
    });
  }

  app.appendChild(lineTable);
};

const addTable = (lineName, start, end) => {
  const lineTable = document.getElementById('line-table');
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-line', `_${lineName}`);

  const newData = document.createElement('td');
  newData.innerHTML = lineName;
  const upwardEndData = document.createElement('td');
  upwardEndData.innerHTML = start;
  const downwardEndData = document.createElement('td');
  downwardEndData.innerHTML = end;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '삭제';
  deleteBtn.addEventListener('click', () => deleteLine(lineName));

  newRow.appendChild(newData);
  newRow.appendChild(upwardEndData);
  newRow.appendChild(downwardEndData);
  newRow.appendChild(deleteBtn);

  lineTable.appendChild(newRow);
};

const deleteLine = lineName => {
  if (confirm('정말 삭제하시겠습니까?')) {
    const lineTable = document.getElementById('line-table');
    const currLines = JSON.parse(localStorage.getItem('lines'));
    delete currLines[lineName];
    localStorage.setItem('lines', JSON.stringify(currLines));
    console.log(JSON.parse(localStorage.getItem('lines')));
    const rowToBeDeleted = lineTable.querySelector(`[data-line=_${lineName}]`);
    lineTable.removeChild(rowToBeDeleted);
  }
};
