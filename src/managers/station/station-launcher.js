import { requestToAddStation } from './station-adder.js';
import { requestToDeleteStation } from './station-remover.js';
import { makeTable } from '../../utils/util-table.js';
import {
  appendNew,
  emptyElement,
  addEventListenerOnAddButton,
  addEventListenerOnDeleteButton,
} from '../../utils/util-ui.js';

// 1. 역 관리
export const launchStationManager = (menu, container) => {
  if (!container) {
    container = document.getElementById('container');
  }
  emptyElement(container);
  createStationManagerUI(menu, container);
};

const createStationManagerUI = (menu, container) => {
  const table = makeTable(menu);

  appendNew('label', container, '역 이름', `${menu}-name-input-label`);
  appendNew('br', container);
  appendNew('input', container, null, `${menu}-name-input`);
  appendNew('button', container, '역 추가', `${menu}-add-button`);
  addEventListenerOnAddButton(menu, requestToAddStation);
  appendNew('br', container);
  appendNew('h2', container, '🚉지하철 역 목록');
  appendNew('div', container, table.outerHTML);
  document
    .querySelectorAll(`.${menu}-delete-button`)
    .forEach((button) =>
      addEventListenerOnDeleteButton(button, menu, requestToDeleteStation)
    );
};
