import { appendAtEnd, emptyElement } from '../../util/util-ui.js';
import { makeTable } from '../../util/util-table.js';
import { requestToAdd } from './adder.js';
import { requestToDelete } from './remover.js';

// 1. 역 관리
export const launchStationManager = () => {
  const INDEX = 0;
  const MENU = 'station';
  const container = document.getElementById('container');

  container.setAttribute('data-index', INDEX);
  container.setAttribute('data-menu', MENU);
  emptyElement(container);
  createStationManagerUI(INDEX, MENU, container);
};

const createStationManagerUI = (index, menu, container) => {
  appendAtEnd('h3', container, '역 이름', `${menu}-manager-header`);
  appendAtEnd('input', container, null, `${menu}-name-input`);
  appendAtEnd('button', container, '역 추가', `${menu}-add-button`);
  addEventListenerOnAddButton(index, menu);
  appendAtEnd('br', container);
  appendAtEnd('h2', container, '🚉지하철 역 목록', `${menu}-list-header`);
  appendAtEnd('div', container, makeTable(index, menu), `${menu}-list`);
  addEventListenerOnDeleteButton(index, menu);
};

const addEventListenerOnAddButton = (index, menu) => {
  document
    .getElementById(`${menu}-add-button`)
    .addEventListener('click', () => {
      requestToAdd(index, menu);
    });
};

export const addEventListenerOnDeleteButton = (index, menu) => {
  document.querySelectorAll(`.${menu}-delete-button`).forEach((button) =>
    button.addEventListener('click', (e) => {
      requestToDelete(e, index, menu);
    })
  );
};
