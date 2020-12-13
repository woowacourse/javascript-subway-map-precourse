import { clearPage, createSubmitBtn, createTextInput } from './utils.js';

const app = document.getElementById('app');

export const initStationManager = () => {
  clearPage();
  createPage();
};

const createPage = () => {
  createTextInput('역 이름', 'station-name-input', '역 이름을 입력해주세요');
  const submitBtn = createSubmitBtn('station-add-button', '역 추가');
  handleSubmit(submitBtn);
  createResultArea();
};

const handleSubmit = submitBtn => {
  const inputArea = document.getElementById('input-container');
  inputArea.appendChild(submitBtn);
  const inputText = document.getElementById('station-name-input');

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
  const currStations = JSON.parse(localStorage.getItem('stations'));
  const updatedStations = currStations ? [...currStations, name] : [name];
  localStorage.setItem('stations', JSON.stringify(updatedStations));
  addTable(name);
};

const validateName = name => {
  const currStations = JSON.parse(localStorage.getItem('stations'));
  if (currStations && currStations.includes(name)) {
    alert('중복된 역 이름이 존재합니다.');
    return false;
  } else if (name.length < 2) {
    alert('역 이름을 2자 이상으로 입력해 주세요.');
    return false;
  }
  return true;
};

const createResultArea = () => {
  const tableName = document.createElement('h2');
  tableName.innerHTML = '🚉 지하철 역 목록';
  app.appendChild(tableName);

  const stationTable = document.createElement('table');
  stationTable.setAttribute('border', 1);
  stationTable.setAttribute('id', 'station-table');

  const stationNameHeader = document.createElement('th');
  stationNameHeader.innerHTML = '역 이름';
  const stationSettingHeader = document.createElement('th');
  stationSettingHeader.innerHTML = '설정';

  stationTable.appendChild(stationNameHeader);
  stationTable.appendChild(stationSettingHeader);

  const stations = JSON.parse(localStorage.getItem('stations'));

  if (stations) {
    stations.map(name => {
      const tableRow = document.createElement('tr');
      tableRow.setAttribute('data-station', name);
      const nameData = document.createElement('td');
      nameData.innerHTML = name;

      const deleteBtn = document.createElement('button');
      deleteBtn.setAttribute('class', 'station-delete-button');
      deleteBtn.innerHTML = '삭제';
      deleteBtn.addEventListener('click', () => deleteStation(name));

      tableRow.appendChild(nameData);
      tableRow.appendChild(deleteBtn);

      stationTable.appendChild(tableRow);
    });
  }

  app.appendChild(stationTable);
};

const addTable = name => {
  const stationTable = document.getElementById('station-table');
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-station', name);
  const newData = document.createElement('td');
  newData.innerHTML = name;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'station-delete-button');
  deleteBtn.innerHTML = '삭제';
  deleteBtn.addEventListener('click', () => deleteStation(name));

  newRow.appendChild(newData);
  newRow.appendChild(deleteBtn);

  stationTable.appendChild(newRow);
};

const deleteStation = name => {
  if (confirm('정말 삭제하시겠습니까?')) {
    const stationTable = document.getElementById('station-table');
    const currStations = JSON.parse(localStorage.getItem('stations'));
    const updatedStations = currStations.filter(station => station !== name);
    localStorage.setItem('stations', JSON.stringify(updatedStations));
    const rowToBeDeleted = stationTable.querySelector(`[data-station=${name}]`);
    stationTable.removeChild(rowToBeDeleted);
  }
};
