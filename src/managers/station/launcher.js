import { appendAtEnd, emptyElement } from '../../util/util-ui.js';
import { makeTable } from '../../util/util-table.js';
import { requestToAdd } from './adder.js';
import { requestToDelete } from './remover.js';

// 1. 역 관리
export const launchStationManager = (menu, container) => {
  container.setAttribute('data-menu', menu);
  emptyElement(container);
  createStationManagerUI(menu, container);
};

const createStationManagerUI = (menu, container) => {
  const table = makeTable(menu);

  appendAtEnd('h3', container, '역 이름', `${menu}-manager-header`);
  appendAtEnd('input', container, null, `${menu}-name-input`);
  appendAtEnd('button', container, '역 추가', `${menu}-add-button`);
  addEventListenerOnAddButton(menu);
  appendAtEnd('br', container);
  appendAtEnd('h2', container, '🚉지하철 역 목록', `${menu}-list-header`);
  appendAtEnd('div', container, table.outerHTML, `${menu}-list`);
  document
    .querySelectorAll(`.${menu}-delete-button`)
    .forEach((button) => addEventListenerOnDeleteButton(button, menu));
};

const addEventListenerOnAddButton = (menu) => {
  document
    .getElementById(`${menu}-add-button`)
    .addEventListener('click', () => {
      requestToAdd(menu);
    });
};

export const addEventListenerOnDeleteButton = (button, menu) => {
  button.addEventListener('click', (e) => {
    requestToDelete(e, menu);
  });
};
