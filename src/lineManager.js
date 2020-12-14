import {
  clearPage,
  createTextInput,
  createSubmitBtn,
  createSelectbox,
  createTable,
} from './utils.js';

const app = document.getElementById('app');

export const initLineManager = () => {
  clearPage();
  createPage();
  // createResultArea();
};

const createPage = () => {
  createTextInput('노선 이름', 'line-name-input', '노선 이름을 입력해주세요');
  const submitBtn = createSubmitBtn('line-add-button', '노선 추가');
  createSelectArea();
  handleSubmit(submitBtn);
  createResultArea();
};

const createSelectArea = () => {
  const lineSelectArea = document.createElement('div');
  const currStations = JSON.parse(localStorage.getItem('stations'));

  const upwardSelect = document.createElement('select');
  createSelectbox(upwardSelect, 'line-start-station-selector', currStations);
  const upwardLabel = document.createElement('b');
  upwardLabel.innerHTML = '상행 종점';

  const downwardSelect = document.createElement('select');
  createSelectbox(downwardSelect, 'line-end-station-selector', currStations);
  const downwardLabel = document.createElement('b');
  downwardLabel.innerHTML = '하행 종점';

  [upwardLabel, upwardSelect, document.createElement('br'), downwardLabel, downwardSelect].map(
    elem => {
      lineSelectArea.appendChild(elem);
    },
  );

  app.appendChild(lineSelectArea);
};

const handleSubmit = submitBtn => {
  app.appendChild(document.createElement('br'));
  app.appendChild(submitBtn);

  const inputText = document.getElementById('line-name-input');
  const upwardSelect = document.getElementById('line-start-station-selector');
  const downwardSelect = document.getElementById('line-end-station-selector');

  let startStation = upwardSelect.options[upwardSelect.selectedIndex].value;
  let endStation = downwardSelect.options[downwardSelect.selectedIndex].value;
  upwardSelect.addEventListener('change', () => {
    startStation = upwardSelect.value;
  });
  downwardSelect.addEventListener('change', () => {
    endStation = downwardSelect.value;
  });

  submitBtn.addEventListener('click', () => {
    let lineName = inputText.value;
    addLine(lineName, inputText, startStation, endStation);
  });
};

const addLine = (lineName, lineInput, start, end) => {
  if (!validateName(lineName)) return;

  lineInput.value = '';

  const currLines = JSON.parse(localStorage.getItem('lines'));
  // console.log(currLines);
  const updatedLines = currLines ? currLines : {};
  updatedLines[lineName] = [start, end];
  localStorage.setItem('lines', JSON.stringify(updatedLines));
  // console.log(JSON.parse(localStorage.getItem('lines')));

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

  const lineTableHeaders = ['노선 이름', '상행 종점역', '하행 종점역', '설정'];
  const lineTable = createTable('line-table', lineTableHeaders);

  const lines = JSON.parse(localStorage.getItem('lines'));
  if (lines) {
    addTableData(lineTable, lines);
  }

  app.appendChild(lineTable);
};

const addTableData = (table, lines) => {
  Object.entries(lines).map(([line, stations]) => {
    const tableRow = document.createElement('tr');
    tableRow.dataset['line'] = `_${line}`;

    const nameData = document.createElement('td');
    nameData.innerHTML = line;
    const upwardEndData = document.createElement('td');
    upwardEndData.innerHTML = stations[0];
    const downwardEndData = document.createElement('td');
    downwardEndData.innerHTML = stations[stations.length - 1];

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'line-delete-button');
    deleteBtn.innerHTML = '삭제';
    deleteBtn.addEventListener('click', () => deleteLine(line));

    [nameData, upwardEndData, downwardEndData, deleteBtn].map(data => {
      tableRow.appendChild(data);
    });

    table.appendChild(tableRow);
  });
};

const addTable = (lineName, start, end) => {
  const lineTable = document.getElementById('line-table');
  const newRow = document.createElement('tr');
  newRow.dataset['line'] = `_${lineName}`;

  const newData = document.createElement('td');
  newData.innerHTML = lineName;
  const upwardEndData = document.createElement('td');
  upwardEndData.innerHTML = start;
  const downwardEndData = document.createElement('td');
  downwardEndData.innerHTML = end;
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'line-delete-button');
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
    // console.log(JSON.parse(localStorage.getItem('lines')));
    const rowToBeDeleted = lineTable.querySelector(`[data-line=_${lineName}]`);
    lineTable.removeChild(rowToBeDeleted);
  }
};
