import {
  appendNew,
  emptyElement,
  addEventListenerOnAddButton,
  addEventListenerOnDeleteButton,
} from '../../util/util-ui.js';
import { makeTable } from '../../util/util-table.js';
import { requestToAdd } from './adder.js';
import { requestToDelete } from './remover.js';

// 1. 역 관리
export const launchStationManager = (menu, container) => {
  emptyElement(container);
  createStationManagerUI(menu, container);
};

const createStationManagerUI = (menu, container) => {
  const table = makeTable(menu);

  appendNew('label', container, '역 이름', `${menu}-manager-header`);
  appendNew('br', container);
  appendNew('input', container, null, `${menu}-name-input`);
  appendNew('button', container, '역 추가', `${menu}-add-button`);
  addEventListenerOnAddButton(menu, requestToAdd);
  appendNew('br', container);
  appendNew('h2', container, '🚉지하철 역 목록', `${menu}-list-header`);
  appendNew('div', container, table.outerHTML, `${menu}-list`);
  document
    .querySelectorAll(`.${menu}-delete-button`)
    .forEach((button) =>
      addEventListenerOnDeleteButton(button, menu, requestToDelete)
    );
};
