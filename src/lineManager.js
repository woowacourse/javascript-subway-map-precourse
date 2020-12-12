import { clearPage } from './utils.js';

const app = document.getElementById('app');

export const initLineManager = () => {
  clearPage();
  createInputArea();
  createSelectbox();
  createSubmitBtn();
  getInput();
  // createResultArea();
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
  lineInput.value = '';
  console.log(lineName, start, end);

  const currLines = JSON.parse(localStorage.getItem('lines'));
  console.log(currLines);
  const updatedLines = currLines;
  updatedLines[lineName] = [start, end];
  localStorage.setItem('lines', JSON.stringify(updatedLines));
  console.log(JSON.parse(localStorage.getItem('lines')));
};
