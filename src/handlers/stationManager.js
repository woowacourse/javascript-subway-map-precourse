import { appendAtEnd, emptyElement, makeTable } from '../util/utilUI.js';
import { requestToAdd } from './stationAddition.js';
import { requestToDelete } from './stationDeletion.js';

// 1. 역 관리
export const startStationManager = () => {
  const INDEX = 0;
  const MENU = 'station';
  const container = document.getElementById('container');

  container.setAttribute('data-index', INDEX);
  container.setAttribute('data-menu', MENU);
  emptyElement(container);
  createStationManagerUI(INDEX, MENU, container);
  addEventListeners(MENU);
};

const createStationManagerUI = (index, menu, container) => {
  const table = makeTable(index, JSON.parse(localStorage.getItem(menu)));

  appendAtEnd('h3', container, '역 이름', `${menu}-manager-header`);
  appendAtEnd('input', container, null, `${menu}-name-input`);
  appendAtEnd('button', container, '역 추가', `${menu}-add-button`);
  appendAtEnd('br', container);
  appendAtEnd('h2', container, '🚉지하철 역 목록', `${menu}-list-header`);
  appendAtEnd('div', container, table, `${menu}-list`);
};

const addEventListeners = (menu) => {
  document
    .getElementById(`${menu}-add-button`)
    .addEventListener('click', requestToAdd);
  document
    .querySelectorAll(`.${menu}-delete-button`)
    .forEach((element) => element.addEventListener('click', requestToDelete));
};
