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
      });
      sectionHeader.appendChild(lineBtn);
    });
  }

  app.appendChild(sectionHeader);
};

const clearInputs = () => {
  const sectionInputArea = document.getElementById('section-input');
  const selectArea = document.getElementById('section-selector');

  if (sectionInputArea && selectArea) {
    app.removeChild(sectionInputArea);
    app.removeChild(selectArea);
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
  sectionInputArea.appendChild(document.createElement('br'));

  app.appendChild(sectionInputArea);
  createSelectArea(line);
  // createResultArea();
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

  console.log(line, station, order);
};
