import { appendAtEnd, emptyElement } from '../util/utilUI.js';
import {
  ALERT_MESSAGE,
  STATION_NAME_LENGTH_LOW_LIMIT,
} from '../configuration.js';

// 1. 역 관리
export const startStationManager = (e) => {
  const container = document.getElementById('manager-ui');

  container.setAttribute('data-menu-selected', e.currentTarget.dataset.menu);
  emptyElement(container);
  createManagerUI(container);
  addEventListeners();
};

const createManagerUI = (container) => {
  const table = makeTable(container.dataset.menu);

  appendAtEnd('h3', container, '역 이름', 'station-manager-header');
  appendAtEnd('input', container, null, 'station-name-input');
  appendAtEnd('button', container, '역 추가', 'station-add-button');
  appendAtEnd('br', container);
  appendAtEnd('h2', container, '🚉지하철 역 목록', 'station-list-header');
  appendAtEnd('div', container, table, 'station-list');
};

const makeTable = (menu) => {
  return `<table border="1">
            ${makeTableHeader().join('')}
            ${makeTableRow('data-station').join('')}
          </table>`;
};

const makeTableHeader = () => {
  const tableHeader = ['역 이름', '설정'];

  return tableHeader.map((header) => `<th>${header}</th>`);
};

const makeTableRow = (dataSetName) => {
  return stationListDummy.map(
    (station) =>
      `<tr>
          <td>${station.name}</td>
          <td>
            <button
              class=station-delete-button
              ${dataSetName}=${station.name}>
                삭제
            </button>
          </td>
        </tr>`
  );
};

const addEventListeners = () => {
  document
    .getElementById('station-add-button')
    .addEventListener('click', requestToAddStation);
  document
    .querySelectorAll('.station-delete-button')
    .forEach((element) => element.addEventListener('click', deleteStation));
};

const requestToAddStation = () => {
  const stationNameInput = document.getElementById('station-name-input');
  const nameError = isWrongStationName(stationNameInput.value);

  if (nameError) {
    alert(ALERT_MESSAGE[nameError]);
    return;
  }
  addStation();
};

const isWrongStationName = (name) => {
  if (name.length < STATION_NAME_LENGTH_LOW_LIMIT) {
    return 'stationNameTooShort';
  }
  if (stationListDummy.map((v) => v.name).includes(name)) {
    return 'stationNameAlreadyExist';
  }
};

const addStation = () => {};

const deleteStation = (e) => {
  console.log('delete');
  //e.currentTarget.dataset.station
  //삭제가능한지 일단 검증
  //station에서 삭제
  //line에서도 삭제
};

const stationListDummy = [
  {
    name: '잠실',
    lineList: ['2호선', '8호선'],
  },
  {
    name: '잠실새내',
    lineList: ['2호선'],
  },
  {
    name: '잠실나루',
    lineList: ['2호선'],
  },
];

const lineListDummy = [
  { name: '2호선', stationList: ['잠실새내', '잠실', '잠실나루'] },
  { name: '8호선', stationList: ['석촌', '잠실', '몽촌토성'] },
];
